import React from 'react';
import { Link } from 'react-router-dom';
import Icons from 'components/utils/Icons/Icons';
import TransactionsItem from './Item';
import { useAppContext } from 'context/AppContext';

export default function TransactionsList() {
  const [state] = useAppContext(); 

  return (
    <>
      <div className='flex flex-row justify-between items-center px-8 py-2'>
        <span className='flex flex-col text-xl font-bold'>Latest Transactions</span>
        <Icons icon={'triple-dot'} fill={'#CCC'} />
      </div>
      <div className='flex flex-col px-8 py-2'>
        {state.transactions.map((transaction) => (
          <TransactionsItem transaction={transaction} key={transaction._id} />
        ))}
      </div>
      <div className='flex flex-col justify-center items-center text-gray-400 font-bold uppercase cursor-pointer'>
        <Link to='/dashboard/expenses'>
          view all
        </Link>
      </div>
    </>
  );
}
