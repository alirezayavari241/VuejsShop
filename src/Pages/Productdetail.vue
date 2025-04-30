<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/Products'
import { useCartStore } from '../stores/Cartstore'
import Navbar from '../components/Ui/Navbar.vue'
import FooterComponent from '../components/Ui/FooterComponent.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const {t ,locale} = useI18n({ useScope: 'global' })
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter();
const store = useProductsStore()

const id = Number(route.params.id)
const product = computed(() => store.Products.find(p => p.id === id))

const discountedPrice = computed(() => {
  if (!product.value) return 0
  return Math.floor(product.value.price * (1 - product.value.discount / 100))
})

const formattedOriginalPrice = computed(() => {
  if (!product.value) return ''
  return new Intl.NumberFormat(locale.value).format(product.value.price) + ' ' + t('Productdetail.Currency')
})

const formattedDiscountedPrice = computed(() => {
  if (!product.value) return ''
  return new Intl.NumberFormat(locale.value).format(discountedPrice.value) + ' ' + t('Productdetail.Currency')
})

const isInCart = computed(() => {
  return cartStore.cartItems.some(item => item.id === product.value?.id)
})
function handleAddToCart() {
  if (!isInCart.value && product.value) {
    const plainProduct = JSON.parse(JSON.stringify(product.value));
    cartStore.addToCart(plainProduct);
    alert(t('Productdetail.Addedmsg'));
  } else {
    router.push('/cart');
  }
}
</script>

<template>
  <div class="w-screen bg-gray-50">
    <Navbar />

    <div class=" mx-auto px-4 py-10 flex flex-col md:flex-row items-center md:items-start gap-10 mt-24">

      <div class="w-full md:w-1/2 flex justify-center">
        <div class="relative group">
          <img 
            :src="product?.image" 
            class="w-72 h-72 md:w-96 md:h-96 object-cover rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
            :alt="product?.title || 'Item'" 
          />
          <div 
            v-if="product?.discount > 0" 
            class="absolute top-4 left-4 bg-red-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full">
            {{ product.discount }}٪ {{ t('Productdetail.Discount') }}
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        <div class="text-center">
          <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ product?.title[locale] }}</h1>
          <p class="text-gray-700 text-sm md:text-base"><strong>{{ t('Productdetail.Author') }}:</strong> {{ product?.author }}</p>
        </div>

        <div class="flex flex-col items-center gap-2">
          <p v-if="product?.discount > 0" class="text-gray-400 line-through text-lg">
            {{ formattedOriginalPrice }}
          </p>
          <p class="text-green-600 text-2xl md:text-3xl font-bold">
            {{ formattedDiscountedPrice }}
          </p>
          <p class="text-gray-700 text-sm"><strong>{{t('Productdetail.Stock')}}:</strong> {{ product?.stock }}</p>
        </div>

        <div class="bg-gray-100 p-4 rounded-xl text-right text-gray-700 leading-7 text-sm md:text-base">
          {{t('Productdetail.About')}}: {{ product?.description }}
        </div>

        <div class="flex justify-center mt-4">
          <button 
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-all duration-300 shadow-md hover:scale-105"
            @click="handleAddToCart"
          >
            {{ isInCart ? t('Productdetail.Incartmsg'): t('Productdetail.Addms') }}
          </button>
        </div>
      </div>

    </div>

  </div>
  <FooterComponent />

</template>

<style scoped>
</style>
