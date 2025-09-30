<template>
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                        <ul class="list">
                            <li
                                v-for="(breadcrumb, index) in breadcrumbList"
                                :key="index"
                                @click="navigate(index)"
                                :class="{ linked: !!breadcrumb.link }"
                            >
                                {{ breadcrumb.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const breadcrumbList = ref([]);
const route = useRoute();
const router = useRouter();

const updateList = () => {
    breadcrumbList.value = route.meta.breadcrumb || [];
};

const navigate = (index) => {
    const link = breadcrumbList.value[index]?.link;
    if (link) {
        router.push(link);
    }
};

onMounted(updateList);

watch(route, updateList);
</script>
