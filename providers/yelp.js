let config = {host:'https://www.yelp.com',name:'Yelp',query:null};
let provider = function () {};

provider.prototype.search = async function (query, page) {
    config.query = query;
    await page.goto('https://www.yelp.com');
    await page.waitFor('#find_desc');
    await page.focus('#find_desc');
    await page.keyboard.type(query.toString());
    await page.waitFor(500);
    await page.waitFor('.suggestions-list');

    const collect = await page.evaluate((config) => {
        let data = [];
        $('.suggestions-list').find("li").each(function () {
            const type = $(this).attr('data-suggestion-type');
            if (type.toString() === "business") {
                const nurl = $(this).attr('data-redirect-url');
                const image = $(this).find(".photo-box-img").attr('src');
                const title = $(this).find(".suggestion-name").text();
                const location = $(this).find(".suggestion-location").text();

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
        });
        return data;
    },config);
    return collect;
};

module.exports = new provider();