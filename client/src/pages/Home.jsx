import React from "react";
import { useSelector, useDispatch } from "react-redux";

import HomeContainer from "../containers/HomeContainer";
import { ADD_TO_CART_ELEMENT, IS_ADDED_TO_CARD } from "../redux/types";


const Home = () => {
  const pizzas = useSelector(({ shop }) => shop.pizzas);
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState(["Все"]);

  React.useEffect(() => {
    if (pizzas && pizzas.length) {
      pizzas.map((i, idx) => {
        setCategories(ps=> new Set([...ps, i.categoryName]));
        return i;
      });
    }
  }, [pizzas]);

  const addingInCart = (e, obj) => {
    e.preventDefault();
    const dough = e.target.dough.value;
    const size = e.target.size.value;
    
    const pizza = {
      ...obj,
      size,
      dough,
      quantity: 1,
    };

    pizza.isAdded = true

    dispatch({ type: IS_ADDED_TO_CARD, id: pizza.id });

    dispatch({ type: ADD_TO_CART_ELEMENT, pizza });
  };

 

  return (
    <HomeContainer
      pizzas={pizzas}
      addingInCart={addingInCart}
      categories={categories}
    />
  );
};

export default Home;
