(function () {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || this.status === 304)) {
      console.log(JSON.parse(xhr.response));
    }
  });

  // Call API, display result on page
  xhr.open('GET', './api/users.json', true);
  xhr.send();
})();
