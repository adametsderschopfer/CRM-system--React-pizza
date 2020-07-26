import { Router } from "express";
import Pizza from "../model/pizza.model";
import Order from "../model/order.model"

const router = Router();

router.get("/pizzas", async (req, res) => {
  try {

    const pizzas = await Pizza.find()
    res.status(200).json(pizzas)
    
  } catch (error) {
    console.log(error)
  }
});

router.post("/createOrder", async (req, res) => {
  const { phone, order } = req.body

  const _order = new Order({
    phone,
    order
  }); 

  await _order.save()

  res.status(200).json("Order created")
})

export default router;

//https://sergiopizza.ru/upload/iblock/442/4422160e31f8da7f754410fd15f917e7.png

/*
  title: "ПИЦЦА КАЗАХСКАЯ",
    categoryName: "Жопные",
    price: 295,
    img:
      "https://sergiopizza.ru/upload/iblock/442/4422160e31f8da7f754410fd15f917e7.png",
    isAdded: false,
*/