import React, { useState, useEffect } from "react";
import StopClock from "./StopClock";
import TypingText from "./TypingText";
import ParticleBackground from "./ParticleBackground";

//import axios to the react app
import axios from "axios";

//from /paragraph endpoint, get the paragraph

//TODO: create a reset button


const TypingArea = () => {
  const [message, setMessage] = useState<string>("");

  //use state to store the paragraph
  const [paragraph, setParagraph] = useState<string>("");

  const [reload, setReload] = useState<boolean>(false);


  //get the paragraph from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/paragraph")
      .then((res) => {
        setParagraph(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const [activeWord, setactiveWord] = useState(0);

  const [correctArr, setcorrectArr] = useState<number[]>([]);

  const [NOT_SEEN, WRONG, RIGHT] = [0, 1, 2];

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [isStarted, setisStarted] = useState<boolean>(false);
  const sampleString = paragraph;

  const sampleStringArr = sampleString.split(" ");
  const sampleStringArrLength = sampleStringArr.length;
  const [isFinished, setisFinished] = useState<boolean>(false);

  //create useState called FinishTest
  const [FinishTest, setFinishTest] = useState<boolean>(false);



  //increment a timer every second
  useEffect(() => {
    if (isStarted && !isFinished && !FinishTest) {
      const timer = setTimeout(() => {
        setCurrentTime((currentTime) => currentTime + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStarted, currentTime]);

  const handleMessageChange = (event: any) => {
    // 👇️ access textarea value

    setMessage(event.target.value);
    let arr = event.target.value.split(" ");
    setisStarted(true);
    setisFinished(false);

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
      }

      //if the last word is typed
      if (activeWord == sampleStringArrLength - 1) {
        setisFinished(true);

        //create an alert that says your wpm is x
        alert(
          "Your WPM is " + Math.round((activeWord / currentTime) * 60) + "!"
        );
        setFinishTest(true);
      }
    }

    console.log(activeWord);
  };

  useEffect(() => {
    const arr = Array(sampleStringArr.length + 1).fill(NOT_SEEN);

    setcorrectArr(arr);
  }, []);

  //stop timer with isFinished is true
  useEffect(() => {
    if (isFinished) {
      setisStarted(false);
      setisFinished(false);
    }
  }, [isFinished]);

  return (
    // 👇️ textarea element

    //move everything to the center of the screen

    <div className="flex flex-col items-center justify-center w-full h-screen bg-blue-300 ">
    

     
      <ParticleBackground  />
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex flex-col justify-evenly items-center w-5/6 my-1 z-20">
          <div className="flex flex-row ">
            <TypingText
              text={sampleStringArr}
              correct_arr={correctArr}
              activeWord={activeWord}
            />
          </div>
        </div>
        <textarea
          className="w-96 h-12  border-2 border-gray-300 resize-none z-20 "
          onChange={handleMessageChange}
          value={message}
        />


        <div className="flex space-x-5 my-8 z-20">
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setFinishTest(false); setCurrentTime(0); setactiveWord(0); setcorrectArr([]); setisStarted(false); setisFinished(false); setMessage(""); } }>Reset</button>
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setReload(!reload); setFinishTest(false); setCurrentTime(0); setactiveWord(0); setcorrectArr([]); setisStarted(false); setisFinished(false); setMessage(""); } }>New Paragraph</button>
      </div>
      </div>
      
      <div className="flex flex-row text-xl">
        <StopClock seconds={currentTime} />
      </div>

      
    </div>
  );
};

export default TypingArea;
