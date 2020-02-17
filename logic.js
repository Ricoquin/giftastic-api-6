// Api Key: HoZdw8swLHCtHSrU2E21uBgnm4E3XKgH
$(document).ready(function() {
  var Movies = [
    'The Three Amigos',
    'Old School',
    'The Other Guys',
    'Blazing Saddles',
    'Shawshank Redemption',
    'Idiocracy',
    'Balls of Fury'
  ];

  function populateButtons(arrayUsing, addedClass, addToArea) {
    $(addToArea).empty();

    // Looping through the array of places
    for (var i = 0; i < arrayUsing.length; i++) {
      var a = $('<button>');

      a.addClass(addedClass);

      a.attr('data-type', arrayUsing[i]);

      a.text(arrayUsing[i]);

      $(addToArea).append(a);
    }
  }

  $(document).on('click', '.movie-button', function() {
    $('#movies').empty();
    $('.movie-button').removeClass('active');
    $(this).addClass('active');

    var type = $(this).attr('data-type');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      type +
      '&api_key=HoZdw8swLHCtHSrU2E21uBgnm4E3XKgH';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var movieGif = $('<div class="movie-item">');

        var rating = results[i].rating;

        var p = $('<p>').text('Rating: ' + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var movieImg = $('<img>');

        movieImg.attr('src', still);
        movieImg.attr('data-still', still);
        movieImg.attr('data-animate', animated);
        movieImg.attr('data-state', 'still');
        movieImg.addClass('movie-image');

        movieGif.append(p);
        movieGif.append(movieImg);

        $('#movies').prepend(movieGif);
      }
    });
  });
  $(document).on('click', '.movie-image', function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });

  $('#addMovie').on('click', function(event) {
    event.preventDefault();
    var newmovie = $('input')
      .eq(0)
      .val();

    if (newmovie.length > 2) {
      Movies.push(newmovie);
    }

    populateButtons(Movies, 'movie-button', '#movie-buttons');
  });

  populateButtons(Movies, 'movie-button', '#movie-buttons');
});
