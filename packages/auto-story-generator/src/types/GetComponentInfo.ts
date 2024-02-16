import path from "path";

export type GetComponentInfoReturnType = {
  fileName: path.ParsedPath["name"];
  fileType: `.${path.ParsedPath["ext"]}`;
  componentName: string | undefined;
  relativeSourceFilePath: string;
};
