<template>
  <div class="view-toggle">
    <div @click="onTable" class="view-toggle__item" :title="$t('toolbar.view-mode.table')">
      <img src="@/assets/icons/table.svg" alt="">
    </div>
    <div @click="onPreview" class="view-toggle__item" :title="$t('toolbar.view-mode.preview')">
      <img src="@/assets/icons/list.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppViewToggle',

  methods: {
    onTable() {
      this.$emit('table');
    },
    onPreview() {
      this.$emit('preview');
    },
  },
};
</script>

<style lang="stylus" scoped>
.view-toggle
  display flex
  align-items center
  &__item
    cursor pointer
    &:not(:last-child)
      margin-right 12px
</style>
