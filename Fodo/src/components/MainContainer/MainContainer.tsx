import React, {FC, MutableRefObject, useRef} from 'react';

import {MdChevronLeft, MdChevronRight} from "react-icons/md"
import {motion} from "framer-motion";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import Cart from "../Cart/Cart";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Goods from "../Goods/Goods";

import {useStateValue} from "../../context/StateProvider";
import {itemForFirebaseProps} from "../../utils/firebaseFunctions";

import styles from "../MainContainer/MainContainer.module.css"

const MainContainer:FC = () => {
    const [{ foodItems, cartShow }] = useStateValue()

    const mainContainerRef:MutableRefObject<HTMLDivElement | null>  = useRef(null)

    const scroll = (scrollOffset: number) => {
        if (mainContainerRef.current) {
            return mainContainerRef.current.scrollLeft += scrollOffset
        }
    }

    const items = foodItems?.filter((item: itemForFirebaseProps) => {
        return item.category === "Fruits"
    })

    return (
        <div className={styles.wrapper}>
            <Home/>
            <section className={styles.section}>
                <div className={styles.blockHeader}>
                    <p className={styles.title}>Our fresh and healthy fruits</p>
                    <div className={styles.arrows}>
                        <motion.div whileTap={{ scale: 0.75 }} className={styles.arrowsBtn}>
                            <MdChevronLeft className={styles.chevron} onClick={() => scroll(-363)}/>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.75 }} className={styles.arrowsBtn}>
                            <MdChevronRight className={styles.chevron} onClick={() => scroll(363)}/>
                        </motion.div>
                    </div>
                </div>
                <Goods ref={mainContainerRef} data={items} flag={true}/>
            </section>
            <Menu/>
            {cartShow && <Cart/>}
            <About/>
            <Contact/>
        </div>
    );
};

export default MainContainer;