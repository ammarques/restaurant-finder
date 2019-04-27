# Restaurant finder
I scraper search utility to provide a restaurant search in websites like OpenTable, Yelp, TripAdvisor without using their official API's.

## Usage

*Install dependencies:*
> npm install

*Direcly execute the index.js file:*
> node index.js //yes I know it's ugly, I'll change this(_eventually_).

Atm just directly call **_find("bricco")_**
Based on your query, scrapers will grab suggestions classify their titles base on text similarities, reorder(similarity score descendant), and return an object array, limited by a max of 3 elements per source(OpenTable, Yelp, TripAdvisor).

**return:**
```
[
    { 
        orign: 'Yelp',
        host: 'https://www.yelp.com',
        url: '/biz/bricco-boston-6',
        query: 'bricco',
        image:'https://s3-media3.fl.yelpcdn.com/bphoto/X_f0np631fhMXBzUC1phdw/30s.jpg',
        title: 'Bricco',
        location: '241 Hanover St, Boston',
        similarity: 0.8 
    },
    { 
        orign: 'OpenTable',
        host: 'https://www.opentable.com',
        url: '/bricco?corrId=ffd08b76-59dc-4a3c-9341-3d6a80ef1937',
        query: 'bricco',
        title: 'Bricco',
        location: 'North End',
        similarity: 0.8 
    },
    { 
        orign: 'TripAdvisor',
        host: 'https://www.tripadvisor.com',
        url:'/Restaurant_Review-g52787-d1135680-Reviews-Bricco-Harrisburg_Pennsylvania.html',
        query: 'bricco',
        title: 'Bricco',
        location: '31 S 3rd St, Harrisburg, Pennsylvania',
        similarity: 0.8 
    }
]
```
## Roadmap
~~- Code running in the client side has reduntant content that can be refactored/simplified.~~
- Results still not consistent, need to work in a way to improve that by creating a interface that allow users to specify address / metro areas and maybe use similarity function to return the most probable results.
- Modularize this.
- Apply specialization and separate content providers in external files.
- Implement cache with SQLite?