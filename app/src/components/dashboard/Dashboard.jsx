import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ExpensesList from 'components/expenses/List';
import TransactionsList from 'components/transactions/List';
import MonoConnect from '@mono.co/connect.js';
import Button from 'components/utils/Button/Button';
import Helpers from 'helpers/Helpers';
import Icons from 'components/utils/Icons/Icons';
import { useAppContext } from 'context/AppContext';

export default function DashboardPage() {
  const [state, setState] = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data: accountsData } = await axios.get('/account/accounts');
        // get transactions data for first account -- limited to 5
        const { data: transactionsData } = await axios.get(
          `/account/${accountsData.accounts[0].account._id}/transactions?limit=5`
        );

        setState({
          ...state,
          accounts: accountsData.accounts,
          transactions: transactionsData.transactions,
        });
      } catch (error) {
        toast.error(
          error.response.data.error.message || 'something went wrong',
          {
            duration: 4000,
            position: 'top-right',
          }
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: async ({ code }) => {
        setLoading(true);

        try {
          const { data } = await axios.post('/account/connect', { code });
          setState({
            ...state,
            user: {
              ...state.user,
            },
          });
          toast.success(data.data.message, {
            duration: 4000,
            position: 'top-right',
          });
        } catch (error) {
          toast.error(
            error.response.data.error.message || 'something went wrong',
            {
              duration: 4000,
              position: 'top-right',
            }
          );
        } finally {
          setLoading(false);
        }
      },
      key: process.env.REACT_APP_MONO_PUB_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

  return (
    <>
      <Toaster />

      {loading ? (
        <div className='flex flex-col justify-center items-center relative w-full h-screen'>
          <div className='flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md md:w-1/2 md:px-12'>
            <Icons icon={'logo'} />
            <span className='flex flex-col mt-4'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full pt-20 lg:flex-row lg:pt-0'>
          <div className='flex flex-col bg-white lg:w-3/5 lg:ml-[20%]'>
            <div className='flex flex-row justify-between items-center p-6'>
              <span className='flex flex-row items-center font-bold'>
                <span className='flex flex-col justify-center items-center w-8 h-8 mr-4 bg-black rounded-full'>
                  <Icons
                    icon={'user'}
                    fill={'#FFF'}
                    customClass={'scale-50'}
                  />
                </span>
                {Helpers.generateGreeting()} {state.user.firstname}
              </span>
              <span className='flex flex-row items-center text-sm text-gray-500 px-2 py-1 border rounded cursor-pointer shadow-lg'>
                Today
                <Icons icon='calendar' customClass={'ml-2'} />
              </span>
            </div>
            {/* TODO: replace with bar charts */}
            <div className='flex flex-col w-[90%] h-40 mx-auto my-4 bg-gray-600 rounded-sm'></div>
            <TransactionsList />
          </div>
          <div className='flex flex-col mt-8 bg-blue-50 lg:w-2/5 lg:mt-0'>
            <div className='flex flex-col justify-center items-center w-3/4 max-w-md p-4 mx-auto mt-8 bg-white rounded shadow-lg'>
              <span className='flex flex-col font-bold capitalize'>
                Total balance
              </span>
              <span className='flex flex-col text-4xl font-bold mt-4 mb-2'>
                {/* accumulate total sum of all linked accounts */}
                {state.accounts.length > 0 ? state.accounts.reduce(
                      (a, b) => +a.account.balance + +b.account.balance,
                      { account: { balance: 0 } }
                    ): null}
              </span>
              <span className='flex flex-col text-gray-500 text-sm font-thin'>
                Your balance across all accounts
              </span>
              <div className='flex flex-row mt-8'>
                {/* accumulate linked banks logo */}
                {state.accounts.length > 0 ? state.accounts.map((acct, index) => (
                      <span
                        className={`flex flex-col justify-center items-center w-8 h-8 -ml-2 z-${index} bg-blue-100 border-2 border-white overflow-hidden rounded-full`}
                        key={acct._id}
                      >
                        <Icons
                          icon={Helpers.parseWhitespace(
                            acct.account.institution.name
                          )}
                          customClass={'scale-50'}
                        />
                      </span>
                    )) : null}
                <span
                  className='flex flex-col justify-center items-center text-gray-300 w-8 h-8 -ml-2 z-[99] bg-white border-2 border-gray-300 cursor-pointer rounded-full'
                  // making sure the z-index of the add button is always the highest
                  onClick={() => monoConnect.open()}
                >
                  +
                </span>
              </div>
              <Link to='/dashboard/accounts'>
                <Button
                  type={'button'}
                  customClass={
                    'bg-red-100 text-red-600 font-bold uppercase mt-12'
                  }
                >
                  unlink bank account
                </Button>
              </Link>
            </div>

            <ExpensesList /> 
          </div>
        </div>
      )}
    </>
  );
}
