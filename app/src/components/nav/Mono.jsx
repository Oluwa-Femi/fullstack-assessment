import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icons from 'components/utils/Icons/Icons';
import { useAppContext } from 'context/AppContext';
import Button from 'components/utils/Button/Button';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Expenses',
    href: '/dashboard/expenses',
  },
  {
    name: 'Wallets',
    href: '/dashboard/wallets',
  },
  {
    name: 'Summary',
    href: '/dashboard/summary',
  },
  {
    name: 'Accounts',
    href: '/dashboard/accounts',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
  },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const [state, setState] = useAppContext();

  const handleClick = () => {
    setState({ ...state, navIsOpen: !state.navIsOpen })
  }

  const handleLogout = () => {
    setState({ ...state, token: '', user: {}, accounts: [], transactions: [] })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <>
      <div className='flex flex-row justify-between items-center fixed w-full bg-white p-4 z-[9999] shadow-lg lg:hidden'>
        <Link to='/dashboard'>
          <Icons icon={'logo'} />
        </Link>
        
        <span className='flex flex-col justify-center items-center text-white px-4 py-2 bg-black rounded shadow-md' onClick={handleClick}>
          Menu
        </span>
      </div>

      <div className={`${state.navIsOpen ? 'w-5/6 md:w-1/4' : 'w-0' } flex flex-col items-center fixed h-screen py-8 bg-black z-[999] overflow-hidden transition-all duration-150 ease-linear lg:w-1/5`}>
        <Link to='/dashboard'>
          <Icons icon={'logo'} fill={'#FFF'} />
        </Link>
        <div className='flex flex-col text-zinc-400 mt-8'>
          {navigationItems.map(({ href, name }) => (
            <NavLink
              key={name}
              to={href}
              className={() =>
                pathname === href
                  ? 'flex flex-col text-white p-4'
                  : 'flex flex-col text-zinc-400 p-4'
              }
              onClick={handleClick}
            >
              {name}
            </NavLink>
          ))}
          <Button 
            customClass={'bg-red-600 uppercase text-white'}
            handleClick={handleLogout}
          >
            log out
          </Button>
        </div>
      </div>
    </>
  );
}
