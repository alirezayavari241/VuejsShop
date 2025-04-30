<script setup>
import { useProductsStore } from '../stores/Products';
import Card from '../components/Card.vue'
import { useI18n } from 'vue-i18n';

const {t} = useI18n({ useScope: 'global' })
const productsStore = useProductsStore();
const products = productsStore.Products;
console.log(products);

</script>

<template>

    <div class="w-screen mt-8">
        <div class="text-center mx-auto pb-2 w-8/12 justify-center border-b-black border-b-2">
            <p class="text-2xl">{{ t("Mostd") }}</p>
        </div>
        <div class="flex flex-row  overflow-scroll gap-x-4 mt-4  mx-auto w-8/12 p-3">

            <div v-for="product in products" :key="product.id" v-show="product.discount>20">
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
</template>

<style scoped>
</style>
