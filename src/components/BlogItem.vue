<template>
  <!-- Blog Item Start -->
  <div :class="['blogPost-item', loading ? 'skeleton' : '']">
    <div class="blog-figure">
      <img :src="static_image_url + blog.blog_thumb" :alt="blog.blog_title" />
      <div class="post-date">{{ blog.blog_date }}</div>
    </div>
    <div class="blog-content">
      <h4 class="title">
        <router-link to="#">{{ blog.blog_title }}</router-link>
      </h4>
      <div class="blog-meta">
        <span v-for="(category, index) in blog.blog_categories" :key="index">
          <a href="#">{{ category }}</a>
        </span>
      </div>
      <div class="blog-btn">
        <router-link class="btn btn-primary" to="#">{{
          blog.blog_BtnText
        }}</router-link>
        <a href="#" class="admin"
          ><i class="ri-user-line"></i>{{ blog.blog_author }}</a
        >
      </div>
    </div>
  </div>
  <!-- Blog Item End -->
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const static_image_url = "";

// Define props using defineProps
const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

// State for loading
const loading = ref(true);

// Simulate data loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false; // Set loading to false after data is ready
  }, 1500); // 2-second simulated delay
});
</script>
