import { pascalCase } from 'scule'
import type { Symbol } from 'ts-morph'
import { TypeFlags, ts } from 'ts-morph'

import type {
  GenReactPropTypesOptions,
  GenReactPropTypesReturn,
} from '~/src/types/GenPropTypeType'
import { removeQuotesAndWrapWithDoubleQuotes } from '~/src/utils/removeQuotesAndWrapWithDoubleQuotes'

function getTypeFlagsName(flags: TypeFlags) {
  // Get all the keys of TypeFlags
  const keys = Object.keys(TypeFlags) as (keyof typeof TypeFlags)[]

  // Filter the keys where the flag is set
  const setFlags = keys.find(key => flags === TypeFlags[key])

  return setFlags || 'err'
}

export function getReactPropTypes({
  sourceFile,
  componentName,
}: GenReactPropTypesOptions): {
    propsPattern?: 'component-props' | 'props' | 'inline'
    propTypes: GenReactPropTypesReturn
  } {
  if (!componentName) {
    return {
      propTypes: undefined,
    }
  }

  let propsPattern: 'component-props' | 'props' | 'inline' = 'component-props'

  const pascalComponentName = pascalCase(componentName)

  const propsType = sourceFile.getTypeAlias(`${pascalComponentName}Props`)
  const propsInterface = sourceFile.getInterface(`${pascalComponentName}Props`)
  const propsOnlyType = sourceFile.getTypeAlias('Props')
  const propsOnlyInterface = sourceFile.getInterface('Props')
  const propsInline = sourceFile
    .getVariableDeclaration(pascalComponentName)
    ?.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction)

  const props
    = propsType?.getType()
    || propsInterface?.getType()
    || propsOnlyType?.getType()
    || propsOnlyInterface?.getType()
    || propsInline?.getParameters()[0]?.getType()

  if (!props) {
    return {
      propTypes: [],
    }
  }

  // eslint-disable-next-line ts/ban-types
  let propsProperties: Symbol[] = []
  const isPropsIntersection = props.isIntersection()
  if (isPropsIntersection) {
    propsProperties = []

    const intersectionTypes = props.getIntersectionTypes()

    intersectionTypes.forEach((intersectionType) => {
      const intersectionTypeText = intersectionType.getText()

      if (intersectionTypeText.includes('HTMLAttributes'))
        return

      return propsProperties.push(...intersectionType.getProperties())
    })
  }
  else {
    propsProperties = props.getProperties()
  }

  if (propsOnlyType || propsOnlyInterface)
    propsPattern = 'props'

  if (propsInline)
    propsPattern = 'inline'

  const propTypes = propsProperties.map((prop) => {
    const propName = prop.getName()
    const propType = prop.getValueDeclaration()?.getType()

    if (!propType) {
      return {
        name: propName,
        type: ['err'],
        isOptional: prop.isOptional(),
        value: [],
      }
    }

    if (propType.isUnion() && !propType.isBoolean()) {
      const unionTypes = propType.getUnionTypes()

      const type = Array.from(
        new Set(
          unionTypes.map(union =>
            getTypeFlagsName(union.getFlags().valueOf()),
          ),
        ),
      )

      return {
        name: propName,
        type,
        isOptional: prop.isOptional(),
        value: unionTypes.map(union =>
          removeQuotesAndWrapWithDoubleQuotes(union.getText()),
        ),
      }
    }

    return {
      name: propName,
      type: [prop.getValueDeclaration()!.getType().getText()],
      isOptional: prop.isOptional(),
      value: [],
    }
  })

  return {
    propsPattern,
    propTypes,
  }
}
