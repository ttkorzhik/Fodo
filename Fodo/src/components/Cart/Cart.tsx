import React, {FC, useEffect, useState} from 'react';

import EmptyCart from "../../assets/emptyCart.svg"
import {RiRefreshFill} from "react-icons/ri";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {motion} from "framer-motion";
import CartItem from "./CartItem/CartItem";

import {actionType} from "../../context/reducer";
import {useStateValue} from "../../context/StateProvider";
import {itemForFirebaseProps} from "../../utils/firebaseFunctions";

import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../../firebase.config";

import styles from "../Cart/Cart.module.css"

const Cart:FC = () => {
    const [{cartItems, user}, dispatch] = useStateValue()

    const [flag, setFlag] = useState(1);
    const [total, setTotal] = useState(0);
    const deliveryPrice:number = 2.5

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const hideCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: false,
        });
    }

    const login = async () => {
        if(!user) {
            const { user : { providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
        }
    }

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
        cartItems.map((item: itemForFirebaseProps) => {
            item.qty = 1;
            return setFlag(flag + 1);
        });
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator: number, item: itemForFirebaseProps) {
            return accumulator + item.qty * parseFloat(item.price);
        }, 0);
        setTotal(totalPrice);
    }, [total, flag, cartItems]);

    return (
        <motion.div
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className={styles.wrapper}>
           <div className={styles.header}>
               <motion.div whileTap={{scale: 0.3}} className={styles.block} onClick={hideCart}>
                   <MdOutlineKeyboardBackspace className={styles.iconBack}/>
               </motion.div>
               <p className={styles.cartName}>Cart</p>
               <motion.p onClick={clearCart} whileTap={{scale: 0.75}} className={styles.clearBtn}>Clear
                   <RiRefreshFill/>
               </motion.p>
           </div>
            {!!cartItems.length ?
                <div className={styles.main}>
                    <div className={styles.cartInfo}>
                        {!!cartItems.length && cartItems.map((item: itemForFirebaseProps) => (
                            <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag}/>))}
                    </div>
                    <div className={styles.cartTotal}>
                        <div className={styles.totalBlock}>
                            <p className={styles.totalText}>Sub Total</p>
                            <p className={styles.totalText}>{`$ ${total.toFixed(2)}`}</p>
                        </div>
                        <div className={styles.totalBlock}>
                            <p className={styles.totalText}>Delivery</p>
                            <p className={styles.totalText}>{`$ ${deliveryPrice.toFixed(2)}`}</p>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.totalBlock}>
                            <p className={styles.totalTextBold}>Total</p>
                            <p className={styles.totalTextBold}>{`$ ${(total + deliveryPrice).toFixed(2)}`}</p>
                        </div>
                        {user ?
                                <motion.button type="button"
                                               whileTap={{scale: 0.75}}
                                               className={styles.totalBtn}>
                                    Check Out
                                </motion.button>
                             :
                            <motion.button type="button"
                                           whileTap={{scale: 0.75}}
                                           className={styles.totalBtn}
                                           onClick={login}>
                            Login to check out
                        </motion.button>}
                    </div>
                </div> :
                <div className={styles.empty}>
                    <img src={EmptyCart} alt="empty" className={styles.emptyImg}/>
                    <p className={styles.emptyText}>Add items to your cart</p>
                </div>
            }
        </motion.div>
    );
};

export default Cart;