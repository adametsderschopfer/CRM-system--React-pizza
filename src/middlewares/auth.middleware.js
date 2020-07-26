import Cookies from "cookies";
import Admin from "../model/admin.model";

export default async (req, res, next) => {
  const cookie = new Cookies(req, res);
  const admin = await Admin.findOne({ login: "admin" });

  if (cookie.get("adminId")) {
    if (cookie.get("adminId") === admin.token) {
      req.user = admin;
      next();
    } else {
      res.redirect("/admin/auth");
    }
  } else {
    res.redirect("/admin/auth");
  }
};
