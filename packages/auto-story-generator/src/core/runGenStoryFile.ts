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
  projectRootDir,
}: {
  options: Options;
  id: Parameters<NonNullable<UnpluginOptions["watchChange"]>>[0];
  projectRootDir: ReturnType<typeof process.cwd>;
}) => {
  if (id.includes(".stories")) return;

  const isGenFile = () => {
    let relativeSourceFilePath = id.replace(projectRootDir, "");

    if (
      relativeSourceFilePath.startsWith("/") ||
      relativeSourceFilePath.startsWith("\\")
    ) {
      relativeSourceFilePath = id.replace(projectRootDir, "").slice(1);
    }

    const isMatchImports = options.imports
      ? options.imports.some((importDir) =>
          minimatch(relativeSourceFilePath, importDir),
        )
      : true;

    const isMatchIgnores = options.ignores
      ? options.ignores.some((ignorePath) =>
          minimatch(relativeSourceFilePath, ignorePath),
        )
      : false;

    return isMatchImports && !isMatchIgnores;
  };

  if (!isGenFile()) return;

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
