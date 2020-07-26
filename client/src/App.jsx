import React, { useEffect } from "react";

import Routes from "./pages/Routes";
import Navbar from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_LS_ITEMS, IS_BUIED_F } from "./redux/types";
import Loading from "./components/loading";
import { fetchContent } from "./redux/actions/shop.actions";

export default () => {
  const { isBuied, loading } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [isClosedModal, setIsClosedModal] = React.useState(false);

  useEffect(() => {
    dispatch({ type: CHECK_LS_ITEMS });

    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (isBuied) {
      setTimeout(() => {
        setIsClosedModal(true);
        setTimeout(() => {
          setIsClosedModal(false);

          dispatch({ type: IS_BUIED_F });
        }, 500);
      }, 5000);
    }
  }, [isBuied, dispatch]);

  return (
    <div className="container">
      <Navbar />
      {isBuied && (
        <div
          className={"buySuccess"}
          style={{ animation: isClosedModal && "buySuccessClose 0.6s linear" }}
        >
          <p>Заказ поступил в оброботку, ожидайте звонка!</p>
        </div>
      )}
      <div className="content">{!loading ? <Routes /> : <Loading />}</div>
    </div>
  );
};
