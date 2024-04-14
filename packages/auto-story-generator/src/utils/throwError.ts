import { consola } from 'consola'

import { errorDefinition } from '~/src/constants/error'

type ThrowErrType = {
  [K in keyof typeof errorDefinition]: (typeof errorDefinition)[K]['isCustomDetail'] extends true
    ? { errorCode: K, detail: string }
    : { errorCode: K, detail?: never };
}

export const throwErr: <K extends keyof ThrowErrType>(
  params: ThrowErrType[K],
) => void = (params) => {
  const { errorCode, detail } = params

  const detailText = errorDefinition[errorCode].isCustomDetail
    ? detail
    : (errorDefinition[errorCode] as { detail: string }).detail

  // eslint-disable-next-line no-restricted-syntax
  consola.error(
    `\x1B[41m ASG:${errorCode} \x1B[0m\n${errorDefinition[errorCode].title}\n\x1B[90m${detailText}\n\nDetail: https://auto-story-generator.takumaru.dev/errors.html \x1B[0m`,
  )
}
