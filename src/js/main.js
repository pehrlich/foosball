// Require necessary files to make them available for Webpack
require('../index.html');
require('../styles/main.scss');
require('../../api/matches.json');
require('../../api/users.json');


var getData = function (path, cb) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || this.status === 304)) {
      // console.log(JSON.parse(xhr.response));
      cb(JSON.parse(xhr.response), xhr);
    }
  });

  // Call API, display result on page
  xhr.open('GET', path, true);
  xhr.send();
};


var populateUserList = function () {
  'use strict';

  // todo error handling
  getData('./api/users.json', function (data) {
    var string = '';
    for (var i = 0; i < data.length; i++) {
      // debugger
      string += `<li class="is-in-lead">
              <span class="leaderboard__name">${data[i].name}</span>
              <span class="leaderboard__stats leaderboard__stats--wins">${data[i].wins}</span>
              <span class="leaderboard__stats leaderboard__stats--losses">${data[i].losses}</span>
            </li>`;
    }
    document.getElementById('leaderboard__list').innerHTML = string;
    // debugger
  });

};


populateUserList();