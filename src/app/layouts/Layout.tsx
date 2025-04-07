import {Outlet} from "react-router-dom";
import Nav from "../../widgets/Nav/ui/Nav.tsx";
import React from "react";

const Layout: React.FC = () => {
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