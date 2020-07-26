import {model, Schema} from "mongoose"

const def = {
  type: String,
  required: true
}

const Pizza = new Schema({
  title: {
    ...def
  },
  price: {
    ...def
  },
  categoryName: {
    ...def
  },
  img: {
    ...def
  },
  isAdded: {
    type: Boolean,
    required: true
  }  
})

export default model("Pizzas", Pizza);
