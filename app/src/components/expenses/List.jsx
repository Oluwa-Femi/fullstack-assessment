import React from 'react';
import ExpensesItem from './Item';
import Icons from 'components/utils/Icons/Icons';

export default function ExpensesList() {
  const categories = [
    'Food and Drinks',
    'Shopping',
    'Housing',
    'Transportation',
    'Entertainment',
  ];

  return (
    <>
      <div className='flex flex-row justify-between items-center w-3/4 max-w-md mx-auto mt-8'>
        <span className='flex flex-col text-xl'>Where your money go?</span>
        <Icons icon={'triple-dot'} fill={'#CCC'} />
      </div>
      <div className='flex flex-col justify-between items-center w-3/4 max-w-md mx-auto mt-4'>
        {categories.map((category) => (
          <ExpensesItem category={category} key={category} />
        ))}
      </div>
    </>
  );
}
