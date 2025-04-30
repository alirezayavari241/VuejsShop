<script setup>
import { useProductsStore } from '../stores/Products';
import Navbar from '../components/Ui/Navbar.vue';
import FooterComponent from '../components/Ui/FooterComponent.vue';
import Card from '../components/Card.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';



const {t} = useI18n({ useScope: 'global' })

const productsStore = useProductsStore();
const products = productsStore.Products;

const selectedFilter = ref('all'); 
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.query.filter) {
    selectedFilter.value = route.query.filter;
  }
});

watch(selectedFilter, (newFilter) => {
  router.push({ query: { ...route.query, filter: newFilter } });
});

const filteredProducts = computed(() => {
  let sorted = [...products];

  if (selectedFilter.value === 'cheapest') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (selectedFilter.value === 'expensive') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (selectedFilter.value === 'highest-discount') {
    sorted.sort((a, b) => b.discount - a.discount);
  }
  return sorted;
});
</script>

<template>
  <Navbar />
  <div class="w-screen mt-24">
    <div class="text-center mx-auto pb-2 w-8/12 justify-center border-b-black border-b-2">
      <p class="text-2xl">{{ t('AllProducts.Title') }}</p>
    </div>

    <div class="flex gap-2 justify-center mt-6 flex-wrap">
      <button @click="selectedFilter = 'all'" class="border rounded-full py-2 px-4 border-black btnbg hover:bg-green-800 transition hover:text-white" :class="selectedFilter === 'all' ? 'bg-green-900 text-white' : ''">
        {{ t("AllProducts.All") }}
      </button>
      <button @click="selectedFilter = 'cheapest'" class="border rounded-full border-black py-2 px-4 text-black btnbg hover:bg-green-800 hover:text-white transition" :class="selectedFilter === 'cheapest' ? 'bg-green-900 text-white' : ''">
      {{ t("AllProducts.Low") }}
      </button>
      <button @click="selectedFilter = 'expensive'" class="border rounded-full py-2 px-4 border-black btnbg hover:bg-green-800 transition hover:text-white" :class="selectedFilter === 'expensive' ? 'bg-green-900 text-white' : ''">
        {{ t("AllProducts.High") }}
      </button>
      <button @click="selectedFilter = 'highest-discount'" class="border rounded-full py-2 px-4 border-black btnbg hover:bg-green-800 transition hover:text-white" :class="selectedFilter === 'highest-discount' ? 'bg-green-900 text-white' : ''">
        {{ t("AllProducts.Md") }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mx-auto w-10/12 p-3 justify-center items-center">
      <div v-for="product in filteredProducts" :key="product.id">
        <Card 
          :title="product.title"
          :author="product.author"
          :id="product.id"
          :price="product.price"
          :discount="product.discount"
          :description="product.description"
          :image="product.image"
        />
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
