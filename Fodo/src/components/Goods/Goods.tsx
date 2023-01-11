import React, {forwardRef} from 'react';

import NotFound from "../../assets/NotFound.svg"
import {MdShoppingBasket} from "react-icons/md";
import {motion} from "framer-motion";

import {itemForFirebaseProps} from "../../utils/firebaseFunctions";
import {useStateValue} from "../../context/StateProvider";
import {actionType} from "../../context/reducer";

import styles from "./Goods.module.css"

interface MenuProps {
    flag: boolean
    data: itemForFirebaseProps[] | null
}

const Goods = forwardRef<HTMLDivElement, MenuProps>(({flag, data}, ref) => {
    const [{cartItems}, dispatch] = useStateValue()

    const addToCart = (item?: itemForFirebaseProps) => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [...cartItems, item],
        });
        localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
    }

    const addNewItem = (item: itemForFirebaseProps) => {
        if (cartItems.length) {
            const oldCard = cartItems.find((i: itemForFirebaseProps) => i.id === item.id)
            if (!!oldCard) {
                cartItems.map((i: itemForFirebaseProps) => {
                    if (item.id === i.id) {
                        i.qty += 1;
                    }
                });
                dispatch({
                    type: actionType.SET_CART_ITEMS,
                    cartItems: cartItems,
                });
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
            else addToCart(item)
        }
        else addToCart(item)
    }

    return (
        <div ref={ref} className={`${flag ? styles.wrapperScroll : styles.wrapper}`}>
            {data && data.length ? data.map((item) => (
                <div key={item.id} className={styles.block}>
                    <div className={styles.item}>
                        <motion.img whileHover={{ scale: 1.2 }}
                                    className={styles.img}
                                    src={item.imageURL}
                                    alt={item.title}/>
                        <motion.div onClick={() => addNewItem(item)}
                                    whileTap={{ scale: 0.75 }}
                                    className={styles.basket}>
                            <MdShoppingBasket className={styles.basketIcon}/>
                        </motion.div>
                    </div>
                    <div className={styles.text}>
                        <p className={styles.name}>{item.title}</p>
                        <p className={styles.calories}>{`${item.calories} Calories`}</p>
                        <div className={styles.price}>
                            <p className={styles.name}>
                                <span className={styles.dollar}>$</span>
                                {item.price}
                            </p>
                        </div>
                    </div>
                </div>
            )) : <div className={styles.notFound}>
                <img src={NotFound} alt="Not Found" className={styles.notFoundImg}/>
                <p className={styles.notFoundText}>Items not available</p>
            </div>}
        </div>
    );
});

export default Goods;