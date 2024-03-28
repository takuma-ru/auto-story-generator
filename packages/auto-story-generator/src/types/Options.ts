export type Options = {
  preset: "lit" | "react" | "vue" | "angular" | "custom";

  /**
   * @default undefined
   *
   * @description
   *
   * The directories to watch for changes.
   *
   * ※ The directory designation should be written from the project root.
   *
   * @example
   *
   * `src/components/*.ts`
   * `src/components/**\/*.ts`
   */
  imports?: string[];

  /**
   * @default undefined
   *
   * @description
   *
   * Run prettier when generating Stories file.
   *
   * When doing so, you can specify the `.prettierrc` path to format the file according to the rules.
   */
  prettierConfigPath?: string;

  /**
   * @default false
   *
   * @description
   *
   * Flag value whether to generate stories for all component files only once at startup.
   */
  isGenerateStoriesFileOAtStartup?: boolean;
};
