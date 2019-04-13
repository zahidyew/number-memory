const digitElem = document.getElementById("digit");
const timerElem = document.getElementById("timer");
const plus = document.getElementById("plus")
const minus = document.getElementById("minus");
const button = document.getElementById("generate");
const resetButton = document.getElementById("reset");
const output = document.getElementById("output");
const checkAnsButton = document.getElementById("checkAns");
const answerElem = document.getElementById("answer");
var number;

plus.addEventListener("click", addSeconds);
minus.addEventListener("click", minusSeconds);
button.addEventListener("click", clickGenerate);
resetButton.addEventListener("click", reset);

resetButton.disabled = true;
checkAnsButton.style.visibility = "hidden";
answerElem.style.visibility = "hidden";

// add 1sec every time + is clicked 
function addSeconds() {
   let timer = parseInt(timerElem.innerText);

   // max is 60secs
   if (timer != 60) {
      timer += 1;
   }

   if (timer < 10) {
      timerElem.innerText = "0" + timer;
   } else {
      timerElem.innerText = timer;
   }
}

// minus 1sec every time - is clicked
function minusSeconds() {
   let timer = parseInt(timerElem.innerText);

   if (timer != 0) {
      timer -= 1;
   }

   if (timer < 10) {
      timerElem.innerText = "0" + timer;
   } else {
      timerElem.innerText = timer;
   }
}

// called when "Generate" is clicked
function clickGenerate() {
   let digit = parseInt(digitElem.value);

   number = generateNumber(digit);

   button.disabled = true;
   resetButton.disabled = false;

   output.innerText = number;

   // timerUp is a global variable.
   // (variables without var/let/const is automatically global)
   timerUp = setInterval(countdown, 1000);
}

function generateNumber(digit) {
   let max = 16;
   let num = "";

   // if textfield is empty, default digit length is 6
   isNaN(digit) ? digit = 6 : digit = digit;

   let loop = Math.floor(digit/max);
   let remainder = digit % max;
   let mDigit = max;
   //console.log(loop + " " + remainder);

   // create 16 random numbers each loop
   for (let i = 0; i < loop; i++) {
      max = Math.pow(10, mDigit);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1) + min);
      num += number + "\n";
   }
   
   // create remaining numbers(<16)
   if(remainder > 0) {
      max = Math.pow(10, remainder);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1) + min);
      num += number;
      //console.log(num);
      //console.log(num.length);
   }
   return num;
}

//
function countdown() {
   let timer = parseInt(timerElem.innerText);

   minusSeconds();

   if (timer == 0) {
      clearInterval(timerUp);

      output.innerText = "";
      answerElem.style.visibility = 'visible';

      checkAnsButton.style.visibility = 'visible';
      checkAnsButton.addEventListener("click", checkTheAnswer);
   }
}

function checkTheAnswer() {
   let answer = answerElem.value;

   output.innerText = number;
   checkAnsButton.style.visibility = 'hidden';
   /* output.innerText === "" ? output.innerText = number : output.innerText = "";  */

   answer == number ? alert("Correct") : alert("Wrong Answer");
}

function reset() {
   //let timer = parseInt(timerElem.innerText);
   button.disabled = false;
   timerElem.innerText = "05";
   output.innerText = "000000";
   checkAnsButton.style.visibility = "hidden";
   answerElem.value = "";
   answerElem.style.visibility = "hidden";

   clearInterval(timerUp);
}

// binding ENTER to generateNumber func
document.onkeydown = function (key) {
   key = key || window.event;
   switch (key.which || key.keyCode) {
      case 13: //13 is ASCII for Enter
         if(!button.disabled && digitElem === document.activeElement)
            clickGenerate();
         else if (output.innerText === "" && answerElem === document.activeElement)
            checkTheAnswer();
         break;
   }
}