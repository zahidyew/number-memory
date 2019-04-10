const digitElem = document.getElementById("digit");
const timerElem = document.getElementById("timer");
const plus = document.getElementById("plus")
const minus = document.getElementById("minus");
const button = document.getElementById("generate");
const resetButton = document.getElementById("reset");
const showAnsButton = document.getElementById("showAns");
const output = document.getElementById("output");

plus.addEventListener("click", addSeconds);
minus.addEventListener("click", minusSeconds);
button.addEventListener("click", clickGenerate);
resetButton.addEventListener("click", reset);

resetButton.disabled = true;
showAnsButton.style.visibility = 'hidden';

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

   let number = generateNumber(digit);

   button.disabled = true;
   resetButton.disabled = false;

   output.innerText = number;

   // timerUp is a global variable.
   // (variables without var/let/const is automatically global)
   timerUp = setInterval(countdown, 1000, number);
}

function generateNumber(digit) {
   let max = 16;

   // if textfield is empty, default digit length is 6
   isNaN(digit) ? digit = 6 : digit = digit;

   if (digit > max) {
      let num = "";
      /* let n = "";
      let i = digit - max;

      max = Math.pow(10, max);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1) + min);
      n += number;

      max = Math.pow(10, i);
      min = max / 10;
      number = Math.floor(Math.random() * (max - min + 1) + min);
      n += number; */

      if(digit % max === 0) {
         let loop = digit/max;
         let mDigit = max;

         for(let i = 0; i < loop; i++) {
            max = Math.pow(10, mDigit);
            let min = max / 10;
            let number = Math.floor(Math.random() * (max - min + 1) + min);
            num += number;
            //console.log(num);
         }
         return num;
      }
      else {
         let loop = Math.floor(digit/max);
         let remainder = digit % max;
         console.log(loop + " " + remainder);

         let mDigit = max;

         for (let i = 0; i < loop; i++) {
            max = Math.pow(10, mDigit);
            let min = max / 10;
            let number = Math.floor(Math.random() * (max - min + 1) + min);
            num += number;
            console.log(num);
            console.log(num.length);
         }
         max = Math.pow(10, remainder);
         let min = max / 10;
         let number = Math.floor(Math.random() * (max - min + 1) + min);
         num += number;
         console.log(num);
         console.log(num.length);

         return num;
      }
   }
   else {
      max = Math.pow(10, digit);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1) + min);
      return number;
   }

   //return number;
   //output.innerText = number;
}

//
function countdown(number) {
   let timer = parseInt(timerElem.innerText);

   minusSeconds();

   if (timer == 0) {
      clearInterval(timerUp);

      output.innerText = "";
      showAnsButton.style.visibility = 'visible';
      showAnsButton.addEventListener("click",
         () => { 
            output.innerText = number;
            /* output.innerText === "" ? output.innerText = number : output.innerText = "";  */
         });
   }
}

function reset() {
   //let timer = parseInt(timerElem.innerText);

   button.disabled = false;
   timerElem.innerText = "05";
   output.innerText = "Generated number here";
   showAnsButton.style.visibility = 'hidden';

   clearInterval(timerUp);
}

// binding ENTER to generateNumber func
document.onkeydown = function (key) {
   key = key || window.event;
   switch (key.which || key.keyCode) {
      case 13: //13 is ASCII for Enter
         if(!button.disabled)
            clickGenerate();
         break;
   }
}

/* function generate(n) {
      var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

      if (n > max) {
         return generate(max) + generate(n - max);
      }

      max = Math.pow(10, n + add);
      var min = max / 10; // Math.pow(10, n) basically
      var number = Math.floor(Math.random() * (max - min + 1)) + min;

      return ("" + number).substring(add);
   } */