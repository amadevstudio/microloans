export function isBot(userAgent: string) {
  const bots = [
    /\bgooglebot\b/i,
    /Chrome-Lighthouse/i,
    /\bbingbot\b/i,
    /\bslackbot\b/i,
    /facebookexternalhit/i,
    /\btwitterbot\b/i,
    /\blinkedinbot\b/i,
    /\byandexbot\b/i,
    /\bbingpreview\b/i, // Bing preview bot
    /\bbaiduspider\b/i,
    /\bduckduckbot\b/i,
    /\bsogou\b/i,
    /\bapplebot\b/i,
    /\bsemrushbot\b/i,
    /\bahrefsbot\b/i,
    /\bmj12bot\b/i,
    /\bpinterest\b/i,
    /\buptimerobot\b/i,
    /\bsite24x7\b/i,
    /\bcrawler\b/i,
    /\bspider\b/i,
    /\brobot\b/i,
    /\bbot\b/i,
  ];

  return bots.some((bot) => bot.test(userAgent));
}
