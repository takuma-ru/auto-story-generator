import fs from "fs";

import { consola } from "consola";
import { Project, SourceFile, SyntaxKind } from "ts-morph";

export type GenStoryFileOptions = {
  fileOptions: {
    componentName: string;
    fileName: string;
    path: string;
    type: `.${string}`;
    relativeSourceFilePath: string;
    sourceFile: SourceFile;
  };
  generateOptions: {
    fileType: `.stories.${string}`;
    initialCode: string;
    meta: {
      render: string;
      args: { [key: string]: string | number | boolean | undefined };
      argTypes: {
        [key: string]: {
          control: string;
          options?: string[];
        };
      };
    };
  };
};
export const genStoryFile = async ({
  fileOptions,
  generateOptions,
}: GenStoryFileOptions) => {
  const storiesFilePath = fileOptions.path.replace(
    fileOptions.type,
    generateOptions.fileType,
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
      initializer: generateOptions.meta.render,
    });

    // metaのargsオブジェクトを取得する
    const argsProperty = initializer.getPropertyOrThrow("args");

    const argText = Object.entries(generateOptions.meta.args)
      .map((x) => x.join(":"))
      .join(", ");

    argsProperty.set({
      initializer: `{ ${argText} }`,
    });

    const argTypesProperty = initializer.getPropertyOrThrow("argTypes");

    const argTypesText = JSON.stringify(
      generateOptions.meta.argTypes,
      null,
      "",
    );

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
