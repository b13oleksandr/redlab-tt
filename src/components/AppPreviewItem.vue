<template>
<!--  <transition appear name="slide-fade">-->
    <div class="preview-item">
      <div class="preview-item__col">
        <div class="preview-item__info">
          <div class="preview-item__header">
            <img
              :src="require(`@/assets/images/avatar/${image}.svg`)"
              :alt="name"
              class="preview-item__img">
            <div class="preview-item__name">
              {{ name }}
            </div>
          </div>

          <div class="preview-item__row">
            {{ age }} {{ $tc('list.age', age) }}
          </div>
          <div class="preview-item__row">
            {{ phone }}
          </div>
          <div class="preview-item__row">
            {{ text }}
          </div>
        </div>
      </div>

      <div v-if="video" class="preview-item__col">
        <video
          controls
          width="250"
          class="preview-item__video"
          ref="video"
        >
          <source :src="require(`@/assets/video/${video}.mp4`)"
                  type="video/mp4">

          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </div>
<!--  </transition>-->
</template>

<script>
export default {
  name: 'AppPreviewItem',

  props: {
    name: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },

  mounted() {
    const options = {
      root: null,
      rootMargin: '-50% 0% -50% 0%',
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (this.$refs.video) {
      observer.observe(this.$refs.video);
    }
  },
};
</script>

<style lang="stylus">
.preview-item
  display flex
  font-size 16px
  line-height 19px
  padding 16px
  flex-wrap wrap

  &__header
    margin-bottom 24px
    display flex
    align-items center

  &__img
    width 40px
    height 40px
    border-radius 50%
    margin-right 16px

  &__col
    flex 1
    @media screen and (max-width 767px)
      margin-bottom 16px
      flex 100%

  &__row
    &:not(:last-child)
      margin-bottom 16px

  &__video
    height 100%
    width 100%

.appear-move {
  transition: transform .3s;
}

.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all 1.6s
}
.slide-fade-enter
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
