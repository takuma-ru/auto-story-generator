import { consola } from "consola";
import { loadFile } from "magicast";
import { Project } from "ts-morph";
import { createUnplugin } from "unplugin";

import { genLitStoryFile } from "~/presets/lit/genStoryFile";

export type AsgOptions = {
  dirname: string;
  preset: "lit" | "react" | "vue" | "custom";
};

const unplugin = createUnplugin((options: AsgOptions) => {
  return {
    name: "auto-story-generator",
    vite: {
      async handleHotUpdate({ file }: { file: string }) {
        if (file.endsWith(".stories.ts")) return;

        consola.info(`File ${file} changed.`);

        const mod = await loadFile(file);
        const project = new Project();

        const sourceFile = project.createSourceFile(
          file.split("/").pop()!,
          mod.$code,
        );

        switch (options.preset) {
          case "lit": {
            if (file.endsWith(".ce.ts")) {
              const componentName = file
                .split("/")
                .pop()!
                .replace(".ce.ts", "");

              consola.start(
                `Start of automatic ${componentName} story generation`,
              );
              await genLitStoryFile({
                sourceFile,
                componentName,
                relativeSourceFilePath: file.replace(options?.dirname, ""),
                file,
              });
            }
            break;
          }

          case "react": {
            consola.error("Not yet supported.");
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
    },
  };
});

export default unplugin;
