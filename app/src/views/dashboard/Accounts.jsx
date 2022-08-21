import React from 'react';
import Navigation from 'components/nav/Mono';
import AccountPage from 'components/account/page';
import AccountModal from 'components/account/modal';
import { useAppContext } from 'context/AppContext';

export default function Accounts() {
  const [state] = useAppContext();

  return (
    <div>
      <Navigation />

      {/* If user is yet to have a linked account, disoplay link modal */}
      {!state.user.accountsCount ? <AccountModal /> : <AccountPage />}
    </div>
  );
}
