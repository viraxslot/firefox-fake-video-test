import { firefox, chromium } from '../node_modules/playwright/index';
import { expect } from 'chai';
const config = require('config');

let browser, ctx, page;

describe.only('suite', function () {
    function delay(seconds) {
        return new Promise(function (res) {
            setTimeout(res, seconds * 1000);
        });
    }

    before('init', async function () {
        browser = await firefox.launch(config.get('firefoxOptions'));
        // browser = await chromium.launch(config.get('chromiumOptions'));
        ctx = await browser.newContext();
        page = await ctx.newPage();
    });

    it('video test', async function () {
        const showVideo = '#showVideo';
        const gumLocal = '#gum-local';

        await page.goto('https://webrtc.github.io/samples/src/content/getusermedia/gum/');
        await page.waitForSelector('text=WebRTC samples');
        await page.click(showVideo);

        await delay(2);

        const video = await page.$(gumLocal);
        const quality = await video.evaluate((node) => {
            const res = (node as HTMLVideoElement).getVideoPlaybackQuality();
            return {
                creationTime: res?.creationTime,
                totalVideoFrames: res?.totalVideoFrames,
                droppedVideoFrames: res?.droppedVideoFrames,
            };
        });

        console.log(quality);
        expect(quality.totalVideoFrames).not.equal(0);
    });

    after('teardown', async function () {
        await browser.close();
    });
});
