import type { GenStoryFileOptions } from "~/src/types/GenStoryFileType";

import { kebabCase, pascalCase } from "scule";
import { getLitPropTypes } from "~/src/presets/lit/getLitPropTypes";
import { throwErr } from "~/src/utils/throwError";

export async function genLitStoryFile({
  componentName,
  fileBase,
  fileName,
  filePrefixExt,
  path,
  fileExt,
  relativeSourceFilePath,
  sourceFile,
  prettierConfigPath,
}: GenStoryFileOptions["fileOptions"]): Promise<
  GenStoryFileOptions | undefined
  > {
  if (!componentName || !fileBase) {
    throwErr({
      errorCode: "EC03",
    });

    return;
  }

  const propTypes = getLitPropTypes({ sourceFile, componentName });
  const pascalComponentName = pascalCase(componentName);

  if (!propTypes) {
    throwErr({
      errorCode: "EC04",
    });

    return;
  }

  const initialCode = `
import { html } from "lit";

import type { Meta, StoryObj } from "@storybook/web-components";

import {
  ${pascalComponentName},
  ${pascalComponentName}Props,
} from "./${fileName}${filePrefixExt || ""}";

const meta: Meta<${pascalComponentName}Props> = {
  title: "components/${componentName}",
  tags: ["autodocs"],
  render: (args) => {
    new ${pascalComponentName}();

    return html\`<${componentName}>${componentName}</${componentName}>\`;
  },
  args: {},
  argTypes: {},
};

export default meta;

export type ${pascalComponentName}Story = StoryObj<${pascalComponentName}Props>;

export const Primary: ${pascalComponentName}Story = {};
`;

  const renderCode = `(args) => {
  new ${pascalComponentName}();

  return html\`<${componentName}${propTypes
    ?.map((prop) => {
      if (prop.name === "styles")
        return undefined;

      if (prop.type[0] === "boolean")
        return ` ?${kebabCase(prop.name.substring(2))}=\${args.${prop.name}}`;

      if (prop.type[0] === "object")
        return ` .${kebabCase(prop.name)}="\${args.${prop.name}}"`;

      return ` ${kebabCase(prop.name)}="\${args.${prop.name}}"`;
    })
    .join("")}>${componentName}</${componentName}>\`;
}`;

  const args: GenStoryFileOptions["generateOptions"]["meta"]["args"] = {};

  propTypes.forEach((prop) => {
    if (prop.name === "styles")
      return;

    if (prop.isOptional)
      return (args[prop.name] = "undefined");

    let value: string | boolean | undefined
      = prop.value.length > 0 ? `"${prop.value[0]}"` : "undefined";

    if (prop.type.includes("boolean"))
      value = true;

    args[prop.name] = value;
  });

  const argTypes: GenStoryFileOptions["generateOptions"]["meta"]["argTypes"]
    = {};

  propTypes.forEach((prop) => {
    if (prop.name === "styles")
      return;

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
    }
    else {
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

  return {
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
      fileExt: ".stories.ts",
      initialCode,
      meta: {
        render: renderCode,
        args,
        argTypes,
      },
    },
  };
}
