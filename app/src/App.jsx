import axios from 'axios';
import AppContext from 'context/AppContext';
import Routes from './routes/';
import './index.css';

const token = JSON.parse(localStorage.getItem('token')) 

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// set bearer token on app load if available
axios.defaults.headers.common =  token ? {
  Authorization: `Bearer ${token}`,
} : null

const inactivityTime = () => {
  let time;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeyup = resetTimer;

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(()=>localStorage.removeItem("_mt_"), 36000000);
  }
};

window.onload = function () {
  if(localStorage.getItem("r_me") === false){
    inactivityTime();
  }
};

export default function App() {
  return (
    <AppContext>
      <Routes />
    </AppContext>
  );
}
