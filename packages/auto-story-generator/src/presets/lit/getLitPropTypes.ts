import { pascalCase } from 'scule'

import type {
  GenReactPropTypesOptions,
  GenReactPropTypesReturn,
} from '~/src/types/GenPropTypeType'
import { removeQuotesAndWrapWithDoubleQuotes } from '~/src/utils/removeQuotesAndWrapWithDoubleQuotes'
import { throwErr } from '~/src/utils/throwError'

export function getLitPropTypes({
  sourceFile,
  componentName,
}: GenReactPropTypesOptions): GenReactPropTypesReturn {
  if (!componentName)
    return

  const pascalComponentName = pascalCase(componentName)

  const componentClassDeclaration = sourceFile.getClass(pascalComponentName)

  if (!componentClassDeclaration) {
    throwErr({
      errorCode: 'EL01',
      detail: `Could not find class ${pascalComponentName} in file ${sourceFile.getFilePath()}`,
    })

    return
  }

  const propertyDeclarations = componentClassDeclaration.getProperties()

  const argTypes = propertyDeclarations.map((prop) => {
    const propType = prop.getType()
    const propTypeFlags = propType.getFlags().valueOf()
    const propTypeText = propType.getText()
    const isOptional = prop.hasQuestionToken()

    switch (propTypeFlags) {
      // Any
      case 1: {
        return {
          name: prop.getName(),
          type: ['any'],
          isOptional,
          value: [],
        }
      }
      // Unknown
      case 2: {
        return {
          name: prop.getName(),
          type: ['unknown'],
          isOptional,
          value: [],
        }
      }
      // String
      case 4: {
        return {
          name: prop.getName(),
          type: ['string'],
          isOptional,
          value: [],
        }
      }
      // Number
      case 8: {
        return {
          name: prop.getName(),
          type: ['number'],
          isOptional,
          value: [],
        }
      }
      // Boolean
      case 16: {
        return {
          name: prop.getName(),
          type: ['boolean'],
          isOptional,
          value: [],
        }
      }
      // Enum
      case 32: {
        // TODO: enumを分解する処理をかく
        return {
          name: prop.getName(),
          type: ['enum'],
          isOptional,
          value: [],
        }
      }
      // StringLiteral
      case 128: {
        return {
          name: prop.getName(),
          type: ['string'],
          isOptional,
          value: [removeQuotesAndWrapWithDoubleQuotes(propTypeText)],
        }
      }
      // NumberLiteral
      case 256: {
        return {
          name: prop.getName(),
          type: ['number'],
          isOptional,
          value: [removeQuotesAndWrapWithDoubleQuotes(propTypeText)],
        }
      }
      // BooleanLiteral
      case 512: {
        return {
          name: prop.getName(),
          type: ['boolean'],
          isOptional,
          value: [removeQuotesAndWrapWithDoubleQuotes(propTypeText)],
        }
      }
      // EnumLiteral
      case 1024: {
        // TODO: enumを分解する処理をかく
        return {
          name: prop.getName(),
          type: ['enum'],
          isOptional,
          value: [],
        }
      }
      // Undefined
      case 32768: {
        return {
          name: prop.getName(),
          type: ['undefined'],
          isOptional,
          value: [],
        }
      }
      // Null
      case 65536: {
        return {
          name: prop.getName(),
          type: ['null'],
          isOptional,
          value: [],
        }
      }
      // Never
      case 131072: {
        return {
          name: prop.getName(),
          type: ['never'],
          isOptional,
          value: [],
        }
      }
      // Object
      case 524288: {
        return {
          name: prop.getName(),
          type: ['object'],
          isOptional,
          value: [],
        }
      }
      // Union
      case 1048576: {
        const unions = propType.getUnionTypes().map((union) => {
          const unionFlags = union.getFlags().valueOf()
          const unionText = union.getText()

          switch (unionFlags) {
            // String
            case 4: {
              return {
                type: 'string',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // Number
            case 8: {
              return {
                type: 'number',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // Boolean
            case 16: {
              return {
                type: 'boolean',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // StringLiteral
            case 128: {
              return {
                type: 'string',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // NumberLiteral
            case 256: {
              return {
                type: 'number',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // BooleanLiteral
            case 512: {
              return {
                type: 'boolean',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // Undefined
            case 32768: {
              return {
                type: 'undefined',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // Null
            case 65536: {
              return {
                type: 'null',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            // Never
            case 131072: {
              return {
                type: 'never',
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
            default: {
              return {
                type: unionText,
                value: removeQuotesAndWrapWithDoubleQuotes(unionText),
              }
            }
          }
        })

        return {
          name: prop.getName(),
          type: Array.from(new Set(unions.map(union => union?.type))),
          isOptional: prop.hasQuestionToken(),
          value: unions.map(union => union?.value),
        }
      }
      default: {
        return {
          name: prop.getName(),
          type: [propTypeText],
          isOptional,
          value: [],
        }
      }
    }
  })

  return argTypes
}
