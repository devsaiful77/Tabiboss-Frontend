<template lang="html">
    <div>
        <!-- CtaBox Section Start -->
        <section class="ctaBox__section py-30">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="ctaBox__wrapper" :style="{ backgroundImage: `url(${getUrl('images/others/cta-banner.jpg')})` }">
                            <div class="content">
                                <div class="icon">
                                    <img :src="getUrl('images/others/mobile-icon.svg')" alt="icon" />
                                </div>
                                <h5 class="desc">
                                    {{ download_section.text }}
                                </h5>
                            </div>
                            <div class="btn__group">
                                <a :href="download_section.play_store">
                                    <img :src="getUrl('images/others/play-logo.png')" :alt="download_section.text" class="img-fluid"/>
                                    Google Play
                                </a>
                                <a :href="download_section.apple_store">
                                    <img :src="getUrl('images/others/app-logo.png')" :alt="download_section.text" class="img-fluid"/>
                                    App Store
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- CtaBox Section End -->
    </div>
</template>

<script>
import Shimmer from '@/components/Shimmer.vue';
export default {
    props: ["download_section"],
    components: {
        Shimmer,
    },

}
</script>

<style scoped>
    /*********************************
    /*  CtaBox Section Start
    *********************************/
    .ctaBox__wrapper {
      display: flex;
        align-items: center;
        justify-content: space-between;
      gap: 20px;
      background: var(--color-primary);
      border-radius: var(--radius);
      padding: 20px;
        background-size: cover;
        background-position: center right;
    }
    @media screen and (max-width: 767px) {
      .ctaBox__wrapper {
                flex-direction: column;
      }
    }
    .ctaBox__wrapper .content {
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 1;
    }
    @media screen and (max-width: 767px) {
      .ctaBox__wrapper .content {
        text-align: center;
        flex-direction: column;
      }
    }
    .ctaBox__wrapper .content .icon {
      width: 40px;
      height: 40px;
      background: rgba(var(--color-white-rgb), 0.2);
      border-radius: 50%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }
    .ctaBox__wrapper .content .icon img {
      width: auto;
      max-width: 20px;
    }
    .ctaBox__wrapper .content .desc {
      font-size: 20px;
      line-height: 26px;
      color: var(--color-white);
      margin: 0;
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      font-weight: var(--font-regular);
    }
    @media screen and (max-width: 1399px) {
      .ctaBox__wrapper .content .desc {
        font-size: 18px;
      }
    }
    @media screen and (max-width: 991px) {
      .ctaBox__wrapper .content .desc {
        font-size: 16px;
        line-height: 22px;
      }
    }
    .ctaBox__wrapper .btn__group {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      gap: 16px;
    }
    .ctaBox__wrapper .btn__group a {
      font-family: var(--font-default);
      font-weight: var(--font-regular);
      font-size: 16px;
      line-height: 26px;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      gap: 4px;
      padding: 6px 16px;
      color: var(--color-white);
      border-radius: 30px;
      background: rgba(var(--color-white-rgb), 0.1);
    }
    .ctaBox__wrapper .btn__group a img {
      width: 20px;
      height: auto;
    }
    @media screen and (max-width: 375px) {
      .ctaBox__wrapper .btn__group a {
        padding: 6px 12px;
      }
    }

    /*********************************
    /*  CtaBox Section End
    *********************************/
</style>
