import { ErrorType } from "~/src/types/ErrorType";

export const errorDefinition = {
  // Common
  EC00: {
    title: "Unknown error",
    isCustomDetail: true,
  },
  EC01: {
    title: "Not yet supported",
    detail:
      "This preset name is included in the preset bust not yet supported. Please wait for support.",
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
  EC08: {
    title: "Could not scan directory",
    isCustomDetail: true,
  },
  EC09: {
    title: "Reading directory failed",
    isCustomDetail: true,
  },
  EC10: {
    title: "Could not get property from stories",
    isCustomDetail: true,
  },
  EC11: {
    title: "File is defective.",
    detail:
      "An error occurred during abstract syntax tree parsing.\nPlease check your file for problems.",
    isCustomDetail: false,
  },

  // Lit
  EL01: {
    title: "Failed to save file",
    isCustomDetail: true,
  },
} as const satisfies ErrorType;
