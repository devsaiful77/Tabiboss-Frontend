<template lang="html">
  <div>
    <div class="sub-replay">
      <div class="review-item">
        <div class="replay">
          <a href="#" class="avarage-reaction">
            <i class="ri-corner-left-up-line"></i>Reply
          </a>
        </div>
        <div class="div">
          <div class="review-content">
            <div class="avatar">
              <img :src="static_image_url + 'blog/blog-02.jpg'" alt="avatar" />
            </div>
            <div class="review-desc">
              <h5 class="title">
                <a href="#">Esther Howard</a>
              </h5>
              <div class="date">03 December, 2022</div>
            </div>
          </div>
          <div class="review-para">
            <p>
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duislingue deserunt mollit dolore cillum minim
              tempor enim. Elit aute irure tempor cupidatat incididunt sint
              deserunt ut voluptat idtwedou deserunt nisi.
            </p>
          </div>
        </div>
      </div>
      <div class="review-item">
        <div class="replay">
          <a href="#" class="avarage-reaction">
            <i class="ri-corner-left-up-line"></i>Reply
          </a>
        </div>
        <div class="div">
          <div class="review-content">
            <div class="avatar">
              <img :src="static_image_url + 'blog/blog-03.jpg'" alt="avatar" />
            </div>
            <div class="review-desc">
              <h5 class="title">
                <a href="#">Esther Howard</a>
              </h5>
              <div class="date">03 December, 2022</div>
            </div>
          </div>
          <div class="review-para">
            <p>
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duislingue deserunt mollit dolore cillum minim
              tempor enim. Elit aute irure tempor cupidatat incididunt sint
              deserunt ut voluptat idtwedou deserunt nisi.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
    };
  },
};
</script>
<style lang=""></style>
