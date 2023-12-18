import React, { useEffect } from "react";

const TimeRemaining = ({ dispatch, timeRemaining }) => {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div>
      {mins < 9 && "0"}
      {mins}:{secs < 9 && "0"}
      {secs}
    </div>
  );
};

export default TimeRemaining;
