import { consola } from "consola";

import { errorDefinition } from "~/src/constants/error";

type ThrowErrType = {
  [K in keyof typeof errorDefinition]: (typeof errorDefinition)[K]["isCustomDetail"] extends true
    ? { errorCode: K; detail: string }
    : { errorCode: K; detail?: never };
};

export const throwErr: <K extends keyof ThrowErrType>(
  params: ThrowErrType[K],
) => void = (params) => {
  const { errorCode, detail } = params;

  if (errorDefinition[errorCode].isCustomDetail) {
    // eslint-disable-next-line no-restricted-syntax
    consola.error(
      `\x1b[41m ${errorCode} \x1b[0m\nTitle: ${errorDefinition[errorCode].title}\nDetail: ${detail}`,
    );
  } else {
    // eslint-disable-next-line no-restricted-syntax
    consola.error(
      `\x1b[41m ${errorCode} \x1b[0m\nTitle: ${errorDefinition[errorCode].title}\nDetail: ${
        (errorDefinition[errorCode] as { detail: string }).detail
      }`,
    );
  }
};
