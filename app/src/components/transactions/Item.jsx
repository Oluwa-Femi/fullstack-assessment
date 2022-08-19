import React from 'react';
import moment from 'moment';
import Icons from 'components/utils/Icons/Icons';
import Helpers from 'helpers/Helpers';


export default function TransactionsItem({ transaction }) {
  // randomly generate bg color for icons
  const bgColor = Helpers.randomizeColor();

  return (
    <div className='flex flex-col justify-between items-center my-2 md:flex-row'>
      <div className='flex flex-row self-start md:self-auto'>
        <span className={`${bgColor} flex flex-col justify-center items-center w-8 h-8 rounded-full`}>
          <Icons icon={transaction.category} fill={'#FFF'} customClass={'scale-50'} />
        </span>
      </div>
      <div className='flex flex-col items-center w-3/4 mt-3'>
        <span className='flex flex-col'>
          <span className='flex flex-col text-sm'>{transaction.narration}</span>
          <span className='flex flex-col text-xs font-thin capitalize mt-4 lg:mt-2'>{moment(transaction.date).format('mm-d-yyyy · h:mm a')} · {transaction.type}</span>
        </span>
      </div>
      <span className='flex flex-col self-end font-bold md:self-auto'>{`${transaction.type === 'debit' ? '-' : ''} ${transaction.amount}`}</span>
    </div>
  );
}
