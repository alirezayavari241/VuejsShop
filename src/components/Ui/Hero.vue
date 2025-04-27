<template>
    <div class="hero m h-[500px]" style="background-image: url(https://t4.ftcdn.net/jpg/08/18/94/75/360_F_818947535_SWxfEr9ds2Zmnl8wULnhLQqWU8vvzMXx.jpg);">
            <div class="hero-overlay"></div>
             <div class="hero-content text-neutral-content text-center">
              <div class="max-w-md">
               <h1 class="mb-5 text-5xl font-bold"><Textwriter text="فلان شاپ" :speed="80"/>
               </h1>
                <p class="mb-5">
                    <Textwriter text="مرجع تخصصی پخش انواع محصولات" :speed="15"/>
                 </p>
      <router-link to="/products"><button class="btn btn-primary">مشاهده لیست محصولات</button></router-link>
    </div>
  </div>
</div>
</template>

<script setup>
    import Textwriter from '../Textwriter.vue';

</script>