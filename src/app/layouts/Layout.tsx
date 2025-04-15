import {Outlet} from "react-router-dom";
import Nav from "../../widgets/Nav/ui/Nav.tsx";

const Layout= () => {
    return (
        <div>
            <Nav/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;