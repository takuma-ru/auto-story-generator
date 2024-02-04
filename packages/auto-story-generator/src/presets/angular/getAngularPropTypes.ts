import { pascalCase } from "scule";
import { TypeFlags, ts, Symbol, SourceFile } from "ts-morph";

import {
  GenReactPropTypesOptions,
  GenReactPropTypesReturn,
} from "~/src/types/GenPropTypeType";

const getTypeFlagsName = (flags: TypeFlags) => {
  // Get all the keys of TypeFlags
  const keys = Object.keys(TypeFlags) as (keyof typeof TypeFlags)[];

  // Filter the keys where the flag is set
  const setFlags = keys.find((key) => flags === TypeFlags[key]);

  return setFlags || "err";
};

// Didn't understnd the Props yet, will add this after proper understanding is reached.
export const getAngularPropTypes = ({sourceFile, componentName}: { sourceFile: SourceFile; componentName: string; })=> {
  const pascalComponentName = pascalCase(componentName);
}

// export const getAngularPropTypes = ({
//   sourceFile,
//   componentName,
// }: GenReactPropTypesOptions): {
//   propsPattern?: "component-props" | "props" | "inline";
//   propTypes: GenReactPropTypesReturn;
// } => {
//   let propsPattern: "component-props" | "props" | "inline" = "component-props";


//   const props =
//     propsType?.getType() ||
//     propsInterface?.getType() ||
//     propsOnlyType?.getType() ||
//     propsOnlyInterface?.getType() ||
//     propsInline?.getParameters()[0].getType();

//   if (!props) {
//     return {
//       propTypes: undefined,
//     };
//   }

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   let propsProperties: Symbol[] = [];
//   const isPropsIntersection = props.isIntersection();
//   if (isPropsIntersection) {
//     propsProperties = [];

//     const intersectionTypes = props.getIntersectionTypes();

//     intersectionTypes.forEach((intersectionType) => {
//       const intersectionTypeText = intersectionType.getText();

//       if (intersectionTypeText.includes("HTMLAttributes")) {
//         return;
//       }

//       return propsProperties.push(...intersectionType.getProperties());
//     });
//   } else {
//     propsProperties = props.getProperties();
//   }

//   if (propsOnlyType || propsOnlyInterface) {
//     propsPattern = "props";
//   }

//   if (propsInline) {
//     propsPattern = "inline";
//   }

//   const propTypes = propsProperties.map((prop) => {
//     const propName = prop.getName();
//     const propType = prop.getValueDeclaration()?.getType();

//     if (!propType) {
//       return {
//         name: propName,
//         type: ["err"],
//         isOptional: prop.isOptional(),
//         value: [],
//       };
//     }

//     if (propType.isUnion() && !propType.isBoolean()) {
//       const unionTypes = propType.getUnionTypes();

//       const type = Array.from(
//         new Set(
//           unionTypes.map((union) =>
//             getTypeFlagsName(union.getFlags().valueOf()),
//           ),
//         ),
//       );

//       return {
//         name: propName,
//         type,
//         isOptional: prop.isOptional(),
//         value: unionTypes.map((union) => union.getText().replace(/"/g, "")),
//       };
//     }

//     return {
//       name: propName,
//       type: [prop.getValueDeclaration()!.getType().getText()],
//       isOptional: prop.isOptional(),
//       value: [],
//     };
//   });

//   return {
//     propsPattern,
//     propTypes,
//   };
// };
