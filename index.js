const puppeteer = require('puppeteer');
const similarity = require('string-similarity');
const max_results = 1;
let results = [];
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36';

async function findSimilarities(query, objs) {
    for (let s = 0; s < objs.length; s++) {
        let sim = similarity.compareTwoStrings(objs[s].title, query);
        objs[s].similarity = sim;
    }
    objs.sort((a, b) => parseFloat(b.similarity) - parseFloat(a.similarity));

    let finalArray = objs;
    if (objs.length > max_results) {
        finalArray = objs.slice(0,max_results);
    }
    results = results.concat(finalArray);
}

async function yelp(query, page) {
    let provider = {host:'https://www.yelp.com',name:'Yelp',query:query};
    await page.goto('https://www.yelp.com');
    await page.waitFor('#find_desc');

    await page.focus('#find_desc');
    await page.keyboard.type(query.toString());
    await page.waitFor(500);
    await page.waitFor('.suggestions-list');

    const collect = await page.evaluate((provider) => {
        var data = [];
        $('.suggestions-list').find("li").each(function () {
            const type = $(this).attr('data-suggestion-type');

            if (type.toString() === "business") {
                const nurl = $(this).attr('data-redirect-url');
                const image = $(this).find(".photo-box-img").attr('src');
                const title = $(this).find(".suggestion-name").text();
                const location = $(this).find(".suggestion-location").text();

                data.push({
                    'orign': provider.name,
                    'host': provider.host,
                    'url': nurl,
                    'query': provider.query,
                    'image': image,
                    'title': title,
                    'location': location,
                });
            }
        });
        return data;
    },provider);
    await findSimilarities(query, collect);
}

async function tripadvisor(query, page) {
    const provider = {host:'https://www.tripadvisor.com',name:'TripAdvisor',query:query};
    const uri_query = encodeURIComponent(query);
    await page.goto('https://www.tripadvisor.com/Search?geo=1&q=' + uri_query);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
    await page.waitFor('.result-card');

    const collect = await page.evaluate((provider) => {
        var data = [];

        $('.result-card[data-widget-type="LOCATIONS"]').each(function () {
            const scrpt = $(this).find('.result-title').attr('onclick');
            var nurl = "";

            if (scrpt != undefined) {
                const url_temp = scrpt.split("'");
                nurl = url_temp[3];
            }

            const image = $(this).find('div.thumbnail > div.is-shown-at-desktop > div').attr('style');
            const title = $(this).find('.result-title').text();
            const location = $(this).find('.address-text').text();

            if (nurl != undefined && title != undefined && location != undefined) {
                if ($(this).find('.thumbnail-overlay-tag').text() == "Restaurants") {
                    data.push({
                        'orign': provider.name,
                        'host': provider.host,
                        'url': nurl,
                        'query': provider.query,
                        'image': image,
                        'title': title,
                        'location': location,
                    });
                }
            }
        });
        return data;
    },provider);
    await findSimilarities(query, collect);
}

async function opentable(query, page) {
    const provider = {host:'https://www.opentable.com',name:'OpenTable',query:query};
    const uri_query = encodeURIComponent(query);
    await page.goto('https://www.opentable.com/s/?term=' + uri_query + '&metroId=7');
    await page.waitFor('.results-title-summary');
    await page.waitFor('.content-section-list-row');

    const collect = await page.evaluate((provider) => {
        var data = [];
        $('.content-section-list-row').each(function () {
            const nurl = $(this).find('.rest-row-image a:first').attr('href');
            const image = $(this).find('.rest-row-image image:first').attr('src');
            const title = $(this).find('.rest-row-name-text').text();
            const location = $(this).find('.rest-row-meta--location').text();

            data.push({
                'orign': provider.name,
                'host': provider.host,
                'url': nurl,
                'query': provider.query,
                'image': image,
                'title': title,
                'location': location,
            });
        });
        return data;
    },provider);
    await findSimilarities(query, collect);
}

async function find(query) {
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

    await yelp(query, page);
    await opentable(query, page);
    await tripadvisor(query, page);
    await browser.close();
    console.log(results)
}

find("bricco");