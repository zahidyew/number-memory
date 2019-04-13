const startButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");
const speechText = document.getElementById("speech");

startButton.addEventListener("click", () => recognition.start());
stopButton.addEventListener("click", () => recognition.stop());

try {
   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   var recognition = new SpeechRecognition();
}
catch (e) {
   console.error(e);
   alert(e);
   /* $('.no-browser-support').show();
   $('.app').hide(); */
}

recognition.onstart = function () {
   /* console.log('Voice recognition activated. Try speaking into the microphone.'); */
   alert("Voice recognition activated. Try speaking into the microphone.");
}

recognition.onspeechend = function () {
   alert("You were quiet for a while so voice recognition turned itself off.");
}

recognition.onerror = function (event) {
   if (event.error == 'no-speech') {
      alert("No speech was detected. Try again.");
   };
}

recognition.onresult = function (event) {

   // event is a SpeechRecognitionEvent object.
   // It holds all the lines we have captured so far. 
   // We only need the current one.
   let current = event.resultIndex;

   // Get a transcript of what was said.
   let transcript = event.results[current][0].transcript;

   // Add the current transcript to the contents of our Note.
   console.log(transcript);
   speechText.innerText = transcript;

   if (parseInt(output.innerText) == parseInt(speechText.innerText)) {
      console.log("true");
   }
}