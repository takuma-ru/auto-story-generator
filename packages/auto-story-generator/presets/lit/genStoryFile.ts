import fs from "fs";

import consola from "consola";
import { kebabCase, pascalCase } from "scule";
import { Project, SourceFile, SyntaxKind } from "ts-morph";

import { genLitPropTypes } from "~/presets/lit/genPropTypes";

type GenStoryFileType = {
  sourceFile: SourceFile;
  componentName: string;
  relativeSourceFilePath: string;
  file: string;
};

export const genLitStoryFile = async ({
  sourceFile,
  componentName,
  relativeSourceFilePath,
  file,
}: GenStoryFileType) => {
  const propTypes = genLitPropTypes({ sourceFile, componentName });
  const pascalComponentName = pascalCase(componentName);
  const storiesFilePath = file.replace(".ce.ts", ".stories.ts");

  if (!propTypes) return consola.error("Could not find argTypes");

  fs.open(storiesFilePath, "r", async (err, fd) => {
    // ファイルを開けなかったらファイルを作成する
    if (err) {
      const storyCode = `import { html } from "lit";

import type { Meta, StoryObj } from "@storybook/web-components";

import {
  ${pascalComponentName},
  ${pascalComponentName}Props,
} from "~/${relativeSourceFilePath.slice(1).replace(".ce.ts", ".ce")}";

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

      // 同期処理でファイルを作成する
      fs.writeFileSync(storiesFilePath, storyCode);
    }

    const storiesProject = new Project();

    // ファイルを読み込む
    const storiesSourceFile =
      storiesProject.addSourceFileAtPath(storiesFilePath);

    // stories.ts内のmetaを取得する
    const meta = storiesSourceFile.getVariableDeclaration("meta");

    if (
      !meta ||
      !meta.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
    ) {
      return consola.error(
        `Could not find meta in file ${storiesSourceFile.getFilePath()}`,
      );
    }

    const initializer = meta.getInitializerIfKindOrThrow(
      SyntaxKind.ObjectLiteralExpression,
    );

    if (!initializer) return consola.error("Could not find initializer");

    // metaのrenderオブジェクトを取得する
    const renderProperty = initializer.getPropertyOrThrow("render");

    // renderオブジェクトの値を書き換える
    renderProperty.set({
      initializer: `(args) => {
  new ${pascalComponentName}();

  return html\`<${componentName}${propTypes
    ?.map((prop) => {
      if (prop.name === "styles") return;

      if (prop.type[0] === "boolean") {
        return ` ?${kebabCase(prop.name.substring(2))}=\${args.${prop.name}}`;
      }

      if (prop.type[0] === "object") {
        return ` .${kebabCase(prop.name)}="\${args.${prop.name}}"`;
      }

      return ` ${kebabCase(prop.name)}="\${args.${prop.name}}"`;
    })
    .join("")}>${componentName}</${componentName}>\`;
}`,
    });

    // metaのargsオブジェクトを取得する
    const argsProperty = initializer.getPropertyOrThrow("args");

    const args: { [key: string]: string | number | boolean | undefined } = {};

    propTypes.forEach((prop) => {
      if (prop.name === "styles") return;

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

    const argText = Object.entries(args)
      .map((x) => x.join(":"))
      .join(", ");

    argsProperty.set({
      initializer: `{ ${argText} }`,
    });

    const argTypesProperty = initializer.getPropertyOrThrow("argTypes");

    const argTypes: {
      [key: string]: {
        control: string;
        options?: string[];
      };
    } = {};

    propTypes.forEach((prop) => {
      if (prop.name === "styles") return;

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

    const argTypesText = JSON.stringify(argTypes, null, "");

    argTypesProperty.set({
      initializer: `${argTypesText}`,
    });

    // ファイルを保存する
    await storiesProject
      .save()
      .then(() => {
        consola.success(
          `Successfully updated args in ${storiesSourceFile.getFilePath()}`,
        );
      })
      .catch((err) => {
        consola.error(err);
      });
  });
};
