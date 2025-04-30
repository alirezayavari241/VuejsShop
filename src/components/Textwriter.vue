<template>
  <h2 :class="props.class">{{ displayedText }}</h2>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  text: String,
  speed: {
    type: Number,
    default: 100,
  },
  class: {
    type: String
  }
})

const displayedText = ref('')
let interval = null

const startTyping = () => {
  displayedText.value = ''
  let index = 0
  clearInterval(interval)

  interval = setInterval(() => {
    if (index < props.text.length) {
      displayedText.value += props.text[index]
      index++
    } else {
      clearInterval(interval)
    }
  }, props.speed)
}

onMounted(() => {
  startTyping()
})

watch(() => props.text, () => {
  startTyping()
})
</script>
