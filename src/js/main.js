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
      string += `<li class="is-in-lead">
              <span class="leaderboard__name">${data[i].name}</span>
              <span class="leaderboard__stats leaderboard__stats--wins">${data[i].wins}</span>
              <span class="leaderboard__stats leaderboard__stats--losses">${data[i].losses}</span>
            </li>`;
    }
    document.getElementById('leaderboard__list').innerHTML = string;
  });

  getData('./api/matches.json', function (data) {
    var string = '';
    var dataItem;
    for (var i = 0; i < data.length; i++) {
      dataItem = data[i];
      string += `<a href="match.html" class="match-details">
                  <div class="match-details__team match-details__team--a is-winner">
                    <header class="match-details__team__header">Team A</header>
                    <span class="match-details__team__player">${dataItem.teamA[0]}</span>
                    <span class="match-details__team__player">${dataItem.teamA[1]}</span>
                    <span class="match-details__team__points">${dataItem.scoreA}</span>
                  </div>
                  <div class="match-details__vs">
                    <span>VS</span>
                  </div>
                  <div class="match-details__team match-details__team--b">
                    <header class="match-details__team__header">Team B</header>
                    <span class="match-details__team__player">${dataItem.teamB[0]}</span>
                    <span class="match-details__team__player">${dataItem.teamB[1]}</span>
                    <span class="match-details__team__points">${dataItem.scoreB}</span>
                  </div>
                </a>`;
    }
    document.getElementById('match__list').innerHTML = string;
  });

};


populateUserList();