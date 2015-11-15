Note: mongod must be running in order for this app to work! In one terminal, use ```mongod --dbpath=./db --smallfiles```  where db is the name of a directory in your app's root directory.  This is essential as it starts mongo and tells it where to store/reteive/edit/delete data from.

This app stores user posts of differnt beers in a mongo database. This is done by making a POST request to ```/api/beers```. For example, using Superagent-CLI: ```superagent localhost:3000/api/beers post '{"name":"Leafer Madness","brewery":"Beer Valley","style":"double IPA","notes":"very tasty"}'```

Then users can see a list of all the beers in the database (in json format) by making a GET request to ```/api/beers```  (such as using the browser).

Users can also modify the database with a PUT request to ```/api/beers/someID``` where someID is the id that mongo gives the item in the database. For example, using Superagent-CLI: ```superagent localhost:3000/api/beers/5643a0ce9cc8b7ba053de8e9" put'{"notes":"I'd like to have that again some time"}'```  would change the "notes" field from "very tasty" to "I'd like to have that again some time".

Users can delete an item from the database by making a DELETE requst to ```/api/beers/someID``` where someID is the mongo id of that particular beer. For example, using Superagent-CLI: ```superagent localhost:3000/api/beers/5643a0ce9cc8b7ba053de8e9 delete"  would remove that same beer from the database entirely.

Additional features: The user can a SUBSET of all the beers in the database by simply making a GET request (i.e. use superagent or just the browser) to ```/api/beers/someBreweryName``` where someBreweryName is  the name of the brewery that the user wants to see beers from.  That route will display json data for all the beers from that one brewery, but not from any other brewery.

Finally, making a GET request to ```/someName``` will display a message using someName.  For example, taking the browsewr to ```localhost3000:/matt``` will display "My name is MATT and I like me some beer."
