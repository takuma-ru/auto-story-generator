import type { SourceFile } from 'ts-morph'

import type { GetComponentInfoReturnType } from '~/src/types/GetComponentInfo'
import type { Options } from '~/src/types/Options'

export interface GenStoryFileOptions {
  fileOptions: {
    path: string
    sourceFile: SourceFile
    prettierConfigPath?: Options['prettierConfigPath']
  } & GetComponentInfoReturnType
  generateOptions: {
    fileExt: `.stories.${string}`
    initialCode: string
    meta: {
      render?: string
      component?: string
      args?: { [key: string]: string | number | boolean | undefined }
      argTypes?: {
        [key: string]: {
          control: string
          options?: string[]
        }
      }
    }
  }
}
