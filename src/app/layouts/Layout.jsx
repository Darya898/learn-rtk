import {Outlet} from "react-router-dom";
import Nav from "../../widgets/Nav/ui/Nav.jsx";

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