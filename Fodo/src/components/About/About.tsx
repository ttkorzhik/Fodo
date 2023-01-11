import React, {FC} from 'react';
import Card1 from "../../assets/about.png"
import Card2 from "../../assets/about2.png"
import Card3 from "../../assets/about3.png"

import styles from "../About/About.module.css"

const About:FC = () => {
    return (
        <div className={styles.about} id="about">
            <h4 className={styles.subTitle}>WHAT WE SERVE</h4>
            <h2 className={styles.title}>Your Favorite Food Delivery Partner</h2>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <img className={styles.cardImg} src={Card1} alt="Order"/>
                    <h4 className={styles.cardTitle}>Easy To Order</h4>
                    <p className={styles.cardText}>You only need a few steps in ordering food</p>
                </div>
                <div className={styles.card}>
                    <img className={styles.cardImg} src={Card2} alt="Delivery"/>
                    <h4 className={styles.cardTitle}>Fastest Delivery</h4>
                    <p className={styles.cardText}>Delivery that is always ontime even faster</p>
                </div>
                <div className={styles.card}>
                    <img className={styles.cardImg} src={Card3} alt="Quality"/>
                    <h4 className={styles.cardTitle}>Best Quality</h4>
                    <p className={styles.cardText}>Not only fast for us quality is also number one</p>
                </div>
            </div>
        </div>
    );
};

export default About;