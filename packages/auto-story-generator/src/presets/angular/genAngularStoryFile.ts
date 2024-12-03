import { consola } from "consola";
import { pascalCase } from "scule";
import { getAngularPropTypes } from "~/src/presets/angular/getAngularPropTypes";

import { GenStoryFileOptions } from "~/src/types/GenStoryFileType";

export const genAngularStoryFile = async ({
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
> => {
  // const { propTypes } = 
  // getAngularPropTypes({
  //   sourceFile,
  //   componentName,
  // });
  const pascalComponentName = pascalCase(componentName + 'Component');
  //   if (!propTypes) return consola.error("Could not find argTypes");
  
  // Angular doesn't need file with extension
  let file = fileName.split('.');
  file.pop();

  const initialCode = `
import type { Meta, StoryObj } from "@storybook/angular";

import { ${pascalComponentName} } from "./${file.join('.')}";

const meta: Meta<${pascalComponentName}> = {
  title: "components/${pascalComponentName}",
  component: ${pascalComponentName},
  tags: ["autodocs"],
  render: (args: ${pascalComponentName}) => ({
    props: {
      ...args
    }
  })
};

export default meta;
type Story = StoryObj<${pascalComponentName}>;

export const Primary: Story = {};
`;

  const componentCode = `${pascalComponentName}`;

  //   const args: GenStoryFileOptions["generateOptions"]["meta"]["args"] = {};

  //   propTypes.forEach((prop) => {
  //     if (prop.isOptional) {
  //       return (args[prop.name] = "undefined");
  //     }

  //     let value: string | boolean | undefined =
  //       prop.value.length > 0 ? prop.value[0] : "undefined";

  //     if (prop.type.includes("boolean")) {
  //       value = true;
  //     }

  //     args[prop.name] = value;
  //   });

  //   const argTypes: GenStoryFileOptions["generateOptions"]["meta"]["argTypes"] =
  //     {};

  //   propTypes.forEach((prop) => {
  //     if (prop.type[0] === "boolean") {
  //       return (argTypes[prop.name] = {
  //         control: "boolean",
  //       });
  //     }

  //     if (prop.type[0] === "object") {
  //       return (argTypes[prop.name] = {
  //         control: "object",
  //       });
  //     }

  //     if (prop.value.length > 1) {
  //       return (argTypes[prop.name] = {
  //         control: "select",
  //         options: prop.value,
  //       });
  //     } else {
  //       if (prop.type[0] === "string") {
  //         return (argTypes[prop.name] = {
  //           control: "text",
  //         });
  //       }

  //       if (prop.type[0] === "number") {
  //         return (argTypes[prop.name] = {
  //           control: "number",
  //         });
  //       }
  //     }
  //   });

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
        // component: componentCode,
      },
    },
  };
};
