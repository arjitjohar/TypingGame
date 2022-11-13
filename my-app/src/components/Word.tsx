import React from "react";

type Props = {
  text: string;
  correct: number;
  active: boolean;
};

const Word = (props: Props) => {
  const { text, correct, active } = props;

  const [NOT_SEEN, WRONG, RIGHT] = [0, 1, 2];

  const word_logic = () => {
    if (correct == NOT_SEEN) {
      if (active) {
        return <span className="font-bold"> {text} </span>;
      } else {
        return <span className="font-normal"> {text} </span>;
      }
    }
    if (correct == WRONG) {
      if (active) {
        return <span className="font-bold text-red-500 "> {text} </span>;
      } else {
        return <span className="text-red-500"> {text}</span>;
      }
    }
    if (correct == RIGHT) {
      if (active) {
        return <span className="font-bold text-green-500">{text} </span>;
      } else {
        return <span className="font-normal text-green-500"> {text}</span>;
      }
    }
  };

  return <span>{word_logic()}</span>;
};
export default Word;
