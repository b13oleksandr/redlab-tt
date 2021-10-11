<template>
  <div id="app" class="app">
    <div class="app__header">
      <img src="@/assets/logo.png" alt="">
      <app-select :options="langs" v-model="$i18n.locale"/>
    </div>

    <div class="app__container">
      <app-toolbar>
        <template #left>
          <app-view-toggle
            @table="toggleViewMode('table')"
            @preview="toggleViewMode('preview')"
          />
        </template>

        <template #center>
          <app-search-form v-model="search" class="app__search-form"/>
        </template>

        <template #right>
          <app-select :options="sortOptions" v-model="sort" :label="$t('sorting.label')">
            <template #prepend>
              <img src="@/assets/icons/sort.svg" alt="">
            </template>
          </app-select>
        </template>
      </app-toolbar>

      <app-list :list="filteredList" :view-mode="viewMode"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppSelect from '@/components/AppSelect.vue';
import AppList from '@/components/AppList.vue';
import AppViewToggle from '@/components/AppViewToggle.vue';
import AppSearchForm from '@/components/AppSearchForm.vue';
import AppToolbar from '@/components/AppToolbar.vue';

export default {
  name: 'App',

  components: {
    AppToolbar,
    AppSearchForm,
    AppViewToggle,
    AppList,
    AppSelect,
  },

  data: () => ({
    langs: [
      {
        label: 'RU',
        value: 'ru',
      },
      {
        label: 'EN',
        value: 'en',
      },
    ],
    search: '',
    sort: '',
    viewMode: 'table',
  }),

  watch: {
    sort(v) {
      this.onSort(v);
    },
    search(s) {
      this.setQueryParam('search', s);
    },
    '$i18n.locale': function (l) {
      this.setQueryParam('locale', l);
    },
  },

  computed: {
    ...mapState({
      peopleList: 'peopleList',
    }),

    sortOptions() {
      return [
        {
          label: this.$t('sorting.options.id-asc'),
          value: 'id.asc',
        },
        {
          label: this.$t('sorting.options.id-desc'),
          value: 'id.desc',
        },
        {
          label: this.$t('sorting.options.age-asc'),
          value: 'age.asc',
        },
        {
          label: this.$t('sorting.options.age-desc'),
          value: 'age.desc',
        },
        {
          label: this.$t('sorting.options.name-asc'),
          value: 'name.asc',
        },
        {
          label: this.$t('sorting.options.name-desc'),
          value: 'name.desc',
        },
      ];
    },

    filteredList() {
      return this.search
        ? this.filterList()
        : this.peopleList;
    },
  },

  methods: {
    ...mapActions({
      fetchPeople: 'fetchPeopleList',
    }),

    setQueryParam(name, value) {
      this.$router.push({
        path: '/',
        query: {
          ...this.$route.query,
          [name]: value,
        },
      }).catch(() => {});
    },

    initQueryParams() {
      const {
        mode, sort, search, locale,
      } = this.$route.query;
      if (mode) this.viewMode = mode;
      if (sort) this.sort = sort;
      if (search) this.search = search;
      if (locale) this.$i18n.locale = locale;
    },

    toggleViewMode(mode) {
      this.setQueryParam('mode', mode);
      this.viewMode = mode;
    },

    onSort(sort = 'id.asc') {
      this.setQueryParam('sort', sort);

      // eslint-disable-next-line prefer-const
      let [field, type] = sort.split('.');

      if (field === 'name') {
        field += `.${this.$i18n.locale}`;
      }

      this.sortList(field, type);
    },

    sortList(field, type) {
    // eslint-disable-next-line array-callback-return,consistent-return
      this.peopleList.sort((argA, argB) => {
        const props = field.split('.');

        const a = props[1] ? argA[props[0]][props[1]] : argA[props[0]];
        const b = props[1] ? argB[props[0]][props[1]] : argB[props[0]];
        if (type === 'asc') {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        }

        if (type === 'desc') {
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        }
      });
    },

    filterList() {
      const words = this.search.toLowerCase()
        .split(' ');

      let res = [];

      // eslint-disable-next-line array-callback-return,consistent-return
      res = this.peopleList.filter((p) => {
        const names = p.name[this.$i18n.locale].toLowerCase()
          .split(' ');
        if (names[0].includes(words[0]) || (names[1] && names[1].includes(words[0]))) {
          return p;
        }
      });

      if (words[1]) {
      // eslint-disable-next-line array-callback-return,consistent-return
        res = res.filter((p) => {
          const names = p.name[this.$i18n.locale].toLowerCase()
            .split(' ');
          if (names[0].includes(words[1]) || (names[1] && names[1].includes(words[1]))) {
            return p;
          }
        });
      }

      return res;
    },
  },

  async created() {
    await this.fetchPeople();
    this.initQueryParams();
  },
};
</script>

<style lang="stylus">
.app
  &__container
    max-width 800px
    margin 0 auto
    padding 16px

  &__search-form
    @media screen and (max-width 767px)
      width 100%
      margin-top 12px

  &__header
    height 60px
    display flex
    align-items center
    justify-content space-between
    box-shadow 0 2px 4px -1px rgba(0, 0, 0, .2),
      0 4px 5px 0 rgba(0, 0, 0, .14),
      0 1px 10px 0 rgba(0, 0, 0, .12)
    margin-bottom 50px
    padding 8px 16px
</style>
