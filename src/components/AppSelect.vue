<template>
  <div class="select">
    <div v-if="$slots.prepend" class="select__prepend" @click="onSelectedClick">
      <slot name="prepend" />
    </div>

    <div class="select__selected" @click="onSelectedClick">
      {{ selectedLabel && selectedLabel.label || label }}
    </div>
    <transition name="slide-fade">
      <div class="select__list" v-if="showList">
        <div
          class="select__item"
          v-for="option of options"
          :key="option.value"
          @click="onOptionClick(option.value)">
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    showList: false,
  }),

  computed: {
    selectedLabel() {
      return this.options.find((o) => o.value === this.value);
    },
  },

  methods: {
    onOptionClick(v) {
      this.showList = false;
      this.$emit('input', v);
    },

    onSelectedClick() {
      this.showList = !this.showList;
    },
  },
};
</script>

<style lang="stylus" scoped>
.select
  position relative
  user-select none
  cursor pointer
  display flex
  align-items center
  &__slected
    height 40px
    display flex
    align-items center
    padding 0 16px
  &__list
    position absolute
    z-index 1000
    top 30px
    right 0
    background #fff
    border-radius 4px
    min-width 100%
    box-shadow 0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12)
    color #000
  &__item
    padding 16px
    white-space nowrap
    transition .3s
    &:hover
      background-color alpha(#e91e63, .3)
  &__prepend
    margin-right 8px

  .slide-fade-enter-active
    transition all .3s ease

  .slide-fade-leave-active
    transition all .8s

  .slide-fade-enter
  .slide-fade-leave-to
    transform translateY(10px)
    opacity: 0
</style>
