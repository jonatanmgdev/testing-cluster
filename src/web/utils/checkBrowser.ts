export default function checkBrowser() : BrowserType {
  const browser = navigator.userAgent.toUpperCase();

  const browserTypes: { [key: string]: BrowserType } = {
    'CHROME': BrowserType.chrome,
    'FIREFOX': BrowserType.firefox,
    'SEAMONKEY': BrowserType.seamonkey,
    'CHROMIUM': BrowserType.chromium,
    'SAFARI': BrowserType.safari,
  };

  for (const [browserString, type] of Object.entries(browserTypes)) {
    if (browser.includes(browserString)) {
      return type;
    }
  }

  return BrowserType.unknown;
}

export enum BrowserType {
  chrome = 'CHROME',
  firefox = 'FIREFOX',
  seamonkey = 'SEAMONKEY',
  chromium = 'CHROMIUM',
  safari = 'SAFARI',
  unknown = 'UNKNOWN'
}
