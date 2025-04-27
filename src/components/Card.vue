<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  author: String,
  image: String,
  id: {
    type: Number,
    required: true
  },
  price: String,
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
  <div class="card bg-base-100 w-100 h-full shadow-sm hover:shadow-md transition-shadow">
    <figure class="relative">
      <img 
        class="w-52 h-72 object-cover hover:opacity-90 cursor-pointer transition-opacity"
        :src=image 
        :alt="title || 'محصول'"
        @click="showProductDetail"
      />
      <div 
        v-if="discount > 0" 
        class="absolute top-2 left-2 badge badge-error text-white"
      >
        {{ discount }}% تخفیف
      </div>
    </figure>
    <div class="card-body p-4 flex flex-col justify-center align-middle items-center">
      <h3 class="card-title text-right font-semibold" dir="rtl">
        {{ title }}
      </h3>
      <div class="card-actions justify-end mt-4">
        <button 
          class="btn btn-primary px-6 py-2"
          @click.stop="showProductDetail"
        >
          مشاهده جزئیات
        </button>
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