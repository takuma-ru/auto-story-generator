import path from "path";

import { GetComponentInfoReturnType } from "~/src/types/GetComponentInfo";

/**
 * Returns the file information needed to generate the story file
 * @param componentDir
 */
export const getComponentInfo = (
  componentDir: string,
): GetComponentInfoReturnType => {
  const projectRootDir = process.cwd();

  const fileParseInfo = path.parse(componentDir);

  const componentName =
    fileParseInfo.name === "index"
      ? fileParseInfo.dir.split("/").pop()
      : fileParseInfo.name;

  let relativeSourceFilePath = componentDir.replace(projectRootDir, "");

  if (
    relativeSourceFilePath.startsWith("/") ||
    relativeSourceFilePath.startsWith("\\")
  ) {
    relativeSourceFilePath = componentDir.replace(projectRootDir, "").slice(1);
  }

  return {
    fileName: fileParseInfo.base,
    fileType: fileParseInfo.ext as unknown as `.${path.ParsedPath["ext"]}`,
    componentName,
    relativeSourceFilePath,
  } as const;
};
