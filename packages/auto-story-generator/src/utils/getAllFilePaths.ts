import path from "path";

import { glob } from "glob";

/**
 *  Get all file paths in a directory
 * @param pattern - options.imports
 * @param projectRootDir - process.cwd()
 * @returns all file paths
 */
export const getAllFilePaths = ({
  pattern,
  projectRootDir,
}: {
  pattern: string;
  projectRootDir: ReturnType<typeof process.cwd>;
}): string[] => {
  // process.cwd()は現在の作業ディレクトリを返します。
  // path.joinを使用して、現在の作業ディレクトリとパターンを結合します。
  const fullPathPattern = path.join(projectRootDir, pattern);

  // glob.syncを使用して、パターンに一致する全てのファイルパスを取得します。
  const filePaths = glob.sync(fullPathPattern);

  return filePaths;
};
