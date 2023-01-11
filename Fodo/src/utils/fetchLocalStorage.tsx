export const fetchCart = () => {
    const cartInfo =
        localStorage.getItem("cartItems") !== "undefined"
            ? JSON.parse(localStorage.getItem("cartItems") as string)
            : localStorage.clear();

    return cartInfo ? cartInfo : [];
};