import { SourceFile } from "ts-morph";

import { GetComponentInfoReturnType } from "~/src/types/GetComponentInfo";
import { Options } from "~/src/types/Options";

export type GenStoryFileOptions = {
  fileOptions: {
    path: string;
    sourceFile: SourceFile;
    prettierConfigPath?: Options["prettierConfigPath"];
  } & GetComponentInfoReturnType;
  generateOptions: {
    fileExt: `.stories.${string}`;
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
