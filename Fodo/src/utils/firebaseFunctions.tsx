import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export interface itemForFirebaseProps {
    id: string,
    title: string
    imageURL: string
    category: string
    calories: string
    qty: number,
    price: string
}
// Сохранение 1 товара
export const saveItem = async (data: itemForFirebaseProps) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
        merge: true,
    });
};

// Получить все товары, которые есть
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};