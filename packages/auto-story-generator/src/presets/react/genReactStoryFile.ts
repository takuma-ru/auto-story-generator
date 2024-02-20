import { consola } from "consola";
import { pascalCase } from "scule";

import { getReactPropTypes } from "~/src/presets/react/getReactPropTypes";
import { GenStoryFileOptions } from "~/src/types/GenStoryFileType";
import { genStoryFile } from "~/src/utils/genStoryFile";

export const genReactStoryFile = async ({
  componentName,
  fileBase,
  path,
  type,
  relativeSourceFilePath,
  sourceFile,
  prettierConfigPath,
}: GenStoryFileOptions["fileOptions"]) => {
  if (!componentName || !fileBase) {
    return consola.error("Could not find component name");
  }

  const { propTypes } = getReactPropTypes({
    sourceFile,
    componentName,
  });
  const pascalComponentName = pascalCase(componentName);

  if (!propTypes) return consola.error("Could not find argTypes");

  const initialCode = `
import type { Meta, StoryObj } from "@storybook/react";

import { ${pascalComponentName} } from "./${fileBase}";

const meta: Meta<typeof ${pascalComponentName}> = {
  title: "components/${pascalComponentName}",
  component: (args) => <${componentName} {...args} />,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
`;

  const componentCode = `${pascalComponentName}`;

  const args: GenStoryFileOptions["generateOptions"]["meta"]["args"] = {};

  propTypes.forEach((prop) => {
    if (prop.isOptional) {
      return (args[prop.name] = "undefined");
    }

    let value: string | boolean | undefined =
      prop.value.length > 0 ? prop.value[0] : "undefined";

    if (prop.type.includes("boolean")) {
      value = true;
    }

    args[prop.name] = value;
  });

  const argTypes: GenStoryFileOptions["generateOptions"]["meta"]["argTypes"] =
    {};

  propTypes.forEach((prop) => {
    if (prop.type[0] === "boolean") {
      return (argTypes[prop.name] = {
        control: "boolean",
      });
    }

    if (prop.type[0] === "object") {
      return (argTypes[prop.name] = {
        control: "object",
      });
    }

    if (prop.value.length > 1) {
      return (argTypes[prop.name] = {
        control: "select",
        options: prop.value,
      });
    } else {
      if (prop.type[0] === "string") {
        return (argTypes[prop.name] = {
          control: "text",
        });
      }

      if (prop.type[0] === "number") {
        return (argTypes[prop.name] = {
          control: "number",
        });
      }
    }
  });

  genStoryFile({
    fileOptions: {
      componentName,
      fileBase,
      path,
      type,
      relativeSourceFilePath,
      sourceFile,
      prettierConfigPath,
    },
    generateOptions: {
      fileType: ".stories.tsx",
      initialCode,
      meta: {
        component: componentCode,
        args,
        argTypes,
      },
    },
  });
};
