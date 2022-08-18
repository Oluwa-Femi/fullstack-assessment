import Routes from "./routes";
import "./App.css";

function App() {
  const idleTimeOut = () => {
    let time;
    window.onload = reset;
    document.onkeyup = reset;
    document.onmousemove = reset;

    function reset() {
      clearTimeOut(time);
      time = setTimeOut(() => localStorage.removeItem("_mt_"), 36000000);
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
