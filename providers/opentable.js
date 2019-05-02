const config = {host:'https://www.opentable.com',name:'OpenTable',query:null};
let provider = function () {};

provider.prototype.search = async function (query,page) {
    config.query = query;
    const uri_query = encodeURIComponent(query);
    await page.goto('https://www.opentable.com/s/?term=' + uri_query + '&metroId=7');
    await page.waitFor('.results-title-summary');
    await page.waitFor('.content-section-list-row');

    const collect = await page.evaluate((config) => {
        var data = [];
        $('.content-section-list-row').each(function () {
            const nurl = $(this).find('.rest-row-image a:first').attr('href');
            const image = $(this).find('.rest-row-image image:first').attr('src');
            const title = $(this).find('.rest-row-name-text').text();
            const location = $(this).find('.rest-row-meta--location').text();

            data.push({
                'orign': config.name,
                'host': config.host,
                'url': nurl,
                'query': config.query,
                'image': image,
                'title': title,
                'location': location,
            });
        });
        return data;
    },config);
    return collect;
};

module.exports = new provider();