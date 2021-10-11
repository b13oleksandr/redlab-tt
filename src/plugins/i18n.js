import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

Vue.use(VueI18n);

// eslint-disable-next-line import/prefer-default-export
export const i18n = new VueI18n({
  locale: 'ru',

  messages: {
    en,
    ru,
  },

  pluralizationRules: {
    ru(choice, choicesLength) {
      // this === VueI18n instance, so the locale property also exists here

      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return (choicesLength < 4) ? 2 : 3;
    },
  },
});
