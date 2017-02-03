// Require necessary files to make them available for Webpack
require('../index.html');
require('../styles/main.scss');
require('../../api/matches.json');
require('../../api/users.json');

// TODO: Finish application here
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || this.status === 304)) {
    console.log(JSON.parse(xhr.response));
  }
});

// Call API, display result on page
xhr.open('GET', './api/users.json', true);
xhr.send();

