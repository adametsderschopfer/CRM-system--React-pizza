import { Router } from "express";
import Cookies from "cookies";
import Admin from "../model/admin.model";
import Order from "../model/order.model";
import Pizzas from "../model/pizza.model";

import adminMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", adminMiddleware, async (req, res) => {
  const orders = await Order.find();

  res.render("orders", { orders, isOrder: true, isPizzas: false });
});

router.get("/order/:id", adminMiddleware, async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.render("order", order);
});

router.post("/deleteorder", adminMiddleware, async (req, res) => {
  await Order.findByIdAndDelete(req.body.pizzaId);

  res.redirect("/admin");
});

router.get("/pizzas", adminMiddleware, async (req, res) => {
  const pizzas = await Pizzas.find();

  res.render("pizzas", {
    pizzas,
    isPizzas: true,
    isOrder: false,
  });
});

router.get(
  "/pizzas/deletepizza/:pizzaId",
  adminMiddleware,
  async (req, res) => {
    await Pizzas.findByIdAndDelete(req.params.pizzaId);

    res.redirect("/admin/pizzas");
  }
);

router.get("/pizzas/edit/:pizzaId", adminMiddleware, async (req, res) => {
  const edP = await Pizzas.findById(req.params.pizzaId);

  res.render("pizzaEdit", edP);
});

router.post("/pizzas/edit/:pizzaId", adminMiddleware, async (req, res) => {
  const { title, img, categoryName, price } = req.body;

  const edP = await Pizzas.findById(req.params.pizzaId);

  edP.title = title;
  edP.img = img;
  edP.categoryName = categoryName;
  edP.price = price;

  edP.save();

  res.redirect("/admin/pizzas");
});

router.get("/pizzas/addnewpizza", adminMiddleware, async (req, res) => {
  const categoryes = await Pizzas.find();
  let _categoryes = [];
  let generalCat = [];

  categoryes.map((i) => {
    if (i.categoryName) {
      _categoryes = [..._categoryes, i.categoryName];
    }
  });

  new Set(_categoryes).forEach((i) => (generalCat = [...generalCat, i]));

  res.render("addNewPizza", {
    generalCat,
  });
});

router.post("/pizzas/addnewpizza", adminMiddleware, async (req, res) => {
  const { title, categoryName, price, img } = req.body;
  console.log(req.body);
  if (!title || !categoryName || !price || !img) {
    return res.redirect("/admin/pizzas/addnewpizza");
  }

  await new Pizzas({
    title,
    img,
    categoryName,
    price,
    isAdded: false,
  }).save();

  res.redirect("/admin/pizzas");
});

router.get("/signout", adminMiddleware, async (req, res) => {
  const cookie = new Cookies(req, res);
  const admin = await Admin.findOne({ token: cookie.get("adminId") });

  admin.token = null;
  await admin.save();

  cookie.set("adminId", null);

  res.redirect("/admin");
});

router.get("/auth", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const cookie = new Cookies(req, res);
  const { login, password } = req.body;

  function tokenGenerator(inititalId) {
    return (
      inititalId +
      Math.floor(Math.random() * 1000) +
      Date.now()
    ).toString();
  }

  if (!password) {
    return res.redirect("/admin/auth");
  }

  const user = await Admin.findOne({ login });

  if (user.password === password) {
    const token = tokenGenerator(user._id);
    cookie.set("adminId", token);
    user.token = token;
    await user.save();
    res.redirect("/admin");
  } else {
    res.redirect("/admin/auth");
  }
});

export default router;
