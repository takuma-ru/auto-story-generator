import { SourceFile } from "ts-morph";

export type GenReactPropTypesOptions = {
  sourceFile: SourceFile;
  componentName: string;
};

export type GenReactPropTypesReturn =
  | Array<{
      name: string;
      type: string[];
      isOptional: boolean;
      value: string[];
    }>
  | undefined;
