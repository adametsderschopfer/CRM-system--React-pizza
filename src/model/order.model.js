import { model, Schema } from "mongoose";

const def = {
  type: String,
  required: true,
};

const Order = new Schema({
  phone: {
    type: String,
    required: true,
  },
  order: [
    {
      title: {
        ...def,
      },
      price: {
        ...def,
      },
      img: {
        ...def,
      },
      isAdded: {
        type: Boolean,
        required: true,
      },
      dough: {
        ...def,
      },
      size: {
        ...def,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default model("orders", Order);
