import React, {FC} from 'react';
import styles from "../Loader/Loader.module.css"

const Loader:FC = () => {
    return (
        <span className={styles.loader}></span>
    );
};

export default Loader;