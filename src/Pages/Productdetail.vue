<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/Products'
import { useCartStore } from '../stores/Cartstore'
import Navbar from '../components/Ui/Navbar.vue'
import FooterComponent from '../components/Ui/FooterComponent.vue'
import { computed } from 'vue'

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter();
const store = useProductsStore()

const id = Number(route.params.id)
const product = store.Products.find(p => p.id === id)
const formattedOriginalPrice = product 
  ? new Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'
  : ''

const discountedPrice = product 
  ? Math.floor(product.price * (1 - product.discount / 100))
  : 0

const formattedDiscountedPrice = discountedPrice
  ? new Intl.NumberFormat('fa-IR').format(discountedPrice) + ' تومان'
  : ''

const isInCart = computed(() => {
  return cartStore.cartItems.some(item => item.id === product.id)
})

function handleAddToCart() {
  if (!isInCart.value) {
    cartStore.addToCart(product)
    alert('کالا به سبد خرید افزوده شد!')
  } else {
    router.push('/cart')
  }
}
</script>

<template>
  <div class="w-screen">
    <Navbar />
  </div>
  <div class="flex flex-col items-center p-4 sm:p-8 mt-16">
    <div>
      <img :src="product?.image"
        class="w-72 h-72 object-cover hover:opacity-90 cursor-pointer transition-opacity shadow-2xl" :alt="product?.title || 'محصول'">
    </div>
    <div class="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-6 relative mt-8 ">
      <div v-if="product?.discount > 0" class="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
        {{ product.discount }}٪ تخفیف
      </div>
      <span class="flex flex-col border-black border-1 w-fit p-3 rounded-xl ">
        <h1 class="text-2xl font-bold mb-4 text-center">{{ product?.title }}</h1>
        <p class="text-gray-700 mb-2 text-center"><strong>نویسنده:</strong> {{ product?.author }}</p>
        <div class="flex items-center justify-center gap-4 mb-4">
          <p v-if="product?.discount > 0" class="text-gray-400 line-through text-lg">
            {{ formattedOriginalPrice }}
          </p>
          <p class="text-green-600 text-2xl font-bold">
            {{ formattedDiscountedPrice }}
          </p>
        </div>
        <p class="text-gray-700 mb-2 text-center"><strong>موجودی:</strong> {{ product?.stock }} عدد</p>
      </span>
      <p class="text-gray-600 text-right text-lg mt-3">خلاصه داستان: {{ product?.description }}</p>
  
      <div class="mt-8 flex justify-center">
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:scale-105" 
          @click="handleAddToCart"
        >
          {{ isInCart ? 'کالا در سبد موجود است' : 'اضافه به سبد خرید' }}
        </button>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped>
</style>
