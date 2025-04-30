<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount,computed ,watch } from 'vue';
import { useDeviceStore } from '../../stores/Devices';
import { useCartStore } from '../../stores/Cartstore';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, availableLocales,locale } = useI18n({ useScope: 'global' })

watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
})
const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const router = useRouter();

const searchInput = ref(null);

const uniqueItemsCount = computed(() => {
  return new Set(cartStore.cartItems.map(item => item.id)).size;
});

const checkScreenSize = () => {
  deviceStore.isMobile = window.innerWidth < 768;
};

const toggleSearch = () => {
  if (deviceStore.isMobile) {
    deviceStore.showSearch = true;
  } else {
    deviceStore.showSearch = !deviceStore.showSearch;
    if (deviceStore.showSearch) {
      nextTick(() => {
        searchInput.value?.focus();
      });
    } else {
      deviceStore.searchQuery = '';
    }
  }
};

const closeModal = () => {
  deviceStore.showSearch = false;
  deviceStore.searchQuery = '';
};


onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="navbar bg-alireza shadow-sm w-screen fixed top-0 left-0 z-50">
    <div class="navbar-start">
      <ul class="menu menu-horizontal rounded-box">
        <li>
          <router-link to="/">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="navbar-center">
      <router-link to="/" ><p class="text-white text-xl hover:cursor-pointer"> {{t("nav.Name")}} </p></router-link>
    </div>

    <div class="navbar-end xl:space-x-6 sm:space-x-2">
      <div v-if="!deviceStore.isMobile" class="relative flex items-center">
        <div
          :class="deviceStore.showSearch ? 'w-48 opacity-100' : 'w-0 opacity-0'"
          class="flex items-center overflow-hidden transition-all duration-300"
        >
          <label class="flex items-center bg-white/10 rounded-full px-3 py-2">
            <svg class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              ref="searchInput"
              v-model="deviceStore.searchQuery"
              @keyup.enter="performSearch"
              type="search"
              :placeholder="(t('nav.Search'))"
              class="bg-transparent border-none focus:outline-none text-white placeholder-white/70 w-full ml-2"
            />
          </label>
        </div>
        <button @click="toggleSearch"
          class="btn btn-ghost btn-circle text-white hover:bg-white/10 transition-transform duration-200 hover:scale-110">
          <svg v-if="!deviceStore.showSearch" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-else>
        <button @click="toggleSearch"
          class="btn btn-ghost btn-circle text-white hover:bg-white/10 transition-transform duration-200 hover:scale-110">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <div v-if="deviceStore.showSearch"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg w-full max-w-md p-4">
            <div class="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-4">
              <svg class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                ref="searchInput"
                v-model="deviceStore.searchQuery"
                @keyup.enter="performSearch"
                type="search"
                :placeholder="(t('nav.Search'))" 
                class="bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 w-full ml-2"
                autofocus
              />
            </div>
            <div class="flex justify-end">
              <button @click="closeModal" class="btn btn-sm btn-ghost text-gray-700">{{ t("nav.Cancel") }}</button>
              <button  :disabled="!deviceStore.searchQuery.trim()"
                class="btn btn-sm btn-primary ml-2">{{t("nav.Search")}}</button>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/cart" class="btn btn-ghost btn-circle mr-5">
        <div class="indicator">
          <img src="../../assets/carticon.png" class="h-6 w-6" />
          <span v-if="uniqueItemsCount > 0" class="badge badge-xs badge-primary indicator-item mr-5">{{ uniqueItemsCount }}</span>
        </div>
      </router-link>
          <div class="relative ml-2 mr-5">
            <select
              v-model="locale"
              class="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            >
              <option
                v-for="localeOption in availableLocales"
                :key="`locale-${localeOption}`"
                :value="localeOption"
                class="text-black"
              >
                {{ localeOption }}
              </option>
            </select>
           </div>
      </div>
   </div>
</template>

<style scoped>
.btn-ghost {
  transition: all 0.2s ease-out;
}

.btn-ghost:hover {
  transform: scale(1.1);
}
select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  padding-right: 2rem;
}

</style>
