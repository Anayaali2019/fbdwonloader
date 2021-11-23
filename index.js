const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
var fblinks='';
app.use(express.static('public'));
app.get('/', function (req, res) {
respp = '';
res.setHeader('Content-Type', 'application/json');
var query = require('url').parse(req.url, true).query;
 fblinks = (query.url);

 fblinks = fblinks.toString().replace('https://www.facebook.com','https://m.facebook.com');


(async () => {const browser = await puppeteer.launch(  { headless: true});
const page = await browser.newPage();
await page.goto('https://www.getfvid.com', {waitUntil: 'load'});
await page.waitForSelector('input[name=url]');
console.log(fblinks);

  /* await page.$eval('input[name=url]', el => el.value =  fblinks);
   */
  await page.focus('input[name=url]');
page.keyboard.type(fblinks);
await delay(4000);
  await page.click('button[id="btn_submit"]');
    await page.waitForSelector('a[class="btn btn-download"]');
    const hrefs1 = await page.evaluate(
        () => Array.from(document.querySelectorAll('a[class="btn btn-download"]'),a => a.getAttribute('href')));
console.log(hrefs1[1])


res.send(hrefs1[1])

/* await browser.close(); */
})();});
app.listen(process.env.PORT || 3001, () => console.log('Server is running...'));



function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }




