"use strict";

// listen for a click on the button
function handleUserInput() {
  $(".js-button").click(function(event) {
    event.preventDefault();

    // once button is clicked, collect the number that is in `input`
    const userInput = $('input[id="dog-pics"]').val();

    // add that number to the dogAPI url
    let dogApiUrl = `https://dog.ceo/api/breeds/image/random/${userInput}`;

    // prevent API from being called if user enters number over 50
    if (userInput > 50) {
      $(".image-results").html(
        `<p role="alert" class="error-msg">That's too many dogs! Please choose a number between 1 and 50</p>`
      );
    } else {
      callDogApi(dogApiUrl);
    }
  });
}

//use fetch to call the API
function callDogApi(url) {
  fetch(url)
    .then(response => response.json())
    .then(dogObj => displayResults(dogObj.message))
    .catch(err => console.log("error: ", err));
}
// insert the images as `img` elements into `section`
function displayResults(message) {
  let newImages = $('<section class="image-results"></section>');
  message.forEach(item =>
    newImages.append(
      `<div role="figure" class="image-container"><img src=${item} alt="a dog" /></div>`
    )
  );
  $(".image-results").replaceWith(newImages);
  $(".image-results").removeClass("hide-image-results");
}

handleUserInput();
