
(() => {
    const LOCALE = 'zgs-locale'

  const getStoredLocale = () => localStorage.getItem(LOCALE)
  const setStoredLocale = locale => {
    localStorage.setItem(LOCALE, locale);
    window.location.href = `/locale/${locale}`;
  };

  const getPreferredLocale = () => {
    const storedLocale = getStoredLocale();

    if (storedLocale) {
      return storedLocale;
    }

    const browserLanguage = navigator.language;

    if (browserLanguage.startsWith('vi') || browserLanguage.startsWith('vn')) {
      return 'vi'; // Vietnamese
    } else if (browserLanguage.startsWith('cn') || browserLanguage.startsWith('zh')) {
      return 'cn'; // Chinese
    } else {
      return 'en'; // Default to English
    }
  }

  const setLocale = locale => {
    document.documentElement.setAttribute('data-locale', locale)
    const event = new Event('LocaleChange')
    document.documentElement.dispatchEvent(event)
  }

  setLocale(getStoredLocale())

  const showActiveLocale = locale => {
    const activeLocaleIcon = document.querySelector('.locale-icon-active use')
    const btnToActive = document.querySelector(`[data-locale-value="${locale}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('xlink:href')

    document.querySelectorAll('[data-locale-value]').forEach(element => {
      element.classList.remove('active');
    });

    btnToActive.classList.add('active')
    activeLocaleIcon.setAttribute('xlink:href', svgOfActiveBtn)
  }

  const handleLocaleToggleClick = event => {
    const locale = event.currentTarget.getAttribute('data-locale-value');
    setStoredLocale(locale);
    setLocale(locale);
    showActiveLocale(locale);
  };

  const initializeLocaleToggles = () => {
    document.querySelectorAll('[data-locale-value]').forEach(toggle => {
        toggle.addEventListener('click', handleLocaleToggleClick);
    });
  };

  const init = () => {
    const storedLocale = getStoredLocale() || getPreferredLocale();
    setLocale(storedLocale);
    showActiveLocale(storedLocale);
    initializeLocaleToggles();
  };

  window.addEventListener('DOMContentLoaded', init);
})()
