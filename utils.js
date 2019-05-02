const similarity = require('string-similarity');
const max_results = 1;

let utils = function () {};

utils.prototype.findSimilar = async function (query,objs,results) {
    for (let s = 0; s < objs.length; s++) {
        let sim = similarity.compareTwoStrings(objs[s].title, query);
        objs[s].similarity = sim;
    }
    objs.sort((a, b) => parseFloat(b.similarity) - parseFloat(a.similarity));

    let finalArray = objs;
    if (objs.length > max_results) {
        finalArray = objs.slice(0,max_results);
    }

    return results.concat(finalArray);
};

module.exports = new utils();