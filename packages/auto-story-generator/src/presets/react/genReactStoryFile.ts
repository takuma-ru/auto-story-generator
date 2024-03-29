import { pascalCase } from "scule";

import { genStoryFile } from "~/src/core/genStoryFile";
import { getReactPropTypes } from "~/src/presets/react/getReactPropTypes";
import { GenStoryFileOptions } from "~/src/types/GenStoryFileType";
import { throwErr } from "~/src/utils/throwError";

export const genReactStoryFile = async ({
  componentName,
  fileBase,
  fileName,
  filePrefixExt,
  path,
  fileExt,
  relativeSourceFilePath,
  sourceFile,
  prettierConfigPath,
}: GenStoryFileOptions["fileOptions"]) => {
  if (!componentName || !fileBase) {
    throwErr({
      errorCode: "EC03",
    });

    return;
  }

  const { propTypes } = getReactPropTypes({
    sourceFile,
    componentName,
  });
  const pascalComponentName = pascalCase(componentName);

  if (!propTypes) {
    throwErr({
      errorCode: "EC04",
    });

    return;
  }

  const defaultExportDeclaration = sourceFile.getExportedDeclarations();

  let isDefaultExportComponent: boolean = false;
  defaultExportDeclaration.forEach((declaration, exportName) => {
    if (exportName === "default") {
      const defaultExportName = declaration[0].getSymbol()?.getName();
      isDefaultExportComponent = defaultExportName === pascalComponentName;
      return;
    }
  });

  const initialCode = `
import type { Meta, StoryObj } from "@storybook/react";

${isDefaultExportComponent ? `import ${pascalComponentName} from "./${fileName}${filePrefixExt ? filePrefixExt : ""}";` : `import { ${pascalComponentName} } from "./${fileName}${filePrefixExt ? filePrefixExt : ""}";`}

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
      prop.value.length > 0 ? `"${prop.value[0]}"` : "undefined";

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
      fileName,
      filePrefixExt,
      path,
      fileExt,
      relativeSourceFilePath,
      sourceFile,
      prettierConfigPath,
    },
    generateOptions: {
      fileExt: ".stories.tsx",
      initialCode,
      meta: {
        component: componentCode,
        args,
        argTypes,
      },
    },
  });
};
