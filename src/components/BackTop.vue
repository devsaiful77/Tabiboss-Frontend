<template>
    <div class="scrollTop" :class="{ active: showButton }"  @click="scrollToTop">
        <i class="ri-skip-up-line"></i>
    </div>
</template>
  

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

    const showButton = ref(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        showButton.value = window.scrollY > 300;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>
