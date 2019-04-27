const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/cache.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message.toString().bgWhite.underline.red);
    }
    console.log('Connected to the cache database.'.green);
});

function saveDB(objs, orig_query){
    var query = "";
    for (var i = 0; i < objs.length; i++) {
        query += objs[i].query + ", " + orig_query + ", ";
    }
    var result = JSON.stringify(objs);

    db.run("INSERT INTO search (query,result) VALUES(?,?)", [query.toString(),result.toString()], function(err) {
        if (err) {
            return console.log(err.message);
        }else{
            console.log(`A row has been inserted with rowid ${this.lastID}`.yellow);
        }
    });
    db.close();
}

function findDB(){
    db.get("SELECT id as id, query as query, result as result FROM search WHERE query ILIKE ?", [query.toString()], (err, row) => {
        if(!err) {
            if(row){
                console.log(row.id + "\t" + row.query + "\t" + row.result.underline.green);
            }else{
                console.error("no results".bgWhite.underline.red);
            }
        }else{
            console.error(err.message.toString().bgWhite.underline.red);
        }
    });
    db.close();
}