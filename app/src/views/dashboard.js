import React from "react";
import Layout from "../components/layout";
import Connect from '@mono.co/connect.js'
import { Button } from "../components/button"

const Dashboard = (props) => {
    const monoConnect = React.useMemo(() => {
      const monoInstance = new Connect({
        onClose: () => console.log('Widget closed'),
        onLoad: () => console.log('Widget loaded successfully'),
        onSuccess: (code) => {
            alert(`Account linked successfully`);
            console.log(code,"code");
        },
        key: process.env.REACT_APP_MONO_PUB_KEY
      })

      monoInstance.setup()
      
      return monoInstance;
    }, []);
    return ( 
        <Layout  pathname={props.location.pathname} >
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
                            <div onClick={() => monoConnect.open()} >
                                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.629056" y="1.40323" width="37" height="37" rx="18.5" fill="white" stroke="#D2DCE8" stroke-width="1.19355"/>
                                    <path d="M19.1619 13.9355V27.1563" stroke="#D2DCE8" stroke-width="1.19355" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12.5393 20.5459H25.7844" stroke="#D2DCE8" stroke-width="1.19355" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <Button
                            title="unlink bank account"
                            type="danger"
                        />
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

        </Layout>
     );
}
 
export default Dashboard;