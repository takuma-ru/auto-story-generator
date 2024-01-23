import consola from "consola";
import { pascalCase } from "scule";
import { TypeFlags } from "ts-morph";

import {
  GenReactPropTypesOptions,
  GenReactPropTypesReturn,
} from "~/src/types/GenPropTypeType";

const getTypeFlagsName = (flags: TypeFlags): string => {
  // Get all the keys of TypeFlags
  const keys = Object.keys(TypeFlags) as (keyof typeof TypeFlags)[];

  // Filter the keys where the flag is set
  const setFlags = keys.find((key) => flags === TypeFlags[key]);

  return setFlags || "err";
};

export const genReactPropTypes = ({
  sourceFile,
  componentName,
}: GenReactPropTypesOptions): GenReactPropTypesReturn => {
  const pascalComponentName = pascalCase(componentName);

  const props = sourceFile.getTypeAlias(`${pascalComponentName}Props`);

  const propTypesInterface = sourceFile.getInterface(
    `${pascalComponentName}Props`,
  );

  const propsTypeInterface =
    props?.getType().getProperties() ||
    propTypesInterface?.getType().getProperties();

  if (!propsTypeInterface) {
    return;
  }

  const propTypes = propsTypeInterface.map((prop) => {
    /* consola.log(
      `${prop.getName()}: ${prop.getValueDeclaration()?.getType().getText()}`,
    ); */

    const propName = prop.getName();
    const propType = prop.getValueDeclaration()?.getType();

    if (!propType) {
      return {
        name: propName,
        type: ["err"],
        isOptional: prop.isOptional(),
        value: [],
      };
    }

    if (propType.isUnion() && !propType.isBoolean()) {
      const unionTypes = propType.getUnionTypes();

      const type = Array.from(
        new Set(
          unionTypes.map((union) =>
            getTypeFlagsName(union.getFlags().valueOf()),
          ),
        ),
      );

      return {
        name: propName,
        type,
        isOptional: prop.isOptional(),
        value: unionTypes.map((union) => union.getText()),
      };
    }

    return {
      name: propName,
      type: [prop.getValueDeclaration()!.getType().getText()],
      isOptional: prop.isOptional(),
      value: [],
    };
  });

  consola.info(propTypes);

  return propTypes;
};
