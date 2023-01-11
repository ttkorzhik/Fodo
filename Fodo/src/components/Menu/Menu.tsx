import React, {FC, useState} from 'react';

import {IoFastFood} from "react-icons/io5";
import Goods from "../Goods/Goods";
import {categoriesConfig} from "../../mocks/categoriesConfig";
import {motion} from "framer-motion";

import { itemForFirebaseProps } from "../../utils/firebaseFunctions";
import {useStateValue} from "../../context/StateProvider";

import styles from "../Menu/Menu.module.css"

const Menu:FC = () => {

    const [filter, setFilter] = useState<string>("chicken")

    const [{ foodItems }] = useStateValue()

    const filteredItems = foodItems?.filter((item: itemForFirebaseProps) => {
        return item.category.toLowerCase() === filter
    })

    return (
        <section className={styles.menu} id="menu">
            <div className={styles.menuBlock}>
                <p className={styles.title}>Our hot dishes</p>
                <div className={styles.filter}>
                    {categoriesConfig && categoriesConfig.map((category) => (
                        <motion.div key={category.id}
                                    whileTap={{scale: 0.6}}
                                    className={`${filter === category.urlParamName ?
                                        styles.active : styles.default} 
                                        ${styles.filterItem}`}
                             onClick={() => setFilter(category.urlParamName)}>
                            <div className={`${filter === category.urlParamName ?
                                styles.default : styles.active}
                                 ${styles.inner}`}>
                                <IoFastFood className={`${filter === category.urlParamName ?
                                    styles.defaultText : styles.activeText}
                                     ${styles.icon}`}/>
                            </div>
                            <p className={`${filter === category.urlParamName ?
                                styles.activeText : styles.defaultText} ${styles.filterName}`}>
                                {category.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.filteredGoods}>
                    <Goods flag={false} data={filteredItems}/>
                </div>
            </div>
        </section>
    );
};

export default Menu;