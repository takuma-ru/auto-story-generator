import path from "path";

import { consola } from "consola";
import { loadFile } from "magicast";
import { minimatch } from "minimatch";
import { Project } from "ts-morph";
import { createUnplugin } from "unplugin";

import { genLitStoryFile } from "~/src/presets/lit/genLitStoryFile";
import { genReactStoryFile } from "~/src/presets/react/genReactStoryFile";
import { getAllFilePaths } from "~/src/utils/getAllFilePaths";
import { getComponentInfo } from "~/src/utils/getComponentInfo";

export type AsgOptions = {
  preset: "lit" | "react" | "vue" | "custom";
  /**
   * @default undefined
   *
   * @description
   *
   * The directories to watch for changes.
   *
   * ※ The directory designation should be written from the project root.
   *
   * @example
   *
   * `src/components/*.ts`
   * `src/components/**\/*.ts`
   */
  imports?: string[];

  prettierConfigPath?: string;
};

const PLUGIN_NAME = "auto-story-generator";

const unplugin = createUnplugin((options: AsgOptions, meta) => {
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
            const relativeSourceFilePath = id
              .replace(projectRootDir, "")
              .startsWith("/")
              ? id.replace(projectRootDir, "").slice(1)
              : id.replace(projectRootDir, "");

            return minimatch(relativeSourceFilePath, importDir);
          })
        : [true];

      if (!isMatches.includes(true)) return;

      const { fileName, fileType, componentName, relativeSourceFilePath } =
        getComponentInfo(id);

      if (!componentName || !fileName) {
        return consola.error("Could not find component name");
      }

      // consola.info(`${componentName} component has been changed`);

      const mod = await loadFile(id);
      const project = new Project();
      const sourceFile = project.createSourceFile(fileName || "", mod.$code);

      consola.start(`${componentName} Story file is being generated ....`);

      switch (options.preset) {
        case "lit": {
          await genLitStoryFile({
            componentName,
            fileName,
            path: id,
            type: fileType,
            relativeSourceFilePath,
            sourceFile,
            prettierConfigPath: options.prettierConfigPath,
          });

          break;
        }

        case "react": {
          await genReactStoryFile({
            componentName,
            fileName,
            path: id,
            type: fileType,
            relativeSourceFilePath,
            sourceFile,
            prettierConfigPath: options.prettierConfigPath,
          });

          break;
        }

        case "vue": {
          consola.error("Not yet supported.");
          break;
        }

        case "custom": {
          consola.error("Not yet supported.");
          break;
        }

        default: {
          consola.error(
            `Preset ${options.preset} is not supported. Please use one of the following: lit, react, vue, custom`,
          );
        }
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
