import { create } from "zustand";
import { createUserSlice } from "./slices/user-slice";
import { createProductSlice } from "./slices/product-slice";

export const useAppStore = create()((...a) => ({
  ...createUserSlice(...a),
  ...createProductSlice(...a),
}));
