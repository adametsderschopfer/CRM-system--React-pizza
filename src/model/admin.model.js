import { model, Schema } from "mongoose";

const Admin = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

export default model("Admin", Admin);
