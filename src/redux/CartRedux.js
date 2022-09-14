import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.lowPrice * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= (state.quantity>0)?1:0;
      state.total -= (state.total>0)?((state.products[action.payload.number]?.lowPrice) * (state.products[action.payload.number]?.quantity)):0;
      const {products} = state;
      if(action.payload.number<1){
      products.splice(0,1)}
      else{products.splice(action.payload.number,action.payload.number)}
      state.products = products;
      },
    resetCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});



export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;