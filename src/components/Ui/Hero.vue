<template>
    <div class="hero m h-[500px]" style="background-image: url(https://www.bates.edu/wordpress/files/2016/07/gradient1.jpg)">
            <div class="hero-overlay"></div>
             <div class="hero-content text-neutral-content text-center">
              <div class="max-w-md">
               <h1 class="mb-5 text-5xl font-bold"><Textwriter :text="t('Shopname')" :speed="80"/>
               </h1>
                <p class="mb-5">
                    <Textwriter :text="t('ShopDescription')" :speed="15"/>
                 </p>
      <router-link to="/products"><button class="btn btn-primary">{{ t('ShowAllProductsbtn') }}</button></router-link>
    </div>
  </div>
</div>
</template>

<script setup>
    import Textwriter from '../Textwriter.vue';
    import { useI18n } from 'vue-i18n';
    const { t } =useI18n()
</script>