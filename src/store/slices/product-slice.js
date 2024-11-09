export const createProductSlice = (set) => ({
  products: [],
  isProductsTriggered: false,
  setProductsTriggered: (value) => set({ isProductsTriggered: value }),
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
});
