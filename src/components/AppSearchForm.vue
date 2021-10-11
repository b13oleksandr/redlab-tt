<template>
  <div class="search-from">
    <img src="@/assets/icons/search.svg" alt="" class="search-from__icon">
    <input
      :placeholder="$t('search.placeholder')"
      type="text"
      :value="value"
      class="search-from__input"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  name: 'AppSearchForm',

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    onInput({ target: { value } }) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.search-from
  display flex
  align-items center
  margin-right 12px
  &__icon
    margin-right -24px
  &__input
    padding-left 32px
    &::placeholder
      color alpha(#fff, .6)
</style>
