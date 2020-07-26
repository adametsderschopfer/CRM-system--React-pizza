import React from "react";
import { useState } from "react";

import arrow from "../img/arrow.svg";
import sm from "../img/sm.svg";
import emptyShopCart from "../img/emptyShopCart.svg";

const HomeContainer = ({ pizzas, addingInCart, categories }) => {
  const [_pizzas, set_Pizzas] = useState(pizzas);
  const [sortMenu, setSortMenu] = useState(false);

  const [sortStatus, setSortStatus] = useState("Нет");
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  React.useEffect(() => {
    switch (sortStatus) {
      case "Нет": {
        setSortStatus("Нет")
        set_Pizzas(pizzas);
        break;
      }
      case "По алфавиту.": {

        break;
      }

      case "По цене max.": {

        break;
      }

      case "По цене min.": {
        
        break;
      }

      default:
        return false;
    }
  }, [sortStatus, pizzas]);

  React.useEffect(() => {
    if (currentCategory === "Все") {
      set_Pizzas(pizzas);
    } else {
      set_Pizzas([...pizzas].filter((i) => i.categoryName === currentCategory));
    }
  }, [currentCategory, pizzas]);

 if (_pizzas && _pizzas.length) {
    return (
          <div className="home">
      <div className="row-bar">
        <div className="categories">
          {categories.size &&
            [...categories].map((i, idx) => (
              <div className="radioItem" key={idx}>
                <input
                  type="radio"
                  name="category"
                  id={i + idx}
                  className="hidden"
                  value={i}
                  onClick={(e) => setCurrentCategory(e.target.value)}
                  defaultChecked={i === currentCategory}
                />
                <label htmlFor={i + idx}>{i}</label>
              </div>
            ))}
        </div>

        <div className="choice">
          <img
            src={arrow}
            style={{ transform: !sortMenu ? `rotate(180deg)` : null }}
            alt=""
          />
          <p onClick={() => setSortMenu((ps) => !ps)}>Сортировка по:</p>
          <span onClick={() => setSortMenu((ps) => !ps)}>{sortStatus}</span>
          {sortMenu && (
            <div className="modal">
              <div className="modalRadio">
                <input
                  className="hidden"
                  type="radio"
                  value="Нет"
                  name="choise"
                  id="choise-Нет"
                  onClick={() => {
                    setSortStatus("Нет");
                    setSortMenu((ps) => !ps);
                  }}
                  defaultChecked={sortStatus === "Нет"}
                />
                <label htmlFor="choise-Нет">Нет</label>
              </div>
              <div className="modalRadio">
                <input
                  className="hidden"
                  type="radio"
                  value="По алфавиту."
                  name="choise"
                  id="choise-По алфавиту."
                  onClick={() => {
                    setSortStatus("По алфавиту.");
                    setSortMenu((ps) => !ps);
                  }}
                />
                <label htmlFor="choise-По алфавиту.">По алфавиту.</label>
              </div>
              <div className="modalRadio">
                <input
                  className="hidden"
                  type="radio"
                  value="По цене max."
                  name="choise"
                  id="choise-По цене max."
                  onClick={() => {
                    setSortStatus("По цене max.");
                    setSortMenu((ps) => !ps);
                  }}
                />
                <label htmlFor="choise-По цене max.">По цене max.</label>
              </div>
              <div className="modalRadio">
                <input
                  className="hidden"
                  type="radio"
                  value="По цене min."
                  name="choise"
                  id="choise-По цене min."
                  onClick={() => {
                    setSortStatus("По цене min.");
                    setSortMenu((ps) => !ps);
                  }}
                />
                <label htmlFor="choise-По цене min.">По цене min.</label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="catName">{currentCategory} пиццы</div>

      <div className="pizzas">
        {_pizzas.map(({ img, title, price, isAdded, id }, idx) => (
          <div className="pizza" key={idx}>
            <form
              onSubmit={(e) => {
                addingInCart(e, {
                  title,
                  img,
                  price,
                  id,
                  isAdded
                });
              }}
            >
              <div className="img">
                <img src={img} alt="" />
              </div>
              <div className="title">{title}</div>
              <div className="setts">
                <div className="dough">
                  <div className="form-item radio-btn">
                    <input
                      type="radio"
                      name="dough"
                      id={"thin-" + idx}
                      value="тонкое"
                      className="hidden"
                      defaultChecked={true}
                    />
                    <label htmlFor={"thin-" + idx}>тонкое</label>
                  </div>
                  <div className="form-item radio-btn">
                    <input
                      type="radio"
                      className="hidden"
                      name="dough"
                      id={"trad-" + idx}
                      value="традиционное"
                    />
                    <label htmlFor={"trad-" + idx}>традиционное</label>
                  </div>
                </div>
                <div className="size">
                  <div className="form-item radio-btn">
                    <input
                      type="radio"
                      name="size"
                      id={"26-" + idx}
                      value="26"
                      className="hidden"
                      defaultChecked={true}
                    />
                    <label htmlFor={"26-" + idx}>26 см.</label>
                  </div>
                  <div className="form-item radio-btn">
                    <input
                      type="radio"
                      name="size"
                      id={"30-" + idx}
                      value="30"
                      className="hidden"
                    />
                    <label htmlFor={"30-" + idx}>30 см.</label>
                  </div>
                  <div className="form-item radio-btn">
                    <input
                      type="radio"
                      name="size"
                      id={"40-" + idx}
                      value="40"
                      className="hidden"
                    />
                    <label htmlFor={"40-" + idx}>40 см.</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="price">от {price} ₽</div>

                {!isAdded ? (
                  <button
                    className="addInCart"
                    type="submit"
                    disabled={isAdded}
                  >
                    +&nbsp; Добавить
                  </button>
                ) : (
                  <button
                    className="addInCart disabled"
                    type="submit"
                    disabled={isAdded}
                  >
                    В корзине
                  </button>
                )}
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
    )
 } else { 
   return (
      <div className="Cart">
        <div className="cartEmpty">
          <div className="title">
            Товаров пока нет!&nbsp;
            <img src={sm} alt="" />
          </div>
          <div className="descr">
            Вероятней всего, пицц еще нет, следите за обновлениями!
          </div>
          <div className="img">
            <img src={emptyShopCart} alt="" />
          </div>
        </div>
      </div>
    );
 }
};

export default HomeContainer;
