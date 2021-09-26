/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  const escaper = function(str) {
    let tweet = document.createElement('div');
    tweet.appendChild(document.createTextNode(str));
    return tweet.innerHTML;
  }
  const createTweetElement = function(tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const innerHTML = `
          <header>
              <img src= ${tweetObj.user.avatars}>
              <h4>${tweetObj.user.name}</h4>
              <p>${tweetObj.user.handle}</p>
          </header>
          <p>${escaper(tweetObj.content.text)}</p>
          <footer>
            <p>${timeago.format(tweetObj["created_at"])}</p>
            <h4><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></h4>
          </footer>
          `;
    $tweet.append(innerHTML);
    return $tweet;
  };
  const renderTweets = function(tweetObjArr) {
    for (const tweet of tweetObjArr) {
      const $tweet = createTweetElement(tweet);
      $('section.all-tweets').prepend($tweet);
    }
  };
  const loadTweets = function() {
    $.ajax('/tweets', {
        method: 'GET'
      })
      .then(function(allTweets) {
        renderTweets(allTweets);
      })
  }
  loadTweets()
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const $form = $(this);
    $('.errorMessage').empty().slideUp();
    const tweetText = $form.children('textarea').val();
    if (!tweetText) {
      $('.errorMessage').append('Tweet cannot be empty');
      $('.errorMessage').slideDown();
    } else if (tweetText.length > 140) {
      $('.errorMessage').append('You have exceeded 140 characters');
      $('.errorMessage').slideDown();
    } else {
      $('.errorMessage').slideUp();
      const tweet = $form.serialize();
      $.ajax({url: "/tweets/",method: 'POST',data: tweet})
        .then(function(postValue) {
          return $.ajax('/tweets', {method: 'GET' })
        })
        .then(function(getValue) {
          $form[0].reset();
          $('.counter').text(140)
          const latestTweet = [getValue[getValue.length - 1]];
          renderTweets(latestTweet);
        })
    }
  })
});