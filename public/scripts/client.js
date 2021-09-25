/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

//   const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     },
//     {
//       "user": {
//         "name": "Paolo",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@me_ing" },
//       "content": {
//         "text": "Test!"
//       },
//       "created_at": 1573245023718
//     }
//   ]
const escaper =  function(str) {
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
            <h4>PIN RETWEET HEART</h4>
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

  //renderTweets(data);

const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (allTweets) {
      renderTweets(allTweets);
    })
  }

loadTweets()

$('.new-tweet form').submit( function (event) {
    event.preventDefault();
    const $form = $(this);
//     const tweet = $form.serialize()
//     $.ajax({ url: "/tweets/", method: 'POST', data: tweet })
    const tweetText = $form.children('textarea').val();
    if (!tweetText) {
      alert("Your tweet cannot be empty");
    } else if (tweetText.length > 140) {
      alert("You have exceeded 140 characters");
    } else {
      const tweet = $form.serialize();
      $.ajax({ url: "/tweets/", method: 'POST', data: tweet }) 
      .then (function (postRequestReturnValue) {
        return $.ajax('/tweets', { method: 'GET' })
      })
      .then (function (getRequestReturnValue) {
        const latestTweet = [getRequestReturnValue[getRequestReturnValue.length - 1]];
        renderTweets(latestTweet);
      })
    }
  })


});