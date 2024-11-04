export function isBot(userAgent: string) {
  const bots = [
    /googlebot/i, // Googlebot
    /pagespeed/i, // Google PageSpeed Insights
    /bingbot/i, // Bingbot
    /slackbot/i, // Slackbot
    /facebookexternalhit/i, // Facebook External Hit
    /twitterbot/i, // Twitterbot
    /linkedinbot/i, // LinkedIn Bot
    /yandexbot/i, // Yandex Bot
    /crawler/i, // Generic crawler
    /spider/i, // Generic spider
    /robot/i, // Generic robot
    /bot/i, // Generic bot
  ];

  return bots.some((bot) => bot.test(userAgent));
}
