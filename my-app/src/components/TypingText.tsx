import React, { useState, useEffect } from "react";
import Word from "./Word";

interface TypingTextProps {
  text: string[];
  activeWord: number;
  correct_arr: number[];
}

const TypingText = (props: TypingTextProps) => {
  //you must set the type of each useState
  const { text, activeWord, correct_arr } = props;

  return (
    <div className="">
      <a
        href="#"
        className="block p-6 max-w-fit bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Type as fast as you can!
        </h5>
        <p className=" text-gray-700 dark:text-gray-400">
          {text.map((word, index) => {
            if (index == activeWord) {
              return (
                <Word text={word} correct={correct_arr[index]} active={true} />
              );
            } else {
              return (
                <Word text={word} correct={correct_arr[index]} active={false} />
              );
            }
          })}
        </p>
      </a>
    </div>
  );
};

export default TypingText;
