import fs from "fs";
import path from "path";

import { minimatch } from "minimatch";

/**
 *  Get all file paths in a directory
 * @param dirPath
 * @returns all file paths
 */
export const getAllFilePaths = (
  dirPath: string,
  importDirGlob: string,
): string[] => {
  const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
  };

  const asteriskIndex = dirPath.indexOf("*");
  let dirPathToAsterisk: string;

  if (asteriskIndex !== -1) {
    dirPathToAsterisk = dirPath.substring(0, asteriskIndex);
  } else {
    dirPathToAsterisk = dirPath;
  }

  const entries = fs.readdirSync(dirPathToAsterisk, { withFileTypes: true });

  const filePaths = entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const filePath = path.join(dirPathToAsterisk, entry.name);
      return minimatch(filePath, importDirGlob) ? filePath : undefined;
    })
    .filter(isDefined);

  const dirPaths = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) =>
      getAllFilePaths(path.join(dirPathToAsterisk, entry.name), importDirGlob),
    ); // Recursively get file paths in subdirectories

  return filePaths.concat(...dirPaths);
};
