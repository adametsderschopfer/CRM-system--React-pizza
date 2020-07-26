import React from "react";
import pizza_img from "../../img/pizza.svg";
import CartBtn from "./CartBtn";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const isCart = useLocation().pathname === "/cart";

  return (
    <div className="navbar">
      <div className="row">
        <NavLink to="/">
          <div className="logo">
            <div className="img">
              <img src={pizza_img} alt="" />
            </div>

            <div className="texts">
              <div className="maintext">REACT PIZZA</div>
              <div className="descrtext">самая вкусная пицца во вселенной</div>
            </div>
          </div>
        </NavLink>

        {!isCart && <CartBtn />}
      </div>
    </div>
  );
};

export default Navbar;
