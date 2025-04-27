<template>
    <h2 class={{class}}>{{ displayedText }}</h2>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    text: String,
    speed: {
      type: Number,
      default: 100, 
    },
    class:{
        type:String
    }
  })
  
  const displayedText = ref('')
  let index = 0
  
  onMounted(() => {
    const interval = setInterval(() => {
      if (index < props.text.length) {
        displayedText.value += props.text[index]
        index++
      } else {
        clearInterval(interval)
      }
    }, props.speed)
  })
  </script>
  