import React, {FC} from 'react';

import styles from "../Navigation/Navigation.module.css";

interface NavigationProps {
    footer: boolean
    adaptive?: boolean
    setIsMenu?: () => void
}
const Navigation:FC<NavigationProps> = ({setIsMenu, footer, adaptive}) => {
    return (
        <ul className={`${footer ? styles.footerNav : adaptive ? styles.adaptive : styles.nav}`}>
            <li><a href={"#home"} onClick={setIsMenu} className={styles.navItem}>Home</a></li>
            <li><a href={"#menu"} onClick={setIsMenu} className={styles.navItem}>Menu</a></li>
            <li><a href={"#about"} onClick={setIsMenu} className={styles.navItem}>About us</a></li>
            <li><a href={"#contact"} onClick={setIsMenu} className={styles.navItem}>Contact</a></li>
        </ul>
    );
};

export default Navigation;