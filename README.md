# Restaurant finder
I scraper search utility to provide a restaurant search in websites like OpenTable, Yelp, TripAdvisor without using their official API's.

## Usage

*Installing the module:*
> npm install ammarques/restaurant-finder#master

```
const restaurant = require('restaurant-finder');
restaurant.finder("bricco");
```
This will return you a query with similar results as being displayed bellow.
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

- Add exception treatment.
- Results still not consistent, I need to specify address, need to work in a way to improve that by creating a interface that allow users to specify address / metro areas and maybe use similarity function to return the most probable results.
- Implement cache with SQLite?
~~- Apply specialization and separate content providers in external files.~~
~~- Modularize this.~~
~~- Code running in the client side has reduntant content that can be refactored/simplified.~~