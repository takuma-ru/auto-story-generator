import fs from "fs";

import { consola } from "consola";
import * as prettier from "prettier";
import { Project, SyntaxKind } from "ts-morph";

import { GenStoryFileOptions } from "~/src/types/GenStoryFileType";
import { throwErr } from "~/src/utils/throwError";

export const genStoryFile = async ({
  fileOptions,
  generateOptions,
}: GenStoryFileOptions) => {
  const storiesFilePath = fileOptions.path.replace(
    fileOptions.filePrefixExt
      ? fileOptions.filePrefixExt
      : "" + fileOptions.fileExt,
    generateOptions.fileExt,
  );

  fs.open(storiesFilePath, "r", async (err) => {
    // ファイルを開けなかったらファイルを作成する
    if (err) {
      // 同期処理でファイルを作成する
      fs.writeFileSync(storiesFilePath, generateOptions.initialCode);
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
      throwErr({
        errorCode: "EC05",
        detail: `Could not find meta in file ${storiesSourceFile.getFilePath()}`,
      });

      return;
    }

    const initializer = meta.getInitializerIfKindOrThrow(
      SyntaxKind.ObjectLiteralExpression,
    );

    if (!initializer) {
      throwErr({
        errorCode: "EC06",
      });

      return;
    }

    if (generateOptions.meta.render) {
      // metaのrenderオブジェクトを取得する
      let renderProperty = initializer.getProperty("render");

      while (!renderProperty) {
        initializer.addPropertyAssignment({
          name: "render",
          initializer: "() => {}",
        });

        renderProperty = initializer.getProperty("render");
      }

      if (!renderProperty) {
        throwErr({
          errorCode: "EC10",
          detail: `Could not find render in file ${storiesSourceFile.getFilePath()}`,
        });

        return;
      }

      // renderオブジェクトの値を書き換える
      renderProperty.set({
        initializer: generateOptions.meta.render,
      });
    }

    if (generateOptions.meta.component) {
      // metaのcomponentオブジェクトを取得する
      let componentProperty = initializer.getProperty("component");

      while (!componentProperty) {
        initializer.addPropertyAssignment({
          name: "component",
          initializer: "null",
        });

        componentProperty = initializer.getProperty("component");
      }

      if (!componentProperty) {
        throwErr({
          errorCode: "EC10",
          detail: `Could not find component in file ${storiesSourceFile.getFilePath()}`,
        });

        return;
      }

      // componentオブジェクトの値を書き換える
      componentProperty.set({
        initializer: generateOptions.meta.component,
      });
    }

    if (generateOptions.meta.args) {
      // metaのargsオブジェクトを取得する
      let argsProperty = initializer.getProperty("args");

      while (!argsProperty) {
        initializer.addPropertyAssignment({
          name: "args",
          initializer: "{}",
        });

        argsProperty = initializer.getProperty("args");
      }

      if (!argsProperty) {
        throwErr({
          errorCode: "EC10",
          detail: `Could not find args in file ${storiesSourceFile.getFilePath()}`,
        });

        return;
      }

      const argText = Object.entries(generateOptions.meta.args)
        .map((x) => x.join(":"))
        .join(", ");

      argsProperty.set({
        initializer: `{ ${argText} }`,
      });
    }

    if (generateOptions.meta.argTypes) {
      let argTypesProperty = initializer.getProperty("argTypes");

      while (!argTypesProperty) {
        initializer.addPropertyAssignment({
          name: "argTypes",
          initializer: "{}",
        });

        argTypesProperty = initializer.getProperty("argTypes");
      }

      if (!argTypesProperty) {
        throwErr({
          errorCode: "EC10",
          detail: `Could not find argTypes in file ${storiesSourceFile.getFilePath()}`,
        });

        return;
      }

      const argTypesText = JSON.stringify(
        generateOptions.meta.argTypes,
        null,
        "",
      );

      argTypesProperty.set({
        initializer: `${argTypesText}`,
      });
    }

    // ファイルを保存する
    await storiesProject
      .save()
      .then(async () => {
        consola.success(
          `Successfully updated args in ${storiesSourceFile.getFilePath()}`,
        );

        const fileContent = fs.readFileSync(storiesFilePath, "utf-8");

        const config: prettier.Options | null = fileOptions.prettierConfigPath
          ? await prettier.resolveConfig(fileOptions.prettierConfigPath)
          : {
              semi: true,
              trailingComma: "all",
              singleQuote: false,
              printWidth: 80,
              tabWidth: 2,
              endOfLine: "lf",
            };

        // Format the content using Prettier
        const formattedContent = await prettier.format(fileContent, {
          ...config,
          parser: "typescript",
        });

        // Write the formatted content back to the file
        fs.writeFileSync(storiesFilePath, formattedContent);
      })
      .catch((err) => {
        throwErr({
          errorCode: "EC07",
          detail: err,
        });
      });
  });
};
