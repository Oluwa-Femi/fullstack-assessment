import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppContext } from 'context/AppContext';
import Home from 'views/Home';
import Dashboard from 'views/dashboard/Dashboard';
import Accounts from 'views/dashboard/Accounts';
import Expenses from 'views/dashboard/Expenses';

export default function MonoRoutes() {
  const [state] = useAppContext();
  const isAuth = state.token || JSON.parse(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuth ? <Navigate to='/dashboard' /> : <Home />}></Route>
        <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Navigate to='/' />}></Route>
        <Route path='/dashboard/accounts' element={isAuth ? <Accounts /> : <Navigate to='/' />}></Route>
        <Route path='/dashboard/expenses' element={isAuth ? <Expenses /> : <Navigate to='/' />}></Route>
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
