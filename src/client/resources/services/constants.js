export default {
    API_URL:
        __ENV__ === 'production'
            ? 'http://localhost:' + __PORT__
            : 'http://localhost:' + __PORT__,
    SUPPORTED_LANGUAGES: [
        { i18nLabel: 'fr', label: 'Français' },
        { i18nLabel: 'en', label: 'English' }
    ]
};
