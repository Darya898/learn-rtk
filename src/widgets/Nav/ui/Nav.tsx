import {NavLink} from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
    return (
        <nav className={styles['nav']}>
            <ul className={styles['nav-list']}>
                <li className={styles['nav-list__item']}>
                    <NavLink to="/" end
                             className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorits" end
                             className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} >
                        Избранное
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;