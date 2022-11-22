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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <TypingText
            text={sampleStringArr}
            correct_arr={correctArr}
            activeWord={activeWord}
          />
        </div>
        <textarea
          className="w-96 h-32 border-2 border-gray-300 rounded-lg"
          onChange={handleMessageChange}
          value={message}
        />
      </div>
      <div className="flex flex-row">
        <StopClock seconds={currentTime} />
      </div>
    </div>
  );
};

export default TypingArea;
