import React from "react";

type Props = {
  seconds: number;
};

export default function StopClock(props: Props) {
  const { seconds } = props;
  return (
    <div>
      <h1>Time Ellapsed: {seconds}</h1>
    </div>
  );
}
