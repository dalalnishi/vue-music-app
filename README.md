# vue-entertainment

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Run test cases
```
npm run test:unit
```

### Entertainment App
-> Vuex - State Management
-> Vue-router - Routing
-> Bootstrap-vue, Antdesign - UI design
-> JS debounce - Used for Search feature (To prevent API calling on each key stroke)
-> Used Lazy loading for Loading Track records
-> Vue-test-utils JEST - UI test cases

### About Project
Made Simple demo with Vue.js + Node.js + Sequelize.

User can play songs online as well as can download songs to local machine.
User can also create the list of favourite songs by liking or unliking them and also can see the list of favourite songs.
Songs will be loaded in the grid with lazy loading functionality.
Users can search songs also by Song, Artist and Album name.
Debounce function is used for searching the songs online to prevent unnecessary and extra API calls.
