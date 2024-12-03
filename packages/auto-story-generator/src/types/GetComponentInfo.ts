import type path from "node:path";

export interface GetComponentInfoReturnType {
  /**
   * The name of the file
   *
   * @example
   * `ComponentName.tsx`
   * `index.tsx`
   */
  fileBase: path.ParsedPath["base"];
  /**
   * file type
   *
   * @example
   * `ComponentName.tsx`→`.tsx`
   * `ComponentName.vue`→`.vue`
   * `ComponentName.ce.ts`→`.ts`
   */
  fileExt: `.${path.ParsedPath["ext"]}`;

  /**
   * file prefix type
   *
   * @description
   * The part between the filename and the extension name that begins with ".".
   *
   * @example
   * `ComponentName.tsx`→ undefined
   * `ComponentName.vue`→ undefined
   * `ComponentName.ce.ts`→`.ce`
   */
  filePrefixExt?: `.${string}`;
  /**
   * The name of the component file
   *
   * @example
   * `ComponentName`
   * `index`
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
}
