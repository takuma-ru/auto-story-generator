import { ErrorType } from "~/src/types/error";

export const errorDefinition = {
  EC01: {
    title: "Not yet supported",
    detail:
      "Included in the preset but not yet supported. Please wait for support.",
    isCustomDetail: false,
  },
  EC02: {
    title: "Preset is not supported",
    isCustomDetail: true,
  },
  EC03: {
    title: "Unable to get component name or file path correctly.",
    detail: "Please check the file path and try again.",
    isCustomDetail: false,
  },
  EC04: {
    title: "Could not find argTypes",
    detail: "Error in genReactStoryFile.",
    isCustomDetail: false,
  },
  EC05: {
    title: "Could not find meta",
    isCustomDetail: true,
  },
  EC06: {
    title: "Could not find initializer",
    detail: "Could not get initializer of ObjectLiteralExpression.",
    isCustomDetail: false,
  },
  EC07: {
    title: "Could not find component",
    isCustomDetail: true,
  },
  EL01: {
    title: "Failed to save file",
    isCustomDetail: true,
  },
} as const satisfies ErrorType;
