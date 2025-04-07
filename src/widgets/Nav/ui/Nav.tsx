import {NavLink} from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
    return (
        <nav className={styles['nav']}>
            <ul className={styles['nav-list']}>
                <li className={styles['nav-list__item']}>
                    <NavLink to="/" end
                             style={({isActive})=>({background:isActive?'#1a1a1a':'',
                                                                  border: isActive?'1px solid #1a1a1a':'',
                                                                  borderRadius: '8px',
                                                                  padding: '4px 8px'})}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorits" end
                             style={({isActive})=>({background:isActive?'#1a1a1a':'',
                                 border: isActive?'1px solid #1a1a1a':'',
                                 borderRadius: '8px',
                                 padding: '4px 8px'})}
                    >
                      Избранное
                    </NavLink>
                </li>
            </ul>
        </nav>

                    );
                    };

                    export default Nav;