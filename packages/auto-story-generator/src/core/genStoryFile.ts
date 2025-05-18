import type { cwd } from "node:process";

import type { UnpluginOptions } from "unplugin";
import type { GenStoryFileOptions } from "~/src/types/GenStoryFileType";
import type { Options } from "~/src/types/Options";
import fs from "node:fs";
import consola from "consola";
import { loadFile } from "magicast";
import { minimatch } from "minimatch";

import * as prettier from "prettier";
import { Project, SyntaxKind } from "ts-morph";
import { getComponentInfo } from "~/src/core/getComponentInfo";
import { genLitStoryFile } from "~/src/presets/lit/genLitStoryFile";
import { genReactStoryFile } from "~/src/presets/react/genReactStoryFile";
import { throwErr } from "~/src/utils/throwError";

export async function genStoryFile({
  options,
  id,
  projectRootDir,
}: {
  options: Options;
  id: Parameters<NonNullable<UnpluginOptions["watchChange"]>>[0];
  projectRootDir: ReturnType<typeof cwd>;
}) {
  if (id.includes(".stories"))
    return;

  const hasGenFile = () => {
    let relativeSourceFilePath = id.replace(projectRootDir, "");

    if (
      relativeSourceFilePath.startsWith("/")
      || relativeSourceFilePath.startsWith("\\")
    ) {
      relativeSourceFilePath = id.replace(projectRootDir, "").slice(1);
    }

    const isMatchImports = options.imports
      ? options.imports.some(importDir =>
        minimatch(relativeSourceFilePath, importDir),
      )
      : true;

    const isMatchIgnores = options.ignores
      ? options.ignores.some(ignorePath =>
        minimatch(relativeSourceFilePath, ignorePath),
      )
      : false;

    return isMatchImports && !isMatchIgnores;
  };
  const isGenFile = hasGenFile();

  consola.info(`isGenFile: ${isGenFile}`);

  if (!isGenFile)
    return;

  const {
    fileBase,
    fileName,
    fileExt,
    filePrefixExt,
    componentName,
    relativeSourceFilePath,
  } = getComponentInfo(id);

  try {
    const mod = await loadFile(id);
    const project = new Project();
    const sourceFile = project.createSourceFile(fileBase || "", mod.$code);

    consola.start(`${componentName} Story file is being generated ....`);

    let genStoryFileOptions: GenStoryFileOptions | undefined;

    switch (options.preset) {
      case "lit": {
        genStoryFileOptions = await genLitStoryFile({
          componentName,
          fileBase,
          fileName,
          path: id,
          fileExt,
          filePrefixExt,
          relativeSourceFilePath,
          sourceFile,
          prettierConfigPath: options.prettierConfigPath,
        });

        break;
      }

      case "react": {
        genStoryFileOptions = await genReactStoryFile({
          componentName,
          fileBase,
          fileName,
          path: id,
          fileExt,
          filePrefixExt,
          relativeSourceFilePath,
          sourceFile,
          prettierConfigPath: options.prettierConfigPath,
          storiesFolder: options.storiesFolder,
        });

        break;
      }

      case "vue": {
        throwErr({
          errorCode: "EC01",
        });

        break;
      }

      case "angular": {
        throwErr({
          errorCode: "EC01",
        });

        break;
      }

      case "custom": {
        throwErr({
          errorCode: "EC01",
        });

        break;
      }

      default: {
        throwErr({
          errorCode: "EC02",
          detail: `Preset ${options.preset} is not supported. Please use one of the following: lit, react, vue, angular, custom`,
        });
      }
    }

    if (!genStoryFileOptions) {
      throwErr({
        errorCode: "EC03",
      });

      return;
    }

    const storiesFilePath = genStoryFileOptions.fileOptions.path.replace(
      genStoryFileOptions.fileOptions.filePrefixExt
        ? genStoryFileOptions.fileOptions.filePrefixExt
        : `${genStoryFileOptions.fileOptions.fileExt}`,
      genStoryFileOptions.generateOptions.fileExt,
    );

    let storiesFolderPath = "";
    let storiesFilePathWithStoriesFolder = "";

    if (options.storiesFolder) {
      const splitStoriesFilePath = storiesFilePath.split("/");

      const fileNameWithStoriesFolder = `${options.storiesFolder}/${splitStoriesFilePath[splitStoriesFilePath.length - 1]}`;

      storiesFilePathWithStoriesFolder = storiesFilePath.replace(
        `${genStoryFileOptions.fileOptions.fileName}${genStoryFileOptions.generateOptions.fileExt}`,
        fileNameWithStoriesFolder,
      );

      storiesFolderPath = storiesFilePath.replace(
        `${genStoryFileOptions.fileOptions.fileName}${genStoryFileOptions.generateOptions.fileExt}`,
        options.storiesFolder || "",
      );
    }

    const storiesFilePathFinal = options.storiesFolder
      ? storiesFilePathWithStoriesFolder
      : storiesFilePath;

    fs.open(storiesFilePathFinal, "r", async (err) => {
      if (!genStoryFileOptions) {
        throwErr({
          errorCode: "EC03",
        });

        return;
      }

      // ファイルを開けなかったらファイルを作成する
      if (err) {
        if (options.storiesFolder) {
          fs.mkdirSync(storiesFolderPath);
        }

        // 同期処理でファイルを作成する
        fs.writeFileSync(
          storiesFilePathFinal,
          genStoryFileOptions.generateOptions.initialCode,
        );
      }

      const storiesProject = new Project();

      // ファイルを読み込む
      const storiesSourceFile
        = storiesProject.addSourceFileAtPath(storiesFilePathFinal);

      // stories.ts内のmetaを取得する
      const meta = storiesSourceFile.getVariableDeclaration("meta");

      if (
        !meta
        || !meta.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
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

      if (genStoryFileOptions.generateOptions.meta.render) {
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
          initializer: genStoryFileOptions.generateOptions.meta.render,
        });
      }

      if (genStoryFileOptions.generateOptions.meta.component) {
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
          initializer: genStoryFileOptions.generateOptions.meta.component,
        });
      }

      if (genStoryFileOptions.generateOptions.meta.args) {
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

        const argText = Object.entries(
          genStoryFileOptions.generateOptions.meta.args,
        )
          .map(x => x.join(":"))
          .join(", ");

        argsProperty.set({
          initializer: `{ ${argText} }`,
        });
      }

      if (genStoryFileOptions.generateOptions.meta.argTypes) {
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
          genStoryFileOptions.generateOptions.meta.argTypes,
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

          const fileContent = fs.readFileSync(storiesFilePathFinal, "utf-8");

          if (!genStoryFileOptions) {
            throwErr({
              errorCode: "EC03",
            });

            return;
          }

          const config: prettier.Options | null = genStoryFileOptions
            .fileOptions
            .prettierConfigPath
            ? await prettier.resolveConfig(
              genStoryFileOptions.fileOptions.prettierConfigPath,
            )
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
          fs.writeFileSync(storiesFilePathFinal, formattedContent);
        })
        .catch((err) => {
          throwErr({
            errorCode: "EC07",
            detail: err,
          });
        });
    });
  }
  catch {
    throwErr({
      errorCode: "EC11",
    });
  }
}
