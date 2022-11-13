import React, { useState, useEffect } from "react";
import StopClock from "./StopClock";
import TypingText from "./TypingText";

const TypingArea = () => {
  const [message, setMessage] = useState<string>("");

  const [activeWord, setactiveWord] = useState(0);

  const [correctArr, setcorrectArr] = useState<number[]>([]);

  const [NOT_SEEN, WRONG, RIGHT] = [0, 1, 2];

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [isStarted, setisStarted] = useState<boolean>(false);

  const [WPM, setWPM] = useState<number>(0);

  const sampleString =
    "I checked in for the night at Out O The Way motel. What a bad choice that was. First I took a shower and a spider crawled out of the drain. Next, the towel rack fell down when I reached for the one small bath towel. This allowed the towel to fall halfway into the toilet. I tried to watch a movie, but the remote control was sticky and wouldn’t stop scrolling through the channels. I gave up for the night and crawled into bed. I stretched out my leg and felt something furry by my foot. Filled with fear, I reached down and to my surprise, I pulled out a raccoon skin pair of underwear. After my initial relief that it wasn/’t alive, the image of a fat, ugly businessman wearing raccoon skin briefs filled my brain. I jumped out of the bed, threw my toothbrush into my bag, and sprinted towards my car.";

  const sampleStringArr = sampleString.split(" ");

  useEffect(() => {
    if (isStarted) {
      setInterval(() => {
        setCurrentTime((oldTime) => oldTime + 1);
      }, 1000);
    }
  }, [isStarted]);

  const handleMessageChange = (event: any) => {
    // 👇️ access textarea value9

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

        //when its wrong
      } else if (arr.at(-2) != sampleStringArr[activeWord]) {
        setcorrectArr((data) => {
          const arr = [...data];

          arr[activeWord] = WRONG;

          //update the typed string so far to remove the word you just typed wrong

          return arr;
        });
      } else if (arr.at(-2) == sampleStringArr[-1]) {
      }
    }

    console.log(activeWord);
  };

  useEffect(() => {
    const arr = Array(sampleStringArr.length + 1).fill(NOT_SEEN);
    arr[arr.length - 1] = RIGHT;
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
