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


var userList = [];
var findUser = function (id) {
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].id === id) return userList[i];
  }
  return null
};
var matchList = [];


var printMatches = function (matches) {
  var dataItem, string = '';
  if (!matches) matches = matchList;

  for (var i = 0; i < matches.length; i++) {
    dataItem = matches[i];
    string += `<a href="match.html" class="match-details">
                    <div class="match-details__team match-details__team--a is-winner">
                      <header class="match-details__team__header">Team A</header>
                      <span class="match-details__team__player">${findUser(dataItem.teamA[0]).name}</span>
                      <span class="match-details__team__player">${findUser(dataItem.teamA[1]).name}</span>
                      <span class="match-details__team__points">${dataItem.scoreA}</span>
                    </div>
                    <div class="match-details__vs">
                      <span>VS</span>
                    </div>
                    <div class="match-details__team match-details__team--b">
                      <header class="match-details__team__header">Team B</header>
                      <span class="match-details__team__player">${findUser(dataItem.teamB[0]).name}</span>
                      <span class="match-details__team__player">${findUser(dataItem.teamB[1]).name}</span>
                      <span class="match-details__team__points">${dataItem.scoreB}</span>
                    </div>
                  </a>`;
  }
  document.getElementById('match__list').innerHTML = string;
};

var populateUserList = function () {
  'use strict';

  // todo error handling
  getData('./api/users.json', function (data) {
    var string = '';
    for (var i = 0; i < data.length; i++) {
      userList = data;
      string += `<li class="is-in-lead">
              <span class="leaderboard__name" data-match-id="${data[i].id}">${data[i].name}</span>
              <span class="leaderboard__stats leaderboard__stats--wins">${data[i].wins}</span>
              <span class="leaderboard__stats leaderboard__stats--losses">${data[i].losses}</span>
            </li>`;
    }
    document.getElementById('leaderboard__list').innerHTML = string;

    // if RHS already done, refresh here.
    if (matchList.length > 0) printMatches();
  });

  getData('./api/matches.json', function (data) {
    matchList = data;
    printMatches();
  });

};

var selectMatch = function (event) {
  if (event.target.className != 'leaderboard__name') return

  var id = Number(event.target.dataset.matchId);

  printMatches(
    matchList.filter(function (m) { return m.id === id })
  )
};
document.addEventListener( 'click', selectMatch );


populateUserList();




// todo: don't use className