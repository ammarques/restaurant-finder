let config = {host:'https://www.tripadvisor.com',name:'TripAdvisor',query:null};
let provider = function () {};

provider.prototype.search = async function (query,page) {
    config.query = query;
    const uri_query = encodeURIComponent(query);
    await page.goto('https://www.tripadvisor.com/Search?geo=1&q=' + uri_query);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
    await page.waitFor('.result-card');

    const collect = await page.evaluate((config) => {
        let data = [];
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
                        'orign': config.name,
                        'host': config.host,
                        'url': nurl,
                        'query': config.query,
                        'image': image,
                        'title': title,
                        'location': location,
                    });
                }
            }
        });
        return data;
    },config);
    return collect;
};

module.exports = new provider();