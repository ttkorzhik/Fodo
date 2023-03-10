import React, {ChangeEvent, FC, useState} from 'react';

import Logo from "../Header/Logo/Logo";
import Navigation from "../Navigation/Navigation";
import {motion} from "framer-motion";

import {useScreenWidth} from "../../context/ScreenWidthContext";

import styles from "../Contact/Contact.module.css"

const Contact:FC = () => {
    const [email, setEmail] = useState<string>("")
    const { isTabletView } = useScreenWidth()

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setEmail(e.target.value)
        }
    }
    const submit = () => {
        setEmail("")
    }

    return (
        <div id="contact" className={styles.wrapper}>
            <div className={styles.leftBlock}>
                <Logo/>
                <p className={styles.text}>Our job is to filling your tummy with delicious food and  with fast and free delivery.</p>
                <div className={styles.social}>
                    <a className={styles.socialLink} href="https://www.instagram.com/">
                        <svg className={styles.svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.9471 8.30496C20.937 7.54758 20.7952 6.79773 20.5281 6.08896C20.2964 5.49111 19.9426 4.94816 19.4892 4.49479C19.0359 4.04142 18.4929 3.68761 17.8951 3.45596C17.1954 3.19331 16.4562 3.0513 15.7091 3.03596C14.7471 2.99296 14.4421 2.98096 12.0001 2.98096C9.55807 2.98096 9.24507 2.98096 8.29007 3.03596C7.54323 3.05141 6.80442 3.19343 6.10507 3.45596C5.50713 3.68745 4.96409 4.0412 4.5107 4.49459C4.05732 4.94798 3.70356 5.49102 3.47207 6.08896C3.2089 6.78809 3.06719 7.52707 3.05307 8.27396C3.01007 9.23696 2.99707 9.54196 2.99707 11.984C2.99707 14.426 2.99707 14.738 3.05307 15.694C3.06807 16.442 3.20907 17.18 3.47207 17.881C3.70395 18.4787 4.05797 19.0215 4.51151 19.4747C4.96505 19.9279 5.50813 20.2815 6.10607 20.513C6.8035 20.7862 7.54244 20.9383 8.29107 20.963C9.25407 21.006 9.55907 21.019 12.0011 21.019C14.4431 21.019 14.7561 21.019 15.7111 20.963C16.4582 20.9482 17.1974 20.8066 17.8971 20.544C18.4948 20.312 19.0376 19.9581 19.4909 19.5048C19.9442 19.0515 20.2982 18.5086 20.5301 17.911C20.7931 17.211 20.9341 16.473 20.9491 15.724C20.9921 14.762 21.0051 14.457 21.0051 12.014C21.0031 9.57196 21.0031 9.26196 20.9471 8.30496ZM11.9941 16.602C9.44007 16.602 7.37107 14.533 7.37107 11.979C7.37107 9.42496 9.44007 7.35596 11.9941 7.35596C13.2202 7.35596 14.396 7.84302 15.263 8.71C16.13 9.57698 16.6171 10.7529 16.6171 11.979C16.6171 13.2051 16.13 14.3809 15.263 15.2479C14.396 16.1149 13.2202 16.602 11.9941 16.602ZM16.8011 8.26296C16.6595 8.26309 16.5192 8.2353 16.3884 8.18117C16.2575 8.12704 16.1386 8.04764 16.0385 7.94751C15.9384 7.84738 15.859 7.72849 15.8049 7.59765C15.7507 7.4668 15.7229 7.32656 15.7231 7.18496C15.7231 7.04346 15.7509 6.90334 15.8051 6.77262C15.8592 6.64189 15.9386 6.5231 16.0387 6.42305C16.1387 6.32299 16.2575 6.24363 16.3882 6.18948C16.519 6.13533 16.6591 6.10746 16.8006 6.10746C16.9421 6.10746 17.0822 6.13533 17.2129 6.18948C17.3436 6.24363 17.4624 6.32299 17.5625 6.42305C17.6625 6.5231 17.7419 6.64189 17.7961 6.77262C17.8502 6.90334 17.8781 7.04346 17.8781 7.18496C17.8781 7.78096 17.3961 8.26296 16.8011 8.26296Z" />
                            <path d="M11.994 14.9821C13.6525 14.9821 14.997 13.6376 14.997 11.9791C14.997 10.3206 13.6525 8.97607 11.994 8.97607C10.3355 8.97607 8.99097 10.3206 8.99097 11.9791C8.99097 13.6376 10.3355 14.9821 11.994 14.9821Z"/>
                        </svg>
                    </a>
                    <a className={styles.socialLink} href="https://www.facebook.com/">
                        <svg className={styles.svg} width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.39703 17.9969V9.80092H9.16203L9.57303 6.59193H6.39703V4.54792C6.39703 3.62192 6.65503 2.98793 7.98403 2.98793H9.66803V0.126925C8.84867 0.0391161 8.02508 -0.00328216 7.20103 -7.49744e-05C4.75703 -7.49744e-05 3.07903 1.49193 3.07903 4.23093V6.58593H0.332031V9.79492H3.08503V17.9969H6.39703Z"/>
                        </svg>
                    </a>
                    <a className={styles.socialLink} href="https://twitter.com/?lang=ru">
                        <svg className={styles.svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.643 4.93708C22.808 5.30708 21.911 5.55708 20.968 5.67008C21.941 5.08787 22.669 4.17154 23.016 3.09208C22.1019 3.63507 21.1014 4.01727 20.058 4.22208C19.3564 3.47294 18.4271 2.9764 17.4143 2.80955C16.4016 2.6427 15.3621 2.81487 14.4572 3.29933C13.5524 3.78379 12.8328 4.55344 12.4102 5.48878C11.9875 6.42412 11.8855 7.47283 12.12 8.47208C10.2677 8.37907 8.45564 7.89763 6.80144 7.05898C5.14723 6.22034 3.68785 5.04324 2.51801 3.60408C2.11801 4.29408 1.88801 5.09408 1.88801 5.94608C1.88757 6.71307 2.07644 7.46832 2.43789 8.14481C2.79934 8.8213 3.32217 9.39812 3.96001 9.82408C3.22029 9.80054 2.49688 9.60066 1.85001 9.24108V9.30108C1.84994 10.3768 2.22204 11.4195 2.90319 12.2521C3.58434 13.0847 4.53258 13.656 5.58701 13.8691C4.9008 14.0548 4.18135 14.0821 3.48301 13.9491C3.78051 14.8747 4.36001 15.6841 5.14038 16.264C5.92075 16.8439 6.86293 17.1653 7.83501 17.1831C6.18484 18.4785 4.1469 19.1812 2.04901 19.1781C1.67739 19.1782 1.30609 19.1565 0.937012 19.1131C3.06649 20.4823 5.54535 21.2089 8.07701 21.2061C16.647 21.2061 21.332 14.1081 21.332 7.95208C21.332 7.75208 21.327 7.55008 21.318 7.35008C22.2293 6.69105 23.0159 5.87497 23.641 4.94008L23.643 4.93708Z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div className={styles.rightBlock}>
                <div className={styles.navBlock}>
                    <h3 className={styles.titleMenu}>Menu</h3>
                    {!isTabletView && <Navigation footer={true}/>}
                </div>
                <div className={styles.getTouch}>
                    <h3 className={styles.title}>Get in Touch</h3>
                    <p className={styles.text}>Question or feedback?</p>
                    <p className={styles.text}>We???d love to hear from you</p>
                    <div className={styles.email}>
                        <input type="text"
                               className={styles.input}
                               value={email}
                               onChange={handleSetEmail}
                               placeholder="Enter Email"/>
                        <motion.button
                            type="submit"
                            onClick={submit}
                            whileTap={{scale: 0.8}}
                            className={styles.btn}>
                            <svg className={styles.svgEmail} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1564 7.94369L1.40636 1.06869C1.29859 1.0148 1.17754 0.993202 1.05778 1.00651C0.938028 1.01981 0.82467 1.06746 0.731361 1.14369C0.642251 1.21838 0.57574 1.31643 0.539304 1.42685C0.502869 1.53726 0.497953 1.65564 0.525111 1.76869L2.37511 8.49994L0.500111 15.2124C0.474627 15.3069 0.471653 15.4059 0.491426 15.5017C0.511199 15.5975 0.553169 15.6873 0.61396 15.7639C0.674751 15.8405 0.752668 15.9017 0.841444 15.9427C0.930221 15.9837 1.02738 16.0033 1.12511 15.9999C1.22295 15.9994 1.31928 15.9758 1.40636 15.9312L15.1564 9.05619C15.2587 9.00374 15.3447 8.92406 15.4046 8.82592C15.4646 8.72777 15.4964 8.61497 15.4964 8.49994C15.4964 8.38491 15.4646 8.27212 15.4046 8.17397C15.3447 8.07583 15.2587 7.99614 15.1564 7.94369V7.94369ZM2.09386 14.1937L3.47511 9.12494H9.25011V7.87494H3.47511L2.09386 2.80619L13.4751 8.49994L2.09386 14.1937Z" fill="#EB5757" stroke="#EB5757" strokeWidth="0.5"/>
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;