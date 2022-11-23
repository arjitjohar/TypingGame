import React from "react";

type Props = {
  text: string;
  correct: number;
  active: boolean;
};

const Word = (props: Props) => {
  const { text, correct, active } = props;

  const [NOT_SEEN, WRONG, RIGHT] = [0, 1, 2];

  //make a function that makes the word red if its wrong, green if its right, and bold black if its not seen and bold if its active
  const getStyle = () => {
    if (correct == NOT_SEEN) {
      if (active) {
        return "font-bold";
      } else {
        return "font-normal";
      }
    } else if (correct == WRONG) {
      return "text-red-500 font-bold";
    } else if (correct == RIGHT) {
      return "text-green-500 font-bold";
    }
  };

  return <span className={getStyle()}>{text + " "}</span>;
};
export default Word;
