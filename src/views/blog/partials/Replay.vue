<template lang="html">
  <div>
    <div class="sub-replay">
      <div
        class="review-item"
        v-for="(reply, index) in comment.comment_replies"
        :key="'reply' + index"
      >
        <div class="replay">
          <a href="#" class="avarage-reaction">
            <i class="ri-corner-left-up-line"></i>Reply
          </a>
        </div>
        <div class="div">
          <div class="review-content">
            <div class="avatar" v-if="reply.user">
              <router-link :to="{ name: 'dashboard' }"
                ><img
                  :src="reply.user.profile_image"
                  :alt="reply.user.full_name"
              /></router-link>
            </div>
            <div class="review-desc" v-if="reply.user">
              <h5 class="title">
                <router-link :to="{ name: 'dashboard' }">{{
                  reply.user.full_name
                }}</router-link>
              </h5>
              <div class="date">{{ reply.reply_date }}</div>
            </div>
          </div>
          <div class="review-para">
            <p>
              {{ reply.comment }}
            </p>
          </div>

          <!-- comment form -->
          <!-- comment replay -->
          <form
            @submit.prevent="commentReply(comment.id, reply.id, reply.level)"
            class="tr-form mb-4"
            v-if="replyFormId == reply.id"
          >
            <div class="row">
              <div class="col-10">
                <div class="form-group">
                  <textarea
                    class="form-control reply_box"
                    required="required"
                    rows="2"
                    :placeholder="lang.write_reply"
                    v-model="replyForm.comment"
                  ></textarea>
                </div>
              </div>
              <div class="col-2">
                <loading_button
                  v-if="loading"
                  :class_name="'btn btn-primary'"
                ></loading_button>
                <input
                  type="submit"
                  v-else
                  class="btn btn-primary"
                  :value="lang.post"
                />
              </div>
            </div>
          </form>

          <!-- comment section ends here with auth -->
          <div class="reaction-meta" v-if="authUser">
            <a
              v-if="alreadyLiked(reply.comment_likes)"
              href="javascript:void(0)"
              @click="unLike(reply.id, comment.id)"
              :class="{ disable_btn: blog_like_loading }"
              class="avarage-reaction"
            >
              <i class="ri-thumb-up-line"></i>({{ reply.comment_likes.length }})
            </a>

            <a
              v-else
              href="javascript:void(0)"
              @click="likeReply(reply.id, comment.id)"
              :class="{ disable_btn: blog_like_loading }"
              class="avarage-reaction"
            >
              <i class="ri-thumb-up-line"></i>({{ reply.comment_likes.length }})
            </a>

            <a
              href="javascript:void(0)"
              @click="$store.dispatch('replyForm', reply.id)"
              class="avarage-reaction"
            >
              <i class="ri-corner-up-right-line"></i>Reply
            </a>
          </div>

          <!-- without auth -->
          <div class="reaction-meta" v-else>
            <a href="javascript:void(0)" class="avarage-reaction">
              <i class="ri-thumb-up-line"></i>({{ reply.comment_likes.length }})
            </a>

            <a href="javascript:void(0)" class="avarage-reaction">
              <i class="ri-corner-up-right-line"></i>Reply
            </a>
          </div>

          <!-- end comment box -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NestedReplay from "./NestedReplay.vue";
export default {
  components: { NestedReplay },
  props: ["comment", "blogDetails", "page"],
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      loading: false,
      replyForm: {
        comment: "",
        blog_comment_id: "",
        parent_id: "",
        level: 0,
        slug: this.$route.params.slug,
      },
    };
  },

  computed: {
    replyFormId() {
      return this.$store.getters.getReplyForm;
    },
  },

  methods: {
    commentReply(id, parent_id, level) {
      this.loading = true;
      this.replyForm.blog_comment_id = id;
      if (parent_id) {
        // this.replyForm.parent_id = parent_id;
        this.replyForm.blog_comment_id = id;
        this.replyForm.level = 0;
      }
      // if (level || level == 0) {
      //     this.replyForm.level = level + 1;
      // }
      let url = this.getUrl("store/blog-comment-reply");
      axios
        .post(url, this.replyForm)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.replyForm.comment = "";
            this.$store.dispatch("blogDetails", this.$route.params.slug);
            this.$store.dispatch("replyForm", "");
            if (response.data.success) {
              this.$toast.success(
                response.data.success,
                this.lang.Success + " !!"
              );
            }
          }
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang=""></style>
