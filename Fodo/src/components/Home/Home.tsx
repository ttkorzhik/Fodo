import React, {FC} from 'react';

import delivery from "../../assets/delivery.png";
import background from "../../assets/heroBg.png";

import HomeItem from "./HomeItem/HomeItem";
import {goodsConfig} from "../../mocks/goodsConfig";

import styles from "./Home.module.css"

const Home:FC = () => {
    return (
        <section className={styles.wrapper} >
            <div className={styles.block}>
                <div className={styles.delivery}>
                    <p className={styles.deliveryText}>Bike delivery</p>
                    <div className={styles.blockImg}>
                        <img src={delivery} alt="delivery" className={styles.img}/>
                    </div>
                </div>
                <p className={styles.title}>The Fastest delivery in<span className={styles.span}> Your City</span></p>
                <p className={styles.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
                    eaque fugit distinctio est nam voluptatum architecto, porro iusto
                    deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
                    suscipit!</p>
                <button type="button" className={styles.button}>Order now</button>
            </div>

            <div className={styles.rightBlock}>
                <div className={styles.back}>
                    <img className={styles.backImg} src={background} alt="back"></img>
                    <div className={styles.goods} >
                        {goodsConfig.map((item) => (
                            <HomeItem {...item} key={item.id}></HomeItem>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;