/**
 Simple 10 Function game engine
 
 - clickable
 - on
 - show
 - hide
 - play
 - stop
 - repeat
 - setContent
 - random
 - animated
 
 
*/
var ee = new EventEmitter();


// clickable('#buttonStart','startButtonClicked');

function clickable(selector, eventName){
  if (!selector){
    throw "Der erste Parameter muss gefüllt sein";
  }
  
  if(!eventName){
    throw "Der zweite Parameter muss der Name des Events sein";
  }
  
  var element = document.querySelector(selector);
  if (element){
    element.addEventListener('click', function() {
      ee.emitEvent(eventName);
    }, false);

  } else {
    throw "Erster Parameter muss ein Selector für eine vorhandenes HTML Element sein, z.B. '#id' oder '.class' - aktuell wird kein Element gefunden."
  }
}


// on(eventName, function)

function on(eventName, cb){
  if (!eventName){
    throw "Der erste Parameter muss gefüllt sein mit dem Namen des Event";
  }
  if (!cb){
    throw "Der zweite Parameter muss gefüllt sein mit einer Funktion";
  }
  if (typeof cb !== 'function'){
    throw "Der zweite Parameter muss mit einer Funktion gefüllt sein: function(){...}";
  }
  ee.on(eventName, cb);
}


function _showHide( selector, action ) {
  if (!selector){
    throw "Der erste Parameter muss gefüllt sein";
  }
  
  if (document.querySelectorAll(selector).length === 0){
    throw "Erster Parameter muss ein Selector für eine vorhandenes HTML Element sein, z.B. '#id' oder '.class' - aktuell wird kein Element gefunden."
  }

  [].forEach.call(document.querySelectorAll(selector), function( elem ) {
    elem.style.display = action;
  });

}

//hide
function hide(selector){
  _showHide(selector, 'none');
}

//show
function show(selector){
  _showHide(selector, 'block');
}

//audio und video - play
// https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3

var audios = [];
function play(selector){
  //might be a link to a  mp3 file
  if (selector && selector.indexOf('.mp3') >-1){
    var aud = new Audio(selector)
    audios.push(aud);
    aud.play();
  }
  
  //might be a video tag
  if (selector){
    var element = document.querySelector(selector);
    if (element){
      var playPromise = element.play();
    }
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        console.log(error);
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }
  }
}

function stop(){
  //stop all audios
  audios.forEach(function(elem){
    elem.pause();
  });
  audios = [];
  //stop all videos
}



function repeat(callback, seconds){
  //TODO: Add checks
  seconds = seconds || 1;
  var repeater = setInterval(callback, seconds*1000);
  return {
    stop: function(){
      clearInterval(repeater);
    }
  }
}

function setContent(selector, value){
  var element = document.querySelector(selector);
  if (element){
    element.innerHTML = value;
  } else {
    throw "Erster Parameter muss ein Selector für eine vorhandenes HTML Element sein, z.B. '#id' oder '.class' - aktuell wird kein Element gefunden."
  }

}


//animation - envt if animation ends
//Example: https://desandro.github.io/3dtransforms/examples/card-01.html
