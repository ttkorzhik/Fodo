import {itemForFirebaseProps} from "../utils/firebaseFunctions";
import {fetchCart} from "../utils/fetchLocalStorage";

export interface StateProps {
    user: any
    foodItems: itemForFirebaseProps[] | null
    cartShow: boolean
    cartItems: itemForFirebaseProps[]
}
const cartInfo = fetchCart()

export const initialState: StateProps  = {
    user: null,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo
}