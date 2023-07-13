/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Implement check on cross scripting using function below and in content-text
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(function () {
  // Function to display the error message
  function showError(errorMessage) {
    const $errorElement = $("#error-messages");
    $errorElement.text(errorMessage);
    $errorElement.slideDown();
  }

  // RENDER TWEETS - loops through tweets-  calls createTweetElement for each tweet-takes return value and appends it to the tweets container

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $("#tweet-container").prepend($tweet);
    }

    // Update timeago
    $("span.timestamp").each(function () {
      const timestamp = $(this).data("timestamp");
      $(this).text(timeago.format(timestamp));
    });
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="avatar-container">
          <div class="avatar-content"><img class="Avatar1" src="${
            tweet.user.avatars
          }">
           <h3 class="username">${tweet.user.name}</h3>
          </div>
            <div class="name-handle">
           <span class="handle">${tweet.user.handle}</span>
            </div>
          </div>
        </header>
        <div class="content">
          <p>${escapeText(tweet.content.text)}</p>
        </div>
        <footer>
          <span class="timestamp" data-timestamp="${tweet.created_at}"></span>
          <div class="icons">
            <i class="fas fa-comment"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  //  LOAD tweets - fetching tweets from the http://localhost:8080/tweets page.
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (response) {
        renderTweets(response);
      },
      error: function (xhr, status, error) {
        console.error("Error loading tweets:", error);
      },
    });
  };
  loadTweets(); // call loadTweets after defining it

  //////////// Form Submission //////////

  $("form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    $("<div>")
      .append("default " + event.type + " prevented")
      .appendTo("#log");

    const $form = $(this);
    const $textarea = $form.find("#tweet-text"); // Implement Validation of tweet content
    const tweetContent = $textarea.val().trim();
    if (tweetContent === "") {
      showError("Please enter a tweet, cannot be blank.");
      return;
    }
    if (tweetContent.length > 140) {
      showError("Tweet content is too long, limit is 140 Charachters");
      return;
    }

    const formData = $form.serialize(); // Serialize the form data as a query string

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        console.log("Tweet submitted successfully:", response);
        loadTweets();
        $textarea.val("");
        hideError(); //hide the error message on submission
      },
      error: function (xhr, status, error) {
        console.error("Error submitting tweets. Please try again.", error);
      },
    });
  });

  // Click event listener to hide error message on click outside the form

  $(document).on("click", function (event) {
    const $target = $(event.target);
    const $form = $("form");

    if (!$target.closest($form).length && !$target.is($form)) {
      hideError();
    }
  });

  // Input event listener to hide error message when typing or clicking to type a tweet
  $("#tweet-text").on("input click", function (event) {
    hideError();
  });

  // Error Displaying Validation Errors With jQuery
  const $errorElement = $("#error-messages");
  function showError(errorMessage) {
    //display the error message
    $errorElement.text(errorMessage);
    $errorElement.slideDown();
  }

  function hideError() {
    //hide the error message
    $errorElement.slideUp();
  }
  hideError();
});
