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

  prettierConfigPath?: string;
};
