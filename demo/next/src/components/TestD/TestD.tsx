import { FC } from "react";

type Props = {
  text: string;
};

export const TestD: FC<Props> = ({ text }) => {
  return (
    <>
      <div>TestA</div>
      <p>{text}</p>
    </>
  );
};
