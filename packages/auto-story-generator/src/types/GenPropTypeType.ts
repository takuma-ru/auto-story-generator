import type { GenStoryFileOptions } from "~/src/types/GenStoryFileType";

export interface GenReactPropTypesOptions {
  sourceFile: GenStoryFileOptions["fileOptions"]["sourceFile"];
  componentName: GenStoryFileOptions["fileOptions"]["componentName"];
}

export type GenReactPropTypesReturn =
  | Array<{
    name: string;
    type: string[];
    isOptional: boolean;
    value: string[];
  }>
  | undefined;
