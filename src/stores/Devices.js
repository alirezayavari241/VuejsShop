import { defineStore } from 'pinia';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(false);
  const showSearch = ref(false);
  const searchQuery = ref('');

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768; 
  };

  const toggleSearch = () => {
    if (isMobile.value) {
      showSearch.value = true;
    } else {
      showSearch.value = !showSearch.value;
    }
  };

  const closeSearch = () => {
    showSearch.value = false;
    searchQuery.value = '';
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return {
    isMobile,
    showSearch,
    searchQuery,
    toggleSearch,
    closeSearch
  };
});