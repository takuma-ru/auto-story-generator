import consola from "consola";
import { loadFile } from "magicast";
import { minimatch } from "minimatch";
import { Project } from "ts-morph";
import { UnpluginOptions } from "unplugin";

import { getComponentInfo } from "~/src/core/getComponentInfo";
import { genLitStoryFile } from "~/src/presets/lit/genLitStoryFile";
import { genReactStoryFile } from "~/src/presets/react/genReactStoryFile";
import { Options } from "~/src/types/Options";
import { throwErr } from "~/src/utils/throwError";

export const runGenStoryFile = async ({
  options,
  id,
  change,
  projectRootDir,
}: {
  options: Options;
  id: Parameters<NonNullable<UnpluginOptions["watchChange"]>>[0];
  change: Parameters<NonNullable<UnpluginOptions["watchChange"]>>[1];
  projectRootDir: ReturnType<typeof process.cwd>;
}) => {
  if (change.event === "delete") return;
  if (id.includes(".stories")) return;

  const isMatches = options.imports
    ? options.imports.map((importDir) => {
        let relativeSourceFilePath = id.replace(projectRootDir, "");

        if (
          relativeSourceFilePath.startsWith("/") ||
          relativeSourceFilePath.startsWith("\\")
        ) {
          relativeSourceFilePath = id.replace(projectRootDir, "").slice(1);
        }

        return minimatch(relativeSourceFilePath, importDir);
      })
    : [true];

  if (!isMatches.includes(true)) return;

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

    switch (options.preset) {
      case "lit": {
        await genLitStoryFile({
          componentName: componentName,
          fileBase: fileBase,
          fileName: fileName,
          path: id,
          fileExt: fileExt,
          filePrefixExt: filePrefixExt,
          relativeSourceFilePath: relativeSourceFilePath,
          sourceFile: sourceFile,
          prettierConfigPath: options.prettierConfigPath,
        });

        break;
      }

      case "react": {
        await genReactStoryFile({
          componentName: componentName,
          fileBase: fileBase,
          fileName: fileName,
          path: id,
          fileExt: fileExt,
          filePrefixExt: filePrefixExt,
          relativeSourceFilePath: relativeSourceFilePath,
          sourceFile: sourceFile,
          prettierConfigPath: options.prettierConfigPath,
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
  } catch (err) {
    throwErr({
      errorCode: "EC11",
    });

    return;
  }
};
