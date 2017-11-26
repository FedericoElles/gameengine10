/**
 Simple 10 Function game engine
 
 - clickable
 - on
 - show
 - hide
 - sound
 - random
 
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
