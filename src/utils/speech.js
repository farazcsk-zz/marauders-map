function getTextFromMic(outputId) {
  fetch('/api/speech-to-text/token')
    .then(function(response) {
      return response.text();
    }).then(function (token) {

      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        continuous: false, // false = automatically stop transcription the first time a pause is detected
        outputElement: '#' + outputId // CSS selector or DOM Element
      });

      stream.on('error', function(err) {
        console.log(err);
      });

    }).catch(function(error) {
      console.log(error);
    });
}

function checkForCorrectPassword(inputId, onCorrectPassword) {
  let password = $('#password');
  console.log(password, password.text());

  let observer = new MutationObserver((mutations) => {
    console.log('"' + password.text() + '"');
    if (password.text() === "I solemnly swear that I'm up to no good. ") {
      console.log('naughty!');
      onCorrectPassword();
    }
  });

  observer.observe(password.get(0), {characterData: true, childList: true});
}

export { getTextFromMic, checkForCorrectPassword };
