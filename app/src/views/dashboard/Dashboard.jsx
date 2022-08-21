import React from 'react';
import DashboardPage from 'components/dashboard/Dashboard';
import AccountModal from 'components/account/modal';
import Navigation from 'components/nav/Mono';
import { useAppContext } from 'context/AppContext';


export default function Dashboard() {
  const [state] = useAppContext();

  return (
    <div>
      <Navigation />

      {/* If user is yet to have a linked account, disoplay link modal */}
      {!state.user.accountsCount ? <AccountModal /> : <DashboardPage />}
    </div>
  );
}
