import path from "path";

export type GetComponentInfoReturnType = {
  /**
   * The name of the file
   *
   * @example
   * `ComponentName.tsx`, `index.tsx`
   */
  fileBase: path.ParsedPath["base"];
  /**
   * file type
   *
   * @example
   * `.tsx`, `.vue`
   */
  fileExt: `.${path.ParsedPath["ext"]}`;
  /**
   * The name of the component file
   *
   * @example
   * `ComponentName`, `index`
   */
  fileName: path.ParsedPath["name"];
  /**
   * The name of the component
   *
   * For index.tsx, the directory name in the parent
   * @example
   * `ComponentName`
   */
  componentName: string | undefined;
  /**
   * The relative path to the source file
   *
   * @example
   * `src/components/ComponentName/ComponentName.tsx`
   */
  relativeSourceFilePath: string;
};
