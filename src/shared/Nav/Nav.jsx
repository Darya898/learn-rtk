import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" end
                             style={({isActive})=>({background:isActive?'#1a1a1a':'',
                                                                  border: isActive?'1px solid #1a1a1a':'',
                                                                  borderRadius: '8px'})}>
                        Главная
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/favorits" end>
                      Избранное
                    </NavLink>
                </li>
            </ul>
        </nav>

                    );
                    };

                    export default Nav;