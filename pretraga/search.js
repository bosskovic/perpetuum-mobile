(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('rezultati-pretrage');
    var hits = document.getElementById('hits');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<div class="post-preview">';
        appendString += '<p class="post-meta date">'+ item.date +'</p>';
        appendString += '<a href="'+ item.url +'">';
        appendString += '<img src="'+ item.img +'" class="pull-right" style="width: 160px; height: 120px;">';
        appendString += '<h2 class="post-title">'+ item.title +'</h2>';
        appendString += '<h3 class="post-subtitle">'+ item.description +'</h3>';
        appendString += '</a>';
        appendString += '<p class="post-meta">' + item.excerpt + '<br><br>' + item.read_time + '</p>';
        appendString += '</div><hr class="clearfix">';
      }

      searchResults.innerHTML = appendString;

      var hitsString = results.length + ' ';

      var lastDigit = results.length.toString();
      lastDigit = lastDigit.charAt( lastDigit.length - 1 );

      if (lastDigit == '1'){
        hitsString += 'pogodak'
      }
      else if (lastDigit == '2' || lastDigit == '3' || lastDigit == '4'){
        hitsString += 'pogotka'
      }
      else{
        hitsString += 'pogodaka'
      }

      hits.innerHTML = '<a href="#rezultati-pretrage">' + hitsString + '</a>';
    } else {
      searchResults.innerHTML = 'Ništa nije pronađeno';
      hits.innerHTML = 'Ništa nije pronađeno';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('q');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('tags', { boost: 10 });
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'tags': window.store[key].tags,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();