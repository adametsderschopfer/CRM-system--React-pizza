import React, { useState } from "react";
import CartContainer from "../containers/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);

  const [preBuy, setPreBuy] = useState(false);

  useEffect(() => {
    if (cart.length) {
      let _price = [];

      cart.map((i) => {
        if (i.price) {
          _price = [..._price, i.price * i.quantity];
        }

        return i;
      });

      setPrice(_price.reduce((acc, p) => acc + p));
    } else {
      setPrice(0);
    }
  }, [cart]);

  return (
    <CartContainer
      cart={cart}
      price={price}
      dispatch={dispatch}
      byeState={{ preBuy, setPreBuy }}
    />
  );
};

export default Cart;
