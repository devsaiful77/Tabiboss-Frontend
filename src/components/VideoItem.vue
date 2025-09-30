<template lang="html">
    <div class="videoCard" v-if="video">
        <div class="videoCard__thumb">
            <router-link :to="{ name : 'video.shopping.details',params : { slug : video.slug } }"><img
                :src="video.thumbnail" :alt="video.title" class="img-fluid"></router-link>
        </div>
        <div class="videoCard__details">
            <div class="creators__top">
                <div class="creator">
                    <img :src="video.profile_image" alt="">
                    <p>{{ video.full_name}}</p>
                </div>
                <span class="base" v-if="video.is_live">{{ lang.live }}</span>
            </div>
            <router-link :to="{ name : 'video.shopping.details',params : { slug : video.slug } }"
                class="playIcon"><span class="mdi mdi-name mdi-play"></span>
            </router-link>
            <p class="video-title">{{ video.title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: ['video']
}
</script>

<style scoped>
    .videoCard {
        position: relative;
        min-height: 400px;
        margin-bottom: 20px;
    }
    .videoCard .videoCard__thumb {
        border-radius: 10px;
        aspect-ratio: 3 / 5.3;
    }

     @media (max-width: 1199px) {
        .videoCard .videoCard__thumb {
            aspect-ratio: 3 / 5.5;
        }
    }


    @media (max-width: 991px) {
        .videoCard .videoCard__thumb {
            aspect-ratio: 3 / 5;
        }
    }


    @media (max-width: 575px) {
        .videoCard {
            min-height: 250px;
        }
        .videoCard .videoCard__thumb {
            aspect-ratio: 2 / 2.4;
        }

    }

    .videoCard .videoCard__thumb img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 10px;
        object-fit: cover;
    }

    .videoCard .videoCard__details {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background: #00000070; */
        border-radius: 10px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .videoCard .creators__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        width: 100%;
    }

    .videoCard .creators__top .base {
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.5px;
        color: #fff;
        background: #FF0008;
        border-radius: 30px;
        padding: 3px 10px;

    }

    .videoCard .creator {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .videoCard .creator img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .videoCard .creator p {
        font-weight: 600;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.5px;
        color: #fff;
        margin: 0;

    }

    .videoCard .playIcon {
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
        animation: pulse-animation 2s infinite;
    }

    .videoCard .video-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.5px;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
        width: 100%;
        text-align: center;
        border-radius: 30px;
        padding: 8px 10px;
        margin: 0;
        backdrop-filter: blur(10px);
    }

    @keyframes pulse-animation {
      0% {
        box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.3);
      }
      100% {
        box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
      }
    }
</style>
