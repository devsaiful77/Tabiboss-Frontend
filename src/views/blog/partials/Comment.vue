<template lang="html">
  <div class="allReview-item m-0 border-none" v-if="comments.data">
    <h2 class="title py-15 mb-20 border-bottom">People Comments</h2>

    <!-- review Item -->
    <div
      class="review-item bg-transparent border"
      v-for="(comment, index) in comments.data"
      :key="index"
    >
      <div class="review-content">
        <div class="avatar" v-if="comment.user">
          <router-link to="#">
            <img
              :src="comment.user.profile_image"
              :alt="comment.user.full_name"
          /></router-link>
        </div>

        <div class="review-desc" v-if="comment.user">
          <h5 class="title">
            <!-- 
          <router-link :to="{ name: 'profile' }" class="url">{{
            comment.user.full_name
          }}</router-link>
           -->
            <router-link to="#">{{ comment.user.full_name }}</router-link>
          </h5>
          <div class="date">
            {{ comment.comment_date }}
            <!-- 
            <router-link :to="{ name: 'dashboard' }">
              {{ comment.comment_date }}
            </router-link>
             -->
          </div>
        </div>
      </div>
      <div class="review-para">
        <p>{{ comment.comment }}</p>
      </div>

      
      <!-- Replay -->
      <Replay
        :comment="comment"
        v-show="show_replies == comment.id"
        :blog-details="blogDetails"
        :page="page"
      />

      <!-- comment replay -->
      <form
        @submit.prevent="commentReply(comment.id)"
        class="tr-form mb-4"
        v-if="comment_reply == comment.id"
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
              :class_name="'btn btn-sm btn-primary'"
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
          v-if="alreadyLiked(comment.comment_likes)"
          href="javascript:void(0)"
          @click="unLike(comment.id)"
          :class="{ disable_btn: blog_like_loading }"
          class="avarage-reaction"
        >
          <i class="ri-thumb-up-line"></i>({{ comment.comment_likes.length }})
        </a>

        <a
          v-else
          href="javascript:void(0)"
          @click="commentLike(comment.id)"
          :class="{ disable_btn: blog_like_loading }"
          class="avarage-reaction"
        >
          <i class="ri-thumb-up-line"></i>({{ comment.comment_likes.length }})
        </a>

        <a
          class="avarage-reaction"
          v-if="comment.comment_replies.length > 0"
          href="javascript:void(0)"
          @click="showReplyArea(comment.id)"
        >
          <i class="ri-message-3-line"></i>{{ comment.comment_replies.length }}
          {{ lang.replies }}
        </a>

        <a
          href="javascript:void(0)"
          @click="comment_reply = comment.id"
          class="avarage-reaction"
        >
          <i class="ri-corner-up-right-line"></i>Reply
        </a>
      </div>

      <!-- without auth -->
      <div class="reaction-meta" v-else>
        <a href="javascript:void(0)" class="avarage-reaction">
          <i class="ri-thumb-up-line"></i>({{ comment.comment_likes.length }})
        </a>

        <a
          class="avarage-reaction"
          v-if="comment.comment_replies.length > 0"
          href="javascript:void(0)"
          @click="showReplyArea(comment.id)"
        >
          <i class="ri-message-3-line"></i>{{ comment.comment_replies.length }}
          {{ lang.replies }}
        </a>

        <a
          href="javascript:void(0)"
          class="avarage-reaction"
        >
          <i class="ri-corner-up-right-line"></i>Reply
        </a>
      </div>
    </div>

    <!-- load more review items -->
    <div
      class="review-item bg-transparent border"
      v-if="comments.next_page_url"
    >
      <div class="text-center show-more">
        <loading_button
          v-if="loading"
          :class_name="'btn btn-primary'"
        ></loading_button>
        <a
          href="javascript:void(0)"
          v-else
          @click="loadMoreComments()"
          class="btn btn-primary"
          >{{ lang.show_more }}</a
        >
      </div>
    </div>
    <!-- end div -->
  </div>
</template>

<script>
import Replay from "./Replay.vue";
export default {
  components: { Replay },
  props: ["comments", "blogDetails"],
  data() {
    return {
      comment_reply: "",
      page: 1,
      show_replies: "",
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

  methods: {
    commentReply(id, parent_id, level) {
      this.loading = true;
      this.replyForm.blog_comment_id = id;
      if (parent_id) {
        this.replyForm.parent_id = parent_id;
      }
      if (level || level == 0) {
        this.replyForm.level = level + 1;
      }
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
            this.comment_reply = "";
            if (response.data.success) {
              this.$toast.success(response.data.success, this.lang.Success + " !!");
            }
          }
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    loadMoreComments() {
      this.page++;
      let url = this.getUrl(
        "load/blog-comments/" + this.blogDetails.id + "?page=" + this.page
      );

      axios.get(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          let comments = response.data.comments.data;

          if (comments.length > 0) {
            for (let i = 0; i < comments.length; i++) {
              this.comments.data.push(comments[i]);
            }
          }
        }
        this.comments.next_page_url = response.data.comments.next_page_url;
      });
    },
    showReplyArea(id) {
      if (this.show_replies == id) {
        this.show_replies = "";
      } else {
        this.show_replies = id;
      }
    },
    commentLike(id) {
      let data = {
        paginate: this.page,
        id: id,
        blog_id: this.blogDetails.id,
      };
      this.blog_like_loading = true;

      let url = this.getUrl("blog/like-comments");
      axios
        .post(url, data)
        .then((response) => {
          this.blog_like_loading = false;

          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.comments.data = response.data.comments.data;
            this.comments.next_page_url = response.data.comments.next_page_url;
            this.comments.total = response.data.comments.total;
            if (response.data.success) {
              this.$toast.success(response.data.success, this.lang.Success + " !!");
            }
          }
        })
        .catch((error) => {
          this.blog_like_loading = false;
        });
    },
    unLike(id) {
      let data = {
        paginate: this.page,
        id: id,
        blog_id: this.blogDetails.id,
      };
      this.blog_like_loading = true;
      let url = this.getUrl("blog/unlike-comments");
      axios
        .post(url, data)
        .then((response) => {
          this.blog_like_loading = false;

          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.comments.data = response.data.comments.data;
            this.comments.next_page_url = response.data.comments.next_page_url;
            this.comments.total = response.data.comments.total;
            if (response.data.success) {
              this.$toast.success(response.data.success, this.lang.Success + " !!");
            }
          }
        })
        .catch((error) => {
          this.blog_like_loading = false;
        });
    },
  },
};
</script>
