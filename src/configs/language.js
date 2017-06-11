const config = {
  countryFlagsMapping: {
    'ru-ru': '/static/img/flags/Russia.png',
    'en-en': '/static/img/flags/United-Kingdom.png',
    'de-de': '/static/img/flags/Germany.png',
    'fr-fr': '/static/img/flags/France.png',
    'es-es': '/static/img/flags/Spain.png',
    'it-it': '/static/img/flags/Italy.pn'
  },
  getFlag (countryCode) {
    return countryCode in this.countryFlagsMapping ? this.countryFlagsMapping[countryCode] : null
  }
}

export default config
