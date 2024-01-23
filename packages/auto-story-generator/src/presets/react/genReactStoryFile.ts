import { genReactPropTypes } from "~/src/presets/react/genReactPropTypes";
import { GenStoryFileOptions } from "~/src/types/GenStoryFileType";
import { genStoryFile } from "~/src/utils/genStoryFile";

export const genReactStoryFile = async ({
  componentName,
  fileName,
  path,
  type,
  relativeSourceFilePath,
  sourceFile,
}: GenStoryFileOptions["fileOptions"]) => {
  genReactPropTypes({ sourceFile, componentName });

  genStoryFile({
    fileOptions: {
      componentName,
      fileName,
      path,
      type,
      relativeSourceFilePath,
      sourceFile,
    },
    generateOptions: {
      fileType: ".stories.tsx",
      initialCode: "const meta = {render: () => {}, args: {}, argTypes: {}};",
      meta: {
        render: "() => {}",
        args: {},
        argTypes: {},
      },
    },
  });
};
