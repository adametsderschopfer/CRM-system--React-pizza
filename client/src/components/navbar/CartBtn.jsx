import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import cIc from "../../img/cartIcon.svg";
import { useSelector } from "react-redux";
import { useState } from "react";

const CartBtn = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [price, setPrice] = useState(0);

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
    <div className="cart">
      <div className="amount">{price} ₽</div>
      <hr className="specific" />
      <div className="cartItems">
        <img src={cIc} alt="" />
        <span>{cart.length}</span>
      </div>
      <NavLink to="/cart" className="btn">
        Открыть корзину
      </NavLink>
    </div>
  );
};

export default CartBtn;
