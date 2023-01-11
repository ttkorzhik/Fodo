import iceCream from "../assets/i1.png";
import Strawberries from "../assets/f1.png";
import Chicken from "../assets/c3.png";
import Fish from "../assets/fi1.png";

export interface GoodsItemProps {
    id: number
    name: string
    description: string
    price: string
    imageSrc: string
}

export const goodsConfig:GoodsItemProps[] = [
    {
        id: 1,
        name: "Icecream",
        description: "Chocolate & vanilla",
        price: "5.25",
        imageSrc: iceCream,
    },
    {
        id: 2,
        name: "Strawberries",
        description: "Fresh Strawberries",
        price: "10.25",
        imageSrc: Strawberries,
    },
    {
        id: 3,
        name: "Chicken Kebab",
        description: "Mixed Kebab Plate",
        price: "8.25",
        imageSrc: Chicken,
    },
    {
        id: 4,
        name: "Fish Kebab",
        description: "Mixed Fish Kebab",
        price: "5.25",
        imageSrc: Fish,
    },
]
