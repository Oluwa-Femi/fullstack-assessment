import React from 'react'
import Helpers from 'helpers/Helpers';
import { useAppContext } from 'context/AppContext';


export default function ExpensesItem({ category }) {
  const [state] = useAppContext();
  // threshold/base limit to base spending indicator, perhaps a budget limit set by user
  const threshold = 500000
  // parse category to correct for whitespace and case sensitivity
  // get all transactions for this category and map their amount and collect sum
  const transactionsSum = state.transactions.filter(txn => txn.category.startsWith(Helpers.parseWhitespace(category))).map(transaction => transaction.amount).reduce((a, b) => a + b, 0);

  const style = {
    width: `${(transactionsSum / threshold) * 100}%`
  }

  return (
    <div className='flex flex-col w-full my-3'>
        <div className='flex flex-row justify-between items-center w-full mb-2'>
            <span>{category}</span>
            <span>{transactionsSum}</span>
        </div>
        <span className='flex flex-col h-2 bg-gray-300 rounded-md overflow-hidden'>
            <span className='flex flex-col h-full bg-red-300 rounded-md' style={style}></span>
        </span>
    </div>
  )
}
