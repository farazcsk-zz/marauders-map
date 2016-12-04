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

function say(text) {
  fetch('/api/text-to-speech/token')
    .then(function(response) {
      return response.text();
    }).then(function (token) {
      WatsonSpeech.TextToSpeech.synthesize({
        text: text,
        token: token
      });
    });
}

function checkForCorrectPassword(inputId, username, onCorrectPassword) {
  const validPasswords = [
    "I solemnly swear that I'm up to no good. ",
    "I solemnly swear that I am up to no good. ",
    "Please open",
    "Please open. ",
    "Open",
    "Open. "
  ];
  function getInsult(username) {
    let index = getRandomInt(0, 3);
    let insult;
    switch(index) {
      case 0:
        insult = "Angus begs " + username + " to keep their abnormally large nose out of other people's business."
        break;
      case 1:
        insult = "Faraz would like to say that " + username + " is an ugly git.";
        break;
      case 2:
        insult = "Mic would like to register his astonishment that an idiot like " + username + " ever became a developer."
        break;
      default:
        insult = "Daryl bids " + username + " good day, and advises them to wash their slimey hair."
    }
    return insult;
  }
  const onTimeout = () => { say(getInsult(username)); };

  checkSpeechMatches(inputId, validPasswords, onCorrectPassword, onTimeout, 5000);
}

function checkForCorrectGoodbye(inputId, onGoodbye) {
  const validGoodbyes = [
    "Mischief managed",
    "Mischief managed. ",
    "Please close",
    "Please close. "
  ];
  const onTimeout = () => {};

  checkSpeechMatches(inputId, validGoodbyes, onGoodbye, onTimeout, 3000);
}

function checkSpeechMatches(speechId, matches, onCorrect, onTimeout, timeout) {
  let correct = false;
  let speech = $('#' + speechId);

  let observer = new MutationObserver((mutations) => {
    console.log('"' + speech.text() + '"');
    if (matches.includes(speech.text())) {
      correct = true;
      onCorrect();
    }
  });

  observer.observe(speech.get(0), {characterData: true, childList: true});

  setTimeout(() => {
    if (!correct) { onTimeout(); }
  }, (timeout || 5000));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getTextFromMic, checkForCorrectPassword, checkForCorrectGoodbye };
