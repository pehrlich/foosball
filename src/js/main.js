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
// todo - refactor to method called populateSortList(data, ordering)
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



var sortUsers = function (users) {
  if (!users) users = userList;
  return users.sort(function (a, b) {
    if (a.wins > b.wins ) return -1;
    if (b.wins > a.wins ) return 1;
    if (a.losses > b.losses) return 1;
    if (b.losses > a.losses) return -1;
    return 0;
  })
};

var populate = function () {
  'use strict';

  // todo error handling
  getData('./api/users.json', function (data) {
    var string = '';
    userList = sortUsers(data);

    for (var i = 0; i < userList.length; i++) {
      string += `<li class="user-list-item" data-user-id="${data[i].id}">
              <span class="leaderboard__name">${data[i].name}</span>
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


// todo - this is a bit of a misnomer, because can contain self as well
// todo - this method should be tested especially:
//       - return false if nowhere in tree or self
//       - return self if self match
//       - return parent if parent match
var containedByClass = function (el, className) {
  while (el) {
    if (el.className === className) return el;
    el = el.parentElement;
  }
  return false
};

var selectMatch = function (event) {
  var listItem = containedByClass(event.target, 'user-list-item');
  if ( !listItem ) return;

  var userId = Number(listItem.dataset.userId);

  printMatches(
    matchList.filter(function (m) {
      return ( m.teamA.indexOf(userId) != -1) || ( m.teamB.indexOf(userId) != -1)
    })
  );
};
document.addEventListener( 'click', selectMatch );


populate();




// todo: don't use className