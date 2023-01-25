const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// next.config.js
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});

