const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });
    config.externals.push('dtrace-provider');
    config.externals.push('fs');

    return config;
  },

  poweredByHeader: false,
};

if (process.env.ANALYZE && process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

  module.exports = withBundleAnalyzer({ ...nextConfig });
} else module.exports = { ...nextConfig };
