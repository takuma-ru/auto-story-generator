import { SourceFile } from "ts-morph";

import { GetComponentInfoReturnType } from "~/src/types/GetComponentInfo";
import { Options } from "~/src/types/Options";

export type GenStoryFileOptions = {
  fileOptions: {
    componentName: GetComponentInfoReturnType["componentName"];
    fileBase: GetComponentInfoReturnType["fileBase"];
    type: GetComponentInfoReturnType["fileExt"];
    relativeSourceFilePath: GetComponentInfoReturnType["relativeSourceFilePath"];
    path: string;
    sourceFile: SourceFile;
    prettierConfigPath?: Options["prettierConfigPath"];
  };
  generateOptions: {
    fileType: `.stories.${string}`;
    initialCode: string;
    meta: {
      render?: string;
      component?: string;
      args?: { [key: string]: string | number | boolean | undefined };
      argTypes?: {
        [key: string]: {
          control: string;
          options?: string[];
        };
      };
    };
  };
};
