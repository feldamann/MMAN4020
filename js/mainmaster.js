//-----------------------------------Section Start by Danila Loginov------------------------>

// UI elements.
const deviceNameLabel = document.getElementById('device-name');
const terminalContainer = document.getElementById('terminal');
const sendForm = document.getElementById('send-form');
const inputField = document.getElementById('input');
const sol1 = document.getElementById('sol1');
const sol2 = document.getElementById('sol2');
const sol3 = document.getElementById('sol3');
const sol4 = document.getElementById('sol4');
const sol5 = document.getElementById('sol5');
const sol6 = document.getElementById('sol6');
const sol7 = document.getElementById('sol7');
const sol8 = document.getElementById('sol8');
const sol9 = document.getElementById('sol9');
const pumpforward = document.getElementById('pumpforward');
const pumpoff = document.getElementById('pumpoff');
const pumpreverse = document.getElementById('pumpreverse');
const locate = document.getElementById('locate');

const latit = document.getElementById('lat');


var latitude = '0';
var longitude = '0';
var oldtext = '0';
var locationString = '0';
var lat = -34.397;
var long = 150.644;
var pos;
var map, infoWindow;

// Helpers.
const defaultDeviceName = 'Terminal';
const terminalAutoScrollingLimit = terminalContainer.offsetHeight / 2;
let isTerminalAutoScrolling = true;

const scrollElement = (element) => {
  const scrollTop = element.scrollHeight - element.offsetHeight;

  if (scrollTop > 0) {
    element.scrollTop = scrollTop;
  }
};

const logToTerminal = (message, type = '') => {
  terminalContainer.insertAdjacentHTML('beforeend',
      `<div${type && ` class="${type}"`}>${message}</div>`);

  if (isTerminalAutoScrolling) {
    scrollElement(terminalContainer);
  }
};

// Obtain configured instance.
const terminal = new BluetoothTerminal();

// Override `receive` method to log incoming data to the terminal.
terminal.receive = function(data) {
  logToTerminal(data, 'in');
};

// Override default log method to output messages to the terminal and console.
terminal._log = function(...messages) {
  // We can't use `super._log()` here.
  messages.forEach((message) => {
    logToTerminal(message);
    console.log(message); // eslint-disable-line no-console
  });
};

// Implement own send function to log outcoming data to the terminal.
const send = (data) => {
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
};



sendForm.addEventListener('submit', (event) => {
  event.preventDefault();

  send(inputField.value);

  inputField.value = '';
  inputField.focus();
});

// Switch terminal auto scrolling if it scrolls out of bottom.
terminalContainer.addEventListener('scroll', () => {
  const scrollTopOffset = terminalContainer.scrollHeight -
      terminalContainer.offsetHeight - terminalAutoScrollingLimit;

  isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
});


//-----------------------------------Section End by Danila Loginov------------------------>

  //---------------------------Section Start by Kasper Adermann-------------------------------//

function checkResponse() {
  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');
  myHeaders.append('connection', 'close');


  var myInit = {
    method: 'GET',
    headers:myHeaders
  }

  var textrequest = new Request('data/myfile3.log');

  fetch(textrequest,myInit)
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    if (data != oldtext) {
      oldtext = data;
      console.log(data);
      logToTerminal(data, 'in');
    }
  })
}

sol1.addEventListener('click', () => {
  var data = "SOL1"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol2.addEventListener('click', () => {
  var data = "SOL2"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol3.addEventListener('click', () => {
  var data = "SOL3"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol4.addEventListener('click', () => {
  var data = "SOL4"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol5.addEventListener('click', () => {
  var data = "SOL5"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol6.addEventListener('click', () => {
  var data = "SOL6"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol7.addEventListener('click', () => {
  var data = "SOL7"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol8.addEventListener('click', () => {
  var data = "SOL8"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

sol9.addEventListener('click', () => {
  var data = "SOL9"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

pumpforward.addEventListener('click', () => {
  var data = "PUM1"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

pumpreverse.addEventListener('click', () => {
  var data = "PUM2"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

pumpoff.addEventListener('click', () => {
  var data = "PUM0"
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
});

locate.addEventListener('click', () => {
  $.ajax({
      url: 'posrequest.php',
      type: 'POST',
      data: {input:one},
      dataType: 'text',
    })
  setTimeout(getlocation(),5000);
});

function getlocation() {
  var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    myHeaders.append('connection', 'close');
  
  
    var myInit = {
      method: 'GET',
      headers:myHeaders
    }
  
    var textrequest = new Request('data/position.log');
  
    fetch(textrequest,myInit)
    .then(function(response){
      return response.text();
    })
    .then(function(data){
        locationString = data;
        const words = locationString.split('"');
        latit.innerHTML = "Latitude: " + words[5] + "<br>Longitude: " + words[9] + "<br>Altitude: " + words[13] + "<br>Heading: " + words[25] + "<br>Speed: " + words[29];
    })
}


function initial() {

  var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    myHeaders.append('connection', 'close');
  
  
    var myInit = {
      method: 'GET',
      headers:myHeaders
    }
  
    var textrequest = new Request('data/myfile3.log');
  
    fetch(textrequest,myInit)
    .then(function(response){
      return response.text();
    })
    .then(function(data){
        oldtext = data;
    })
}
  
initial();
setInterval(checkResponse,500);

  //---------------------------Section End by Kasper Adermann-------------------------------//