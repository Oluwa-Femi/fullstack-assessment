import React from 'react';
import PrivateLayout from '../../components/PrivateLayout';

const Dashboard = (props) => {
return ( 
    <PrivateLayout  pathname={props.location.pathname} >
        <div className="dashboard">
            <div className="left">

            </div>
            <div className="right">
                <div className="top-panel">
                    <h1 className="header">Total Balance</h1>
                    <h3 className="value">30,000,000</h3>
                    <p>Your balance across all banks </p>
                    <div className="linked-accounts">
                        <div>

                        </div>
                    </div>
                </div>
                <div className="bottom-panel">
                    <div className="top">
                        <p>Where your money go?</p>
                        <div style={{marginTop: "20px"}}>
                            <svg width="27" height="6" viewBox="0 0 27 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2.68627" cy="2.68627" r="2.68627" fill="#D8D8D8"/>
                                <circle cx="13.4314" cy="2.68627" r="2.68627" fill="#D8D8D8"/>
                                <circle cx="24.1765" cy="2.68627" r="2.68627" fill="#D8D8D8"/>
                            </svg>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="data">
                            <h1>Food and Drinks</h1>
                            <p>872.400</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </PrivateLayout>
 );
}

export default Dashboard;