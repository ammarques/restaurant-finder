const puppeteer = require('puppeteer');
const utils = require('./utils');
const yelp = require('./providers/yelp');
const tripadvisor = require('./providers/tripadvisor');
const opentable = require('./providers/opentable');

let tempResult = [], results = [];

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36';
let restaurant = function () {};

restaurant.prototype.finder = async function (query) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    await page.setUserAgent(userAgent);

    page.on('request', request => {
        if (request.resourceType().toString() == 'image' || request.resourceType().toString() == 'stylesheet')
            request.abort();
        else
            request.continue();
    });


    tempResult = await yelp.search(query, page);
    results = await utils.findSimilar(query,tempResult,results, 1);

    tempResult = await tripadvisor.search(query,page);
    results = await utils.findSimilar(query,tempResult,results, 1);

    tempResult = await opentable.search(query,page);
    results = await utils.findSimilar(query,tempResult,results, 1);

    console.log(results);
    await browser.close();
};

module.exports = new restaurant();