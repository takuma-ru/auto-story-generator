import { SourceFile } from "ts-morph";

export type GenStoryFileOptions = {
  fileOptions: {
    componentName: string;
    fileName: string;
    path: string;
    type: `.${string}`;
    relativeSourceFilePath: string;
    sourceFile: SourceFile;
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
