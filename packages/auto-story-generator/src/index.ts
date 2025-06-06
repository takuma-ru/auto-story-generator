import type { Options } from "~/src/types/Options";

import path from "node:path";
import { cwd } from "node:process";
import { consola } from "consola";
import { globSync } from "glob";
import { from, mergeMap } from "rxjs";

import { createUnplugin } from "unplugin";
import { genStoryFile } from "~/src/core/genStoryFile";
import { getAllFilePaths } from "~/src/utils/getAllFilePaths";

const PLUGIN_NAME = "auto-story-generator";

let isExecuted: boolean = false;

const unplugin = createUnplugin((options: Options, meta) => {
  consola.info("ASG is running in", meta.framework);

  const projectRootDir = cwd().replace(/\\/g, "/");

  return {
    name: PLUGIN_NAME,

    buildStart() {
      if (!isExecuted) {
        if (!options.isGenerateStoriesFileAtBuild) {
          isExecuted = true;

          return;
        }

        const allFiles = globSync(path.join(cwd(), "**").replace(/\\/g, "/"));

        from(allFiles)
          .pipe(
            mergeMap(async (filePath) => {
              await genStoryFile({
                options,
                id: filePath.replace(/\\/g, "/"),
                projectRootDir,
              });
            }),
          )
          .subscribe();

        isExecuted = true;
      }
    },

    async watchChange(this, id, change) {
      if (change.event === "delete")
        return;

      await genStoryFile({ options, id, projectRootDir });
    },

    webpack: (compiler) => {
      compiler.hooks.afterCompile.tapAsync(PLUGIN_NAME, (_, callback) => {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
          options.imports?.forEach((importDir) => {
            const allFilePaths = getAllFilePaths({
              pattern: importDir,
              projectRootDir,
            });

            allFilePaths.forEach((filePath) => {
              compilation.fileDependencies.add(path.join(filePath));
            });
          });
        });

        callback();
      });
    },
  };
});

export default unplugin;
