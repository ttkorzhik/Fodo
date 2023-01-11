import React, {FC, useEffect, useState} from 'react';

import {motion} from "framer-motion";
import {BiMinus, BiPlus} from "react-icons/bi";

import {useStateValue} from "../../../context/StateProvider";
import {itemForFirebaseProps} from "../../../utils/firebaseFunctions";
import {actionType} from "../../../context/reducer";

import styles from "../Cart.module.css";

interface CartItemProps {
    item: itemForFirebaseProps
    flag: number
    setFlag: any
}

const CartItem:FC<CartItemProps> = ({item, flag, setFlag}) => {
    const [{cartItems}, dispatch] = useStateValue()
    let items:itemForFirebaseProps[] = [];

    const [quantity, setQuantity] = useState<number>(item.qty)

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
    };

    const updateQty = (action: string, id: string) => {
        if (action === "add") {
            setQuantity(quantity + 1);
            cartItems.map((item: itemForFirebaseProps) => {
                if (item.id === id) {
                    item.qty += 1;
                    setFlag(flag + 1);
                }
                return cartDispatch();
            });
        } else {
            if (quantity === 1) {
                items = cartItems.filter((item: itemForFirebaseProps) => item.id !== id)
                setFlag(flag + 1);
                cartDispatch();
            } else {
                setQuantity(quantity - 1);
                cartItems.map((item: itemForFirebaseProps) => {
                    if (item.id === id) {
                        item.qty -= 1;
                        setFlag(flag + 1);
                    }
                    return cartDispatch();
                });
            }
        }
    };

    useEffect(() => {
        items = cartItems
    }, [quantity, items]);

    return (
        <div className={styles.cartItem}>
            <img className={styles.itemImg}
                 src={item.imageURL}
                 alt={item.title}/>
            <div className={styles.itemName}>
                <p className={styles.itemText}>{item.title}</p>
                <p className={styles.itemText}>{`$ ${parseFloat(item.price) * quantity}`}</p>
            </div>
            <div className={styles.itemButtons}>
                <motion.div whileTap={{scale: 0.75}}
                            className={styles.itemBtn}
                            onClick={() => updateQty("remove", item.id)}>
                    <BiMinus className={styles.itemText}/>
                </motion.div>
                <p className={styles.quantity}>{quantity}</p>
                <motion.div whileTap={{scale: 0.75}}
                            className={styles.itemBtn}
                            onClick={() => updateQty("add", item.id)}>
                    <BiPlus className={styles.itemText}/>
                </motion.div>
            </div>
        </div>
    );
};

export default CartItem;