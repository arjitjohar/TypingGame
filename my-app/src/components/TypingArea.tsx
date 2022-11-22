import React, { useState, useEffect, useCallback } from "react";
import StopClock from "./StopClock";
import TypingText from "./TypingText";

const TypingArea = () => {
  const [message, setMessage] = useState<string>("");

  const [activeWord, setactiveWord] = useState(0);

  const [correctArr, setcorrectArr] = useState<number[]>([]);

  const [NOT_SEEN, WRONG, RIGHT] = [0, 1, 2];

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [isStarted, setisStarted] = useState<boolean>(false);
  const [isFinished, setisFinished] = useState<boolean>(false);

  const sampleString = "I checked in for the night at Out O The Way motel.";

  const sampleStringArr = sampleString.split(" ");
  const sampleStringLength = sampleStringArr.length;

  useEffect(() => {
    if (isStarted) {
      setInterval(() => {
        setCurrentTime((oldTime) => oldTime + 1);
      }, 1000);
    }
  }, [isStarted]);

  const handleMessageChange = (event: any) => {
    // 👇️ access textarea value

    setMessage(event.target.value);
    let arr = event.target.value.split(" ");
    setisStarted(true);
    //update the array
    if (
      arr.at(-1) === "" &&
      (correctArr[activeWord - 1] == RIGHT || activeWord == 0)
    ) {
      //when its correct
      if (arr.at(-2) === sampleStringArr[activeWord]) {
        setcorrectArr((data) => {
          const arr = [...data];

          arr[activeWord] = RIGHT;
          setactiveWord(activeWord + 1);

          return arr;
        });
        setMessage(" ");

        //when its wrong
      } else if (arr.at(-2) !== sampleStringArr[activeWord]) {
        setcorrectArr((data) => {
          const arr = [...data];

          arr[activeWord] = WRONG;

          //update the typed string so far to remove the word you just typed wrong

          return arr;
        });
        setMessage(" ");
      } else if (arr.at(-2) === sampleStringArr[-1]) {
        setMessage("");
        setisStarted(false);
      }
    }

    console.log(activeWord);
  };

  useEffect(() => {
    const arr = Array(sampleStringArr.length + 1).fill(NOT_SEEN);

    setcorrectArr(arr);
  }, []);

  return (
    <div className="">
      <StopClock seconds={currentTime} />
      <div>
        <TypingText
          activeWord={activeWord}
          correct_arr={correctArr}
          text={sampleStringArr}
        />
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        ></label>
      </div>

      <div>
        <textarea
          id="message"
          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type the paragraph here..."
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </div>
    </div>
  );
};

export default TypingArea;
