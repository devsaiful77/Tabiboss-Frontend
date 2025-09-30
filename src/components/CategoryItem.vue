<template lang="html">
  <div class="categories-inner">
    <!-- Loop through CategoriesItemData if it exists -->
    <a :href="getUrl('category/'+category.slug)" @click.prevent="routerNavigator('product.by.category',category.slug)" class="single-categories mw-100 text-center">
      <div class="categories-thumb">
        <img :src="category.top_image" :alt="category.title" />
      </div>
      <h4 class="title">
        {{ category.title }}
      </h4>
    </a>
  </div>
</template>
<script>
export default {
    props: ['category']
};
</script>
