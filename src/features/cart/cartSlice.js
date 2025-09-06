import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

console.log(initialState);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = newItem = { id, name, quantity, unitPrice, totalPrice }
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity: (state, action) => {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalCartItems = (state) =>
  getCart(state).reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state) =>
  getCart(state).reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) => {
  const item = getCart(state).find((item) => item.pizzaId === id);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;
