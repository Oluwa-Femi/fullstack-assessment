import React from "react";
import Routes from "./routes";
import "./App.css";

function App() {
  const idleTimeOut = () => {
    let time;
    window.onload = resetTimer;
    document.onkeyup = resetTimer;
    document.onmousemove = resetTimer;

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(() => localStorage.removeItem("_mt_"), 36000000);
    }
  };

  window.onload = function () {
    if (localStorage.getItem("r_me") === false) {
      idleTimeOut();
    }
  };
  return (
    <div className="">
      <Routes />
    </div>
  );
}

export default App;
