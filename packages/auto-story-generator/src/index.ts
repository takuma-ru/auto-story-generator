import path from "path";

import { consola } from "consola";
import { loadFile } from "magicast";
import { minimatch } from "minimatch";
import { Project } from "ts-morph";
import { createUnplugin } from "unplugin";

import { genLitStoryFile } from "~/src/presets/lit/genLitStoryFile";
import { genReactStoryFile } from "~/src/presets/react/genReactStoryFile";
import { Options } from "~/src/types/Options";
import { getAllFilePaths } from "~/src/utils/getAllFilePaths";
import { getComponentInfo } from "~/src/utils/getComponentInfo";
import { throwErr } from "~/src/utils/throwError";

const PLUGIN_NAME = "auto-story-generator";

const unplugin = createUnplugin((options: Options, meta) => {
  consola.info("ASG is running in", meta.framework);

  const projectRootDir = process.cwd();

  return {
    name: PLUGIN_NAME,

    async watchChange(this, id, change) {
      if (change.event === "delete") return;
      if (id.includes(".stories")) return;

      // consola.info(`File ${id} has been ${change.event}`);

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

      // consola.info(`${componentName} component has been changed`);

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
    },
    webpack: (compiler) => {
      compiler.hooks.afterCompile.tapAsync(PLUGIN_NAME, (_, callback) => {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
          options.imports?.forEach((importDir) => {
            const allFilePaths = getAllFilePaths(importDir, importDir);

            allFilePaths.forEach((filePath) => {
              compilation.fileDependencies.add(
                path.join(projectRootDir, filePath),
              );
            });
          });
        });

        callback();
      });
    },
  };
});

export default unplugin;
