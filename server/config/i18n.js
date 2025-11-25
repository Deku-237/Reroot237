const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

function initializeI18n() {
  i18next
    .use(Backend)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      
      backend: {
        loadPath: './server/locales/{{lng}}/{{ns}}.json'
      },
      
      interpolation: {
        escapeValue: false
      },
      
      defaultNS: 'common',
      ns: ['common', 'auth', 'errors']
    });
}

module.exports = { initializeI18n };