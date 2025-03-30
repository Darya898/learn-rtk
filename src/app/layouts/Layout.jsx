import {Outlet} from "react-router-dom";
import Nav from "../../shared/Nav/Nav.jsx";
import React from "react";
const Layout = () => {
    return (
        <div>
            <Nav></Nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;