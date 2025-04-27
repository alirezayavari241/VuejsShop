<script setup>
import Navbar from '../components/Ui/Navbar.vue';
import FooterComponent from '../components/Ui/FooterComponent.vue';
import { useCartStore } from '../stores/Cartstore';
import { ref, computed, onMounted } from 'vue';

const UserCart = useCartStore();
const cartItems = ref([]);





onMounted(() => {
  const savedCart = JSON.parse(localStorage.getItem('cartItems'));
  if (savedCart) {
    cartItems.value = savedCart;
  }
});

const updateQuantity = (item, newQuantity) => {
  if (newQuantity < 1) return;
  if (newQuantity > item.stock) {
    alert(`فقط ${item.stock} عدد موجوده!`);
    return;
  }
  item.quantity = newQuantity;
  saveCart();
};

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);
  saveCart();
};

const clearCart = () => {
  if (confirm('آیا مطمئنی میخوای سبد خرید رو خالی کنی؟')) {
    cartItems.value = [];
    saveCart();
  }
};

const saveCart = () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  UserCart.cartItems = cartItems.value;
};

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});
</script>

<template>
  <div class="flex flex-col min-h-screen text-black w-full">
    <Navbar />

    <main class="flex-1 w-screen p-4">
      <h1 class="text-3xl font-bold mb-8 text-center">🛒 سبد خرید شما</h1>

      <div v-if="cartItems.length" class="w-full overflow-x-auto">
        <div class="max-w-6xl mx-auto">
          <table class="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead class="bg-gray-100">
              <tr class="text-gray-700 text-sm md:text-base">
                <th class="py-3 px-4 text-center">تصویر</th>
                <th class="py-3 px-4 text-center">نام محصول</th>
                <th class="py-3 px-4 text-center">قیمت</th>
                <th class="py-3 px-4 text-center">موجودی</th>
                <th class="py-3 px-4 text-center">تعداد</th>
                <th class="py-3 px-4 text-center">حذف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id" class="border-t hover:bg-gray-50 transition">
                <td class="py-3 px-4 flex justify-center items-center">
                  <img :src="item.image" alt="Product" class="w-20 h-20 object-cover rounded" />
                </td>
                <td class="py-3 px-4 text-center"><router-link :to="`/productس/${item.id}`">{{ item.title }}</router-link></td>
                <td class="py-3 px-4 text-center">{{ item.price.toLocaleString() }} تومان</td>
                <td class="py-3 px-4 text-center">{{ item.stock }}</td>
                <td class="py-3 px-4 text-center">
                  <input
                    type="number"
                    class="w-20 p-1 rounded shadow-sm text-center border"
                    :min="1"
                    :max="item.stock"
                    v-model.number="item.quantity"
                    step="1"
                    @change="updateQuantity(item, item.quantity)"
                  />
                </td>
                <td class="py-3 px-4 text-center">
                  <button
                    @click="removeItem(item.id)"
                    class="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex flex-col md:flex-row justify-between items-center mt-8 bg-gray-50 p-4 rounded-lg shadow">
            <div class="text-lg font-semibold mb-4 md:mb-0">
              مبلغ کل: <span class="text-green-600">{{ totalPrice.toLocaleString() }} تومان</span>
            </div>
            <button
              @click="clearCart"
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded text-sm md:text-base"
            >
              خالی کردن سبد
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-20 text-lg">
        سبد خرید شما خالی است 🛒
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    display: none;
  }

  td {
    position: relative;
    padding-right: 50%;
    text-align: right;
  }

  td::before {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    color: #555;
  }

  td:nth-of-type(1)::before { content: "تصویر"; }
  td:nth-of-type(2)::before { content: "نام محصول"; }
  td:nth-of-type(3)::before { content: "قیمت"; }
  td:nth-of-type(4)::before { content: "موجودی"; }
  td:nth-of-type(5)::before { content: "تعداد"; }
  td:nth-of-type(6)::before { content: "حذف"; }
}
</style>
