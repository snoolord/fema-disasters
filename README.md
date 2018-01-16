# Fema Disasters
[FEMA API Explorer](https://radiant-cove-57266.herokuapp.com/disasters?start-date=1953-05-29&end-date=1955-05-30&type=Flood)

## Functionality
Users can click on the <select><option>Flood</option><option> Tornado</option></select> 
and choose a type or a start-date or end-date with the two date-pickers <input type="date">. Choosing certain options will filter out disasters. After choosing options and clicking filter, the app will redirect to a new URL that will display disasters on the map according to the filters
## Motivations

Currently, the Disaster Declarations Summary only has one endpoint and gives out the full data of all states.
A flexible API for FEMA disaster removes the need to repetitively filter the full dataset and also receive unnecessary data. An API explorer visualization would bring great value to new developers to quickly understand the data returned by the endpoint and more seasoned developers to quickly test queries. The API explorer will return the amount of disasters for each state on the map.

## Considerations

1. Seed Database
csvtojson was chosen because I've used it before and was especially useful this time because the csv was in perfect condition. 

2. Routing
I wanted to build more with the async / await syntax so I chose Express. req.query was especially useful in breaking up query params 

3. Building REST API
I used Jasmine to test the API because it's what I'm familiar with for my personal projects. Mongoose was used so that it would be easy to query for Documents and serve them straight to the view. Defaulting params is taken care of in the back end in disasters.controller.util.js. Lone dates are either set ~7 days back or forward and disaster type defaults to Flood. 
The REST API renders a index.ejs template. The response from the database is bootstrapped to the template so that the client side JavaScript can access it. 

4. Building out the Visualization
I used vanilla JavaScript and HTML to build out filters for start-date, end-date, and disaster-type. The filter button makes a redirect to a new URL and the server takes care of filling in any defaults. There is some basic error handling that shows up when you enter an end-date that is earlier than a start date.

The geojson data from mapbox is used as a template for all the states. The bootstrapped data response is used to populate the states template with data about the disasters. All disasters are added to the geojson data which is able to be translated onto the US map with the Mapbox APIs. 
## Technologies used

- Express
- ES6 with Babel transcompiling to ES5
- MongoDB
- Heroku
- Vanilla JavaScript on client side
- MapBox 
- Jasmine
- csvtojson (https://github.com/Keyang/node-csvtojson)