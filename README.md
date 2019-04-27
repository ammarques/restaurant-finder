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
aurant-finder
I scraper utility script that can be used to provide a restaurant search in websites like OpenTable, Yelp, TripAdvisor without using their official API's.

## Usage

*Install dependencies:*
> npm install

*Direcly execute the index.js file:*
> node index.js //yes I know it's ugly, I'll change this(_eventually_).

Atm just directly call **_find("Italian Mamma")_**
Based on your query, scrapers will grab suggestions classify their titles base on text similarities, reorder(similarity score descendant), and return an object array, limited by a max of 3 elements per source(OpenTable, Yelp, TripAdvisor).

**return:**
```
[
    {
        orign: 'Yelp',
        host: 'https://www.yelp.com',
        url: '/biz/bricco-boston-6',
        query: 'Italian Mamma',
        image:'https://s3-media3.fl.yelpcdn.com/bphoto/X_f0np631fhMXBzUC1phdw/30s.jpg',
        title: 'Italian Mamma',
        location: '2400 Hanover St, Boston',
        similarity: 0.5
    },
    { 
        orign: 'OpenTable',
        host: 'https://www.opentable.com',
        url: '/bricco?corrId=f67c2c5c-cb57-4770-8ca3-483313809308',
        query: 'Italian Mamma',
        title: 'Italian Mamma',
        location: 'North End',
        similarity: 0.5
    },
    { 
        orign: 'TripAdvisor',
        host: 'https://www.tripadvisor.com',
        url:'/Restaurant_Review-g1052379-d7053131-Reviews-Il_bric-Carmagnola_Province_of_Turin_Piedmont.html',
        query: 'Italian Mamma',
        title: 'Italian Mamma',
        location:'Viale Giuseppe Garibaldi N. 35, Carmagnola, Province of Turin, Piedmont, Italy',
        similarity: 0.75 
    }
]
```
## Roadmap
- Code running in the client side need to be refactored, some values are harcoded.
- Modularize this.
- Create an interface that allow users to suggest metro/areas or find a way to bypass it.
In order to avoid being feed with local only suggestions, user have to provide a base location, a metro area, so I plan to implement a similar solution used by OpenTable, where user provide something like "Boston / New England" before searching.
- Create a cache with SQLite?
