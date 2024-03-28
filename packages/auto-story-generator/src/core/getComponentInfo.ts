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

  const prefixExtRegex = new RegExp(`(\\.\\w+)+(?=\\${fileParseInfo.ext}$)`);
  const prefixExtRegexMatch = fileParseInfo.base.match(prefixExtRegex);

  const prefixExt = prefixExtRegexMatch ? prefixExtRegexMatch[0] : undefined;

  const fileName = fileParseInfo.name.replace(prefixExt || "", "");

  const componentName =
    fileName === "index" ? fileParseInfo.dir.split("/").pop() : fileName;

  let relativeSourceFilePath = componentDir.replace(projectRootDir, "");

  if (
    relativeSourceFilePath.startsWith("/") ||
    relativeSourceFilePath.startsWith("\\")
  ) {
    relativeSourceFilePath = componentDir.replace(projectRootDir, "").slice(1);
  }

  return {
    fileBase: fileParseInfo.base,
    fileExt: fileParseInfo.ext as unknown as `.${path.ParsedPath["ext"]}`,
    fileName: fileName,
    filePrefixExt: prefixExt as unknown as `.${string}` | undefined,
    componentName,
    relativeSourceFilePath,
  } as const;
};
