const puppeteer = require('puppeteer');

const requestParams = JSON.parse(process.argv[2]);

async function render() {
  const defaultParams = {
	cookies: [],
	scrollPage: false,
	emulateScreenMedia: true,
	ignoreHttpsErrors: false,
	html: null,
  };

  const params = Object.assign({}, defaultParams, requestParams);

  if (params.pdf.width && params.pdf.height) {
	  params.pdf.format = undefined;
  }

  const launchParams = {
    ignoreHTTPSErrors: params.ignoreHttpsErrors,
    args: [
        '--disable-gpu',
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--font-render-hinting=none',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
    ].concat(params.launchArgs || []),
  };

  if (params.cacheDir) {
      launchParams.userDataDir = params.cacheDir;
  }

  const browser = await puppeteer.launch(launchParams);
  const page = await browser.newPage();

  try {
    await page.setViewport(params.viewport);
    if (params.emulateScreenMedia) {
      await page.emulateMediaType('screen');
    }
    params.cookies.map(async (cookie) => {
      await page.setCookie(cookie);
    });

    if (params.html) {
      await page.goto(`data:text/html,${params.html}`, params.goto);
    } else {
      await page.goto(params.url, params.goto);
    }

    await page.pdf(params.pdf);
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
}

render();
