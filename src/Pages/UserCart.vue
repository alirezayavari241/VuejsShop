<script setup>
import Navbar from '../components/Ui/Navbar.vue';
import FooterComponent from '../components/Ui/FooterComponent.vue';
import { useCartStore } from '../stores/Cartstore';
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const {t , locale} = useI18n({ useScope: 'global' })
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
  item.quantity = newQuantity;
  saveCart();
};

const removeItem = (itemId) => {
  if (confirm(t("Cart.Deletemsg"))) {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    saveCart();
}

};

const clearCart = () => {
  if (confirm(t("Cart.Clearmsg"))) {
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
      <h1 class="text-3xl font-bold mb-8 text-center mt-16">🛒{{ t("Cart.Title") }}</h1>

      <div v-if="cartItems.length" class="w-full overflow-x-auto">
        <div class="max-w-6xl mx-auto">
          <table class="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead class="bg-gray-100">
              <tr class="text-gray-700 text-sm md:text-base">
                <th class="py-3 px-4 text-center">{{ t("Cart.Tabletitle") }}</th>
                <th class="py-3 px-4 text-center">{{ t("Cart.Tableprice") }}</th>
                <th class="py-3 px-4 text-center">{{ t("Cart.Tablecount") }}</th>
                <th class="py-3 px-4 text-center">{{ t("Cart.Tabledelete") }}</th>
                <th class="py-3 px-4 text-center">{{ t("Cart.Tableimg") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id" class="border-t hover:bg-gray-50 transition">
                <td class="py-3 px-4 flex justify-center items-center" :data-label="t('Cart.Tableimg')">
                  <img :src="item.image" alt="Product" class="w-20 h-20 object-cover rounded" />
                </td>
                <td class="py-3 px-4 text-center" :data-label="t('Cart.Tabletitle')"><router-link :to="`/product/${item.id}`">{{ item.title[locale] }}</router-link></td>
                <td class="py-3 px-4 text-center" :data-label="t('Cart.Tableprice')">{{ item.price.toLocaleString() }}{{t('Cart.Currency')}}</td>
                <td class="py-3 px-4 text-center" :data-label="t('Cart.Tablecount')">
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
                <td class="py-3 px-4 text-center" :data-label="t('Cart.Tabledelete')">
                  <button
                    @click="removeItem(item.id)"
                    class="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                  >{{ t("Cart.Deletebtn") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex flex-col md:flex-row justify-between items-center mt-8 bg-gray-50 p-4 rounded-lg shadow">
            <div class="text-lg font-semibold mb-4 md:mb-0 text-center">
              {{ t('Cart.Total') }}<br/><span class="text-green-600 flex justify-center">{{ totalPrice.toLocaleString() }}{{t('Cart.Currency')}}</span>
            </div>
            <button
              @click="clearCart"
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded text-sm md:text-base"
              >{{ t("Cart.Clearbtn") }}

            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-20 text-lg">
        {{t("Cart.Empty")}}🛒
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
  table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #555;
  }
}
</style>
