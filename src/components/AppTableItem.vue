<template>
  <transition appear name="slide-fade">
    <div class="table-item">
      <img
        :src="require(`@/assets/images/avatar/${image}.svg`)"
        :alt="name"
        class="table-item__img"
      >
      <div class="table-item__col">
        {{ name }}
      </div>
      <div class="table-item__info">
        <div class="table-item__col">
          {{ age }} {{ $tc('list.age', age) }}
        </div>
        <div class="table-item__col table-item__col--nowrap table-item__col--text-right">
          {{ phone }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppTableItem',

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
    image: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
.table-item
  display flex
  justify-content space-between
  font-size 16px
  line-height 19px
  align-items center
  min-height 44px
  padding 16px
  flex-wrap wrap
  &__img
    width 40px
    height 40px
    border-radius 50%
    margin-right 16px
  &__info
    display flex
    align-items center
    flex 1
    @media screen and (max-width 767px)
      flex 100%
      margin-top 16px
  &__col
    flex 1
    &--nowrap
      white-space nowrap
    &--text-right
      text-align right

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
