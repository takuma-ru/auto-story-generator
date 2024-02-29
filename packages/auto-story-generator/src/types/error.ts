export type ErrorType = {
  [key: `E${"C" | "R" | "L" | "V" | "A"}${number}`]:
    | {
        title: string;
        detail: string;
        isCustomDetail: false;
      }
    | {
        title: string;
        detail?: never;
        isCustomDetail: true;
      };
};
