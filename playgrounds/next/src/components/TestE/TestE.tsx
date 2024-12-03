import { FC } from "react";

type Props = {
  text: string;
};

const TestE: FC<Props> = ({ text }) => {
  return (
    <>
      <div>TestA</div>
      <p>{text}</p>
    </>
  );
};

export default TestE;
