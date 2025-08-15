/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://hypacode.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://hypacode.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'weekly' },
      '/about': { priority: 0.9, changefreq: 'monthly' },
      '/projects': { priority: 0.9, changefreq: 'weekly' },
      '/tools': { priority: 0.8, changefreq: 'monthly' },
      '/skills': { priority: 0.7, changefreq: 'monthly' },
      '/testimonials': { priority: 0.6, changefreq: 'monthly' },
      '/contact': { priority: 0.8, changefreq: 'monthly' },
      '/blog': { priority: 0.7, changefreq: 'daily' },
    };

    const pageConfig = customConfig[path] || { priority: 0.5, changefreq: 'monthly' };

    return {
      loc: path,
      changefreq: pageConfig.changefreq,
      priority: pageConfig.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

