import React, {FC} from 'react';

import {GoodsItemProps} from "../../../mocks/goodsConfig";

import styles from "./HomeItem.module.css";

const HomeItem:FC<GoodsItemProps> = ({imageSrc, name, price, description}) => {
    return (
        <div className={styles.item}>
            <img src={imageSrc} alt={name} className={styles.itemImg}/>
            <p className={styles.itemName}>{name}</p>
            <p className={styles.itemDescription}>{description}</p>
            <p className={styles.itemPrice}>{`$ ${price}`}</p>
        </div>
    );
};

export default HomeItem;