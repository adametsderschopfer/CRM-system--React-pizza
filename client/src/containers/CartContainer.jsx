import React from "react";
import { NavLink } from "react-router-dom";

import emptyShopCart from "../img/emptyShopCart.svg";
import sm from "../img/sm.svg";
import cartIconB from "../img/cartIconB.svg";
import trash from "../img/trash.svg";
import x from "../img/x.svg";
import {
  DELETE_CART_ELEMENT,
  DELETE_CART_ELEMENTS,
  DECREMENT_PIZZA_COUNTER,
  INCREMENT_PIZZA_COUNTER,
  UN_ADDED_TO_CARD,
  UN_ADDED_ALL_TO_CARD,
} from "../redux/types";
import { createOrderAndFetch, fetchContent } from "../redux/actions/shop.actions";
import { useHistory } from "react-router-dom"

const CartContainer = ({
  cart,
  price,
  dispatch,
  byeState: { preBuy, setPreBuy },
}) => {
  const [numberPhone, setNumberPhone] = React.useState("+7");
  const history = useHistory()

  if (cart.length) {
    return (
      <>
        {preBuy && (
          <div className="modal_preBuy">
            <div className="modal_container">
              <div className="close" onClick={() => setPreBuy(ps => !ps)}>x</div>
              <p>Оставьте свой номер, что-бы мы могли перезвонить вам.</p>
              <input
                type="phone"
                value={numberPhone}
                onChange={(e) => setNumberPhone(e.target.value)}
                maxLength={12}
              />

              <button
                onClick={async () => {
                  await dispatch(createOrderAndFetch(cart, numberPhone));
                  await dispatch(fetchContent())
                  history.push("/")
                }}
                disabled={numberPhone.length < 10}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
        <div className="Cart">
          <div className="cartContainer">
            <div className="row">
              <div className="title ptb">
                <img src={cartIconB} alt="" />
                Корзина
              </div>
              <button
                className="trash ptb"
                onClick={() => {
                  dispatch({ type: DELETE_CART_ELEMENTS });
                  dispatch({ type: UN_ADDED_ALL_TO_CARD });
                }}
              >
                <img src={trash} alt="" />
                Очистить корзину
              </button>
            </div>

            <hr className="specHR" />

            {cart.map(
              ({ id, title, img, dough, size, quantity, price }, idx) => (
                <React.Fragment key={idx}>
                  <div className="item">
                    <div className="img">
                      <img src={img} alt="" />
                    </div>

                    <div className="info">
                      <div className="title">{title}</div>
                      <div className="params">
                        <div className="dough">{dough}</div>,&nbsp;
                        <div className="size">{size} см.</div>
                      </div>
                    </div>

                    <div className="counter">
                      <button
                        className="decr btn-circle"
                        onClick={() =>
                          dispatch({ type: DECREMENT_PIZZA_COUNTER, id })
                        }
                      >
                        -
                      </button>
                      <div className="quantity">{quantity}</div>
                      <button
                        className="incr btn-circle"
                        onClick={() =>
                          dispatch({ type: INCREMENT_PIZZA_COUNTER, id })
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="price">{price} ₽</div>

                    <button
                      onClick={() => {
                        dispatch({ type: DELETE_CART_ELEMENT, id });
                        dispatch({ type: UN_ADDED_TO_CARD, id });
                      }}
                      className="btn-circle remove"
                    >
                      <img src={x} alt="" />
                    </button>
                  </div>
                  <hr className="specHR" />
                </React.Fragment>
              )
            )}

            <div className="row">
              <div className="all ptb tac">
                Всего пицц: &nbsp;<b>{cart.length} шт.</b>
              </div>
              <div className="ammount ptb tac">
                Сумма заказа: &nbsp;<b className="mainColor">{price} ₽</b>
              </div>
            </div>

            <div className="row">
              <NavLink className="goBack mtb" to="/">
                Вернуться назад
              </NavLink>
              <button
                className="buy mtb"
                onClick={() => setPreBuy((ps) => !ps)}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="Cart">
        <div className="cartEmpty">
          <div className="title">
            Корзина пустая&nbsp;
            <img src={sm} alt="" />
          </div>
          <div className="descr">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </div>
          <div className="img">
            <img src={emptyShopCart} alt="" />
          </div>
          <NavLink to="/" className="goBack">
            Вернуться назад
          </NavLink>
        </div>
      </div>
    );
  }
};

export default CartContainer;
