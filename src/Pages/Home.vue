<script setup>
    import Navbar from '../components/Ui/Navbar.vue';
    import Hero from '../components/Ui/Hero.vue';
    import Productslist from '../components/Productslist.vue';
    import FooterComponent from '../components/Ui/FooterComponent.vue';

</script>

<template>
    <div class="flex w-screen h-fit">
        <div class="flex w-screen fixed top-0 z-50">
            <Navbar/>
        </div>
        <Hero/>
    </div>
    <div class="">

        <Productslist/>
    </div>
    <FooterComponent/>
</template>

<style scoped>

</style>