import React from 'react';
import Navigation from 'components/nav/Mono';
import AccountModal from 'components/account/modal';
import ExpensesPage from 'components/expenses/Page';
import { useAppContext } from 'context/AppContext';

export default function Expenses() {
  const [state] = useAppContext();

  return (
    <div>
      <Navigation />

      {/* If user is yet to have a linked account, disoplay link modal */}
      {!state.user.accountsCount ? <AccountModal /> : <ExpensesPage />}
    </div>
  );
}
