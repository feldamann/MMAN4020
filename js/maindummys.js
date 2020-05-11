//-----------------------------------Section Start by Danila Loginov------------------------>

var isSecureOrigin = location.protocol === 'https:' ||
location.host === 'localhost';
if (!isSecureOrigin) {
  alert('getUserMedia() and WebBluetooth must be run from a secure origin: HTTPS' +
    '\n\nChanging protocol to HTTPS');
  location.protocol = 'HTTPS';
}

// UI elements.
const deviceNameLabel = document.getElementById('device-name');
const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const terminalContainer = document.getElementById('terminal');
const sendForm = document.getElementById('send-form');
const inputField = document.getElementById('input');

var oldtext = 'init'

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

// Switch terminal auto scrolling if it scrolls out of bottom.
terminalContainer.addEventListener('scroll', () => {
  const scrollTopOffset = terminalContainer.scrollHeight -
      terminalContainer.offsetHeight - terminalAutoScrollingLimit;

  isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
});

// Switch terminal auto scrolling if it scrolls out of bottom.
terminalContainer.addEventListener('scroll', () => {
  const scrollTopOffset = terminalContainer.scrollHeight -
      terminalContainer.offsetHeight - terminalAutoScrollingLimit;

  isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
});





// Override `receive` method to log incoming data to the terminal.
terminal.receive = function(inputdata) {

  //---------------------------Section Start by Kasper Adermann-------------------------------//
  logToTerminal(inputdata, 'in');
  $.ajax({
    url: 'client2.php',
    type: 'POST',
    data: {input:inputdata},
    dataType: 'text',
    success: function(data) {
      resolve(data)
    },
    error: function(error) {
      reject(error)
    },
  })
  return new Promise((resolve, reject) => {
    console.log(inputdata)

  })
  //---------------------------Section End by Kasper Adermann-------------------------------//
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

// Bind event listeners to the UI elements.
connectButton.addEventListener('click', () => {
  terminal.connect().
      then(() => {
        deviceNameLabel.textContent = terminal.getDeviceName() ?
            terminal.getDeviceName() : defaultDeviceName;
      });
});

disconnectButton.addEventListener('click', () => {
  terminal.disconnect();
  deviceNameLabel.textContent = defaultDeviceName;
});


//-----------------------------------Section End by Danila Loginov------------------------>

  //---------------------------Section Start by Kasper Adermann-------------------------------//

//sendForm.addEventListener('submit', (event) => {
function sendIt() {
  //event.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');
  myHeaders.append('connection', 'close');


  var myInit = {
    method: 'GET',
    headers:myHeaders
  }

  var textrequest = new Request('../data/myfile2.log');

  fetch(textrequest,myInit)
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    if (data != oldtext) {
      oldtext = data;
      console.log(data);
      send(data);
    }
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

  var textrequest = new Request('../data/myfile2.log');

  fetch(textrequest,myInit)
  .then(function(response){
    return response.text();
  })
  .then(function(data){
      oldtext = data;
  })
}

function getLocation() {

  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');
  myHeaders.append('connection', 'close');


  var myInit = {
    method: 'GET',
    headers:myHeaders
  }

  var textrequest = new Request('../data/positionrequst.log');

  fetch(textrequest,myInit)
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    if (data != "0") {

      $.ajax({
        url: 'posrequest.php',
        type: 'POST',
        data: {input:"0"},
        dataType: 'text',
      })

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    }
  })
}

function showPosition(position) {
  console.log(position)
  $.ajax({
    url: 'position.php',
    type: 'POST',
    data: {input:position},
    dataType: 'text',
  })
}


initial();
setInterval(sendIt,500);
setInterval(getLocation,3000);

  //---------------------------Section End by Kasper Adermann-------------------------------//