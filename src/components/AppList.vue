<template>
  <div class="list">
     <transition-group class="list-group grid list__grid" name="list" tag="div">
<!--    <div class="list-group grid list__grid">-->
      <template v-for="persone of list">
        <div
          class="col sc-768-12"
          :key="persone.id"
          v-if="viewMode === 'table'"
        >
          <app-table-item
            :name="persone.name[$i18n.locale]"
            :age="persone.age"
            :phone="persone.phone"
            :key="persone.id"
            :image="persone.image"
          />
        </div>

        <div
          class="col"
          :class="[persone.video ? 'sc-768-12' : 'sc-768-6']"
          :key="persone.id"
          v-if="viewMode === 'preview'"
        >
          <app-preview-item
            :name="persone.name[$i18n.locale]"
            :age="persone.age"
            :phone="persone.phone"
            :text="persone.phrase[$i18n.locale]"
            :video="persone.video"
            :image="persone.image"
          />
        </div>
      </template>
<!--    </div>-->
     </transition-group>
  </div>
</template>

<script>
import AppTableItem from './AppTableItem.vue';
import AppPreviewItem from './AppPreviewItem.vue';

export default {
  name: 'AppList',

  components: {
    AppPreviewItem,
    AppTableItem,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
    viewMode: {
      type: String,
      default: 'table',
      validator: (v) => v === 'table' || v === 'preview',
    },
  },
};
</script>

<style lang="stylus">
.list-move
  transition transform 1s

.list
  box-shadow 0 3px 3px -2px rgba(0, 0, 0, .2),
  0 3px 4px 0 rgba(0, 0, 0, .14),
  0 1px 8px 0 rgba(0, 0, 0, .12)

  &__grid
    width 100%
</style>
