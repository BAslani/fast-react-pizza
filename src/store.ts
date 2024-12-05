import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
