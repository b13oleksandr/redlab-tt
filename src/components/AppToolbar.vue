<template>
  <div class="toolbar">
    <div class="toolbar__col toolbar__col--left">
      <slot name="left" />
    </div>
    <div class="toolbar__col toolbar__col--center">
      <slot name="center" />
    </div>
    <div class="toolbar__col toolbar__col--right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppToolbar',
};
</script>

<style lang="stylus" scoped>
.toolbar
  box-shadow 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)
  background #e91e63 // prod bug. TODO fix
  //background $color-primary
  color #fff
  border-radius 4px 4px 0 0
  display flex
  flex-wrap wrap
  justify-content space-between
  align-items center
  padding 16px
  &__col
    flex 1
    display flex
    align-items center
    &--left
      justify-content flex-start
    &--center
      justify-content center
      @media screen and (max-width 767px)
        flex 100%
        order 4
    &--right
      justify-content flex-end

</style>
