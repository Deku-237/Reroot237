const i18next = require('i18next');

function translate(language, key, options = {}) {
  return i18next.t(key, { lng: language, ...options });
}

module.exports = { translate };