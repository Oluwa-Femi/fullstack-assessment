/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
// import Logo from "../assets/logo2.png"

const Layout = ({children,pathname}) => {
    const history = useHistory();
    console.log(pathname,"pathname");
    const menuItems = [
        {name: "Dashboard", path:"/dashboard" },
        {name: "Expenses", path:"/expenses"},
        {name: "Wallets", path:"/wallets"},
        {name: "Summary", path:"/summary"},
        {name: "Accounts", path:"/accounts"},
        {name: "Settings", path:"/settings"},
        
    ];
    return ( 
        <div className="private-cont">
            <div className="menu">
                {/* <img src={Logo} alt="mono logo" />   */}
                <ul>
                    {menuItems?.map((item,i) => (
                        <li
                            key={i}
                            className={pathname.includes(item.path)? "active" : ""}
                            // onClick={() => {
                            //     history.push(item.path);
                            // }}
                        >
                            <p className="ml-5">{item.name} </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="layout">
                {children}
            </div>
        </div>
     );
}
 
export default Layout;