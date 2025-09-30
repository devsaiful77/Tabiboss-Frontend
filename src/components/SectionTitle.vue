<template>
    <!-- Section Title Start -->
    <div class="section-title">
        <div class="wrap">
            <h2 class="title" v-if="item.sec_title">
                <img v-if="item.sec_titleIcon" :src="item.sec_titleIcon" :alt="item.sec_title">
                {{ item.sec_title }}
            </h2>
            <h4 class="subtitle" v-if="item.sec_subtitle" v-html="item.sec_subtitle"></h4>
        </div>
        <div class="section-btn">
            <!-- <a href="#" v-if="item.sec_buttonTxt" class="solid-btn">{{ item.sec_buttonTxt }}</a> -->
            <router-link :to="item.sec_buttonLink" v-if="item.sec_buttonTxt" class="solid-btn">{{ item.sec_buttonTxt }}</router-link>
        </div>
    </div>
    <!-- Section Title End -->
</template>


<script setup>
    import { defineProps } from 'vue';

    // Define props with the Composition API
    const props = defineProps({
        item: {
            type: Object,
            required: true
        }
    });
</script>