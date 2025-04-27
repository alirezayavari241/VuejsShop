import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] 
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); 
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); 
    },
    clearCart() {
      this.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
});
