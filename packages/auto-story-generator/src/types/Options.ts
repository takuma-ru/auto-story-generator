export interface Options {
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
   * The directories to ignore.
   *
   * ※ The directory designation should be written from the project root.
   *
   * @example
   *
   * `src/components/IgnoreComponent/IgnoreComponent.ts`
   */
  ignores?: string[];

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
   * Automatic generation for all component files only once at build time (`run dev`, `run build`)
   */
  isGenerateStoriesFileAtBuild?: boolean;

  /**
   * @default undefined
   *
   * @description
   *
   * Generate the stories in specified folder.
   *
   * @example
   * __stories__
   */
  storiesFolder?: string;
}
