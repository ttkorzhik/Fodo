import React, {FC, useEffect, useState} from 'react';

import avatar from "../../assets/avatar.png"
import {MdShoppingBasket, MdAdd, MdLogout} from "react-icons/md";
import Logo from "./Logo/Logo";
import MenuBurger from "./MenuBurger/MenuBurger";
import Navigation from "../Navigation/Navigation";

import { motion} from "framer-motion";
import {Link} from "react-router-dom";

import {useScreenWidth} from "../../context/ScreenWidthContext";
import {useStateValue} from "../../context/StateProvider";

import {actionType} from "../../context/reducer";
import {itemForFirebaseProps} from "../../utils/firebaseFunctions";

import {app, auth} from "../../firebase.config";
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth"

import styles from "../Header/Header.module.css"

const Header:FC = () => {
    const [userData, setUserData] = useState<any | null>(null)
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const [nav, setNav] = useState<boolean>(false);

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    let quantity = 0

    const [{user, cartItems}, dispatch] = useStateValue()
    const { isTabletView } = useScreenWidth()

    const handleNavOpen = () => {
        setNav(!nav)
    }

    const login = async () => {
        if(!userData) {
            const { user : { refreshToken, providerData} } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            dispatch({
                type: actionType.SET_CART_ITEMS,
                cartItems: [],
            });
            localStorage.setItem("cartItems", JSON.stringify([]));
            cartItems.map((item: itemForFirebaseProps) => {
               return item.qty = 1;
            });
        }
        else setIsMenu(!isMenu)
    }

    const logout = () => {
        signOut(auth)
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
        setIsMenu(false)
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: true,
        });
    }

    if (cartItems?.length) {
        quantity = cartItems?.reduce(function (accumulator: number, item: itemForFirebaseProps) {
            return accumulator + item?.qty;
        }, 0);
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUserData(user)
                dispatch({
                    type: actionType.SET_USER,
                    user: user
                })
            }
            else setUserData(null)
        })
    }, []);

    return (
        <header className={styles.header}>
           <div className={styles.block}>
               <Logo/>
               <div className={`${!isTabletView ? styles.rightBlock : styles.rightBlockAdaptive}`}>
                   {!isTabletView && <Navigation setIsMenu={() => setIsMenu(false)} footer={false}/>}
                   <div className={styles.userBlock}>
                       <div className={styles.basket} onClick={showCart}>
                           <MdShoppingBasket className={styles.icon}/>
                           {!!cartItems.length && <div className={styles.quantity}>
                               <p className={styles.number}>{quantity}</p>
                           </div>}
                       </div>
                       <div className={styles.user}>
                           <motion.img
                               whileTap={{scale: 0.6}}
                               src={userData ? userData.photoURL : avatar}
                               alt="avatar"
                               className={styles.avatar}
                               onClick={login}/>
                           {isMenu && <motion.div
                               initial={{ opacity: 0, scale: 0.6 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.6 }}
                               className={styles.userMenu}>
                               {user && userData.email === "tanyakorshik@gmail.com" &&
                                   <Link to={"/createItem"}
                                         className={styles.addItem}
                                         onClick={() => setIsMenu(false)}>
                                       New Item <MdAdd/>
                                   </Link>}
                               <button onClick={logout} className={styles.btn}>Logout <MdLogout/></button>
                           </motion.div>}
                       </div>
                   </div>
                   {isTabletView && <MenuBurger open={nav} onClick={handleNavOpen}/>}
                   {isTabletView && nav && <Navigation setIsMenu={() => setIsMenu(false)}
                                                       footer={false}
                                                       adaptive={true}/>}
               </div>
           </div>
        </header>
    );
};

export default Header;