An interactive cookbook app, written with React, sqlite and Node.js, it also has a piece of simple CSS art. Its React part is written in the functional style, with hooks and without using classes. 

The database itself and the entries that are used to populate it aren't inluded into this repository. To use populateDB.js script the entries should follow the following pattern:

    [{
        name: "Soft Boiled Eggs", 
        tags: "soft boiled eggs ",
        recipe: "Cover the eggs with cold water in a saucepan, place over the fire, and when the water comes to the boiling point the eggs are perfectly cooked; remove at once and serve.",
        source: "The Golden Age Cook Book, by Henrietta Latham Dwight, 1898",
        cuisine: "General"
    }, ...]

Tags key-value pair is used to designate the tags that are used to look for the requested dishes, cuisine is used to designate the cuisine category of the entry, the rest is used to format the output.

The front-end part was created with Create React App, so it follows the usual commands - 'npm start' to run the front-end in the development mode, 'npm test' to run tests (unit tests can be run without launching the app, but to pass end-to-end tests both front-end and back-end parts of the app should be running, you may launch them both in a separate terminal tab), 'npm run build' to build it for production and 'npm run eject' to eject from the build tool and configuration choices.

To run the both front-end and back-end in the dev mode you may use the following command: 'concurrently "npm run server" "npm start"' (you should have concurrently npm package being installed to use it).
