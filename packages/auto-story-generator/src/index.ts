import path from "path";

import { consola } from "consola";
import glob from "glob";
import { from, mergeMap } from "rxjs";
import { createUnplugin } from "unplugin";

import { runGenStoryFile } from "~/src/core/runGenStoryFile";
import { Options } from "~/src/types/Options";
import { getAllFilePaths } from "~/src/utils/getAllFilePaths";

const PLUGIN_NAME = "auto-story-generator";

let isExecuted: boolean = false;

const unplugin = createUnplugin((options: Options, meta) => {
  consola.info("ASG is running in", meta.framework);

  const projectRootDir = process.cwd();

  return {
    name: PLUGIN_NAME,

    buildStart() {
      if (!isExecuted) {
        if (!options.isGenerateStoriesFileAtBuild) {
          isExecuted = true;

          return;
        }

        const allFiles = glob.sync(path.join(process.cwd(), "**"));

        from(allFiles)
          .pipe(
            mergeMap(async (filePath) => {
              await runGenStoryFile({
                options,
                id: filePath,
                change: { event: "update" },
                projectRootDir,
              });
            }),
          )
          .subscribe();

        isExecuted = true;
      }
    },

    async watchChange(this, id, change) {
      await runGenStoryFile({ options, id, change, projectRootDir });
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
