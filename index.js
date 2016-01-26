var fetch = require('node-fetch');
var queryString = require('query-string');

// Url for prefix searching npm repositories
function getSearchUrl(keyword, limit) {
  limit = limit || 50;
  // URL shamelessly appropriated from Microsoft/vscode
  return 'https://skimdb.npmjs.com/registry/_design/app/_view/browseAll?' + queryString.stringify({
    group_level: 1,
    limit: limit,
    start_key: '["' + keyword + '"]',
    end_key: '["' + (keyword + 'z') + '",{}]'
  });
}
  
// Url for getting information about a specific repository
function getPackageUrl(name) {
  return "http://registry.npmjs.org/" + name;
}

// utility, so I don't have to call .json() on each request
function fetchJson(url, options) {
  return fetch(url, options).then(function (response) {
    return response.json();
  });
}

// returns a Promise, with the {name, description} objects of the matching packages
function search(keyword) {
  return fetchJson(getSearchUrl(keyword)).then(function (results) {
    console.log(results);
    return (results.rows || []).map(function (row) {
      return row.key[0];
    });
  });
}
// Returns all the available versions for the given package in reverse order (newest first)
function versions(name) {
  return fetchJson(getPackageUrl(name)).then(function (packageInfo) {
    var versionsObject = packageInfo.versions || {};
    return Object.keys(versionsObject).sort(function (a, b) {
      return b.localeCompare(a)
    });
  });
}

module.exports = {
  search: search,
  versions: versions
};
