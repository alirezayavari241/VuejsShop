<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const {t , locale} = useI18n({ useScope: 'global' })

const props = defineProps({
  title: String,
  author: String,
  image: String,
  id: {
    type: Number,
    required: true
  },
  price: Number,
  description: String,
  stock: Number,
  discount: {
    type: Number,
    default: 0
  },
});

const router = useRouter();

const showProductDetail = () => {
  router.push(`/products/${props.id}`)
};
</script>

<template>
  <div class="card bg-white w-100 h-full shadow-sm hover:shadow-md transition-shadow text-black" >
    <figure class="relative">
      <img 
        class="w-52 h-72 object-cover hover:opacity-90 cursor-pointer transition-opacity"
        :src=image 
        :alt="title[locale] || 'img'"
        @click="showProductDetail"
      />
      <div 
        v-if="discount > 0" 
        class="absolute top-2 left-2 badge badge-error text-white"
      >
        {{ discount }}% {{ t("Card.Discount") }}</div>
    </figure>
    <div class="card-body p-4 flex flex-col justify-center align-middle items-center">
      <h3 class="card-title text-right font-semibold" dir="rtl">
        {{ title[locale] }}
      </h3>
      <h3 class="card-title text-right font-semibold" dir="rtl">
        {{ price }}{{ t("Card.Currency") }} 
      </h3>
      <div class="card-actions justify-end mt-4">
        <button 
          class="btn btn-primary px-6 py-2"
          @click.stop="showProductDetail"
        >{{ t("Card.Btn") }} </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>