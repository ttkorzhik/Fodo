import React, {FC} from 'react';

import logo from "../../../assets/Frame.svg";
import {Link} from "react-router-dom";

import styles from "../Header.module.css";

const Logo:FC = () => {
    return (
        <Link to={"/"} className={styles.logo}>
            <img src={logo} alt="logo" className={styles.logoImg}/>
            <p className={styles.headerText}>Fodo</p>
        </Link>
    );
};

export default Logo;