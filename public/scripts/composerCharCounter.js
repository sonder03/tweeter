

// $(document).ready(function() {
//   console.log("composer-char-counter.js loaded");
//   // Your code goes here

//   $(".new-tweet textarea").on("input", function() {
//     var $textarea = $(this);
//     var tweetLength = $textarea.val().length;
//     var maxLength = 140;
//     var charsLeft = maxLength - tweetLength;
//     var counter = $textarea.siblings('.form-footer').find('.counter');
    
//     counter.text(charsLeft);
    
//     if (tweetLength > maxLength) {
//       counter.addClass("invalid");
//     } else {
//       counter.removeClass("invalid");
//     }
//   });
// });


// $(document).ready(function() {
//   console.log("composer-char-counter.js loaded");

//   $(".new-tweet textarea").on("input", function() {
//     var $textarea = $(this);
//     var tweetLength = $textarea.val().length;
//     var maxLength = 140;
//     var charsLeft = maxLength - tweetLength;
//     var counter = $textarea.siblings('.form-footer').find('.counter');
    
//     counter.text(charsLeft).toggleClass("invalid", tweetLength > maxLength);
//   });
// })

$(document).ready(function() {
  console.log("composer-char-counter.js loaded");

  $(".new-tweet textarea").on("input", function() {
    var $textarea = $(this);
    var tweetLength = $textarea.val().length;
    var maxLength = 140;
    var charsLeft = maxLength - tweetLength;
    var counter = $textarea.closest('.new-tweet').find('.counter');
    
    counter.text(charsLeft).toggleClass("invalid", tweetLength > maxLength);
  });
});




