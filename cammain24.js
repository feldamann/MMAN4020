/*
Copyright 2017 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

// This code is adapted from
// https://cdn.rawgit.com/Miguelao/demos/master/imagecapture.html

// window.isSecureContext could be used for Chrome
var isSecureOrigin = location.protocol === 'https:' ||
location.host === 'localhost';
if (!isSecureOrigin) {
  alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
    '\n\nChanging protocol to HTTPS');
  location.protocol = 'HTTPS';
}

var constraints;
var imageCapture;
var mediaStream;

var grabFrameButton = document.querySelector('button#grabFrame');
var takePhotoButton = document.querySelector('button#takePhoto');

var canvas = document.getElementById('myCanvas');
var img = document.querySelector('img');
var video = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');
var zoomInput = document.querySelector('input#zoom');
var toggle = setInterval(() => {doNothing()},100000);
var oldData = "0";

grabFrameButton.onclick = grabFrame;
takePhotoButton.onclick = takePhoto;
videoSelect.onchange = getStream;

// Get a list of available media input (and output) devices
// then get a MediaStream for the currently selected input device
navigator.mediaDevices.enumerateDevices()
  .then(gotDevices)
  .catch(error => {
    console.log('enumerateDevices() error: ', error);
  })
  .then(getStream);

// From the list of media devices available, set up the camera source <select>,
// then get a video stream from the default camera source.
function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    console.log('Found media input or output device: ', deviceInfo);
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'Camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    }
  }
}

// Get a video stream from the currently selected camera source.
function getStream() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => {
      track.stop();
    });
  }
  var videoSource = videoSelect.value;
  constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .catch(error => {
      console.log('getUserMedia error: ', error);
    });
}

// Display the stream from the currently selected camera source, and then
// create an ImageCapture object, using the video from the stream.
function gotStream(stream) {
  console.log('getUserMedia() got stream: ', stream);
  mediaStream = stream;
  video.srcObject = stream;
  //video.classList.remove('hidden');
  imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  getCapabilities();
}


// Get an ImageBitmap from the currently selected camera source and
// display this with a canvas element.
function grabFrame() {
  imageCapture.grabFrame().then(function(imageBitmap) {

    var image = imageBitmap;
    createImageBitmap(image,{resizeWidth: imageBitmap.width/2, resizeHeight: imageBitmap.height/2, resizeQuality: 'low' })
    .then(function(imageBitmap){
      console.log('Grabbed frame:', imageBitmap);
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
      canvas.classList.remove('hidden');
  
      var dataURL = canvas.toDataURL();
      console.log(dataURL)

      //-----------------------Start of Code Modification by Kasper Adermann ----------------------//
  
      $.ajax({
        type: "POST",
        url: "camera.php",
        data: { 
           imgBase64: dataURL
        }
      }).done(function() {
        console.log('Image Saved')
      });
      //-----------------------End of Code Modification by Kasper Adermann ------------------------//
  
    }).catch(function(error) {
      console.log('resizeframe error',error);
    });

  }).catch(function(error) {
    console.log('grabFrame() error: ', error);
  });
}

//-----------------------Start of Code Modification by Kasper Adermann ----------------------//

function getHB() {
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    myHeaders.append('connection', 'close');


    var myInit = {
      method: 'GET',
      headers:myHeaders
    }

    var textrequest = new Request('data/videosignal.log');

    fetch(textrequest,myInit)
    .then(function(response){
      return response.text();
    })
    .then(function(data){
      if (data == "1" && oldData == "0") {
        toggle = setInterval(() => {grabFrame()},500);
      }
      if (data == "0" && oldData == "1") {
       clearInterval(toggle)
      }
      oldData = data;
    })
}

function doNothing()
{
}

setInterval(getHB,1000);

//-----------------------End of Code Modification by Kasper Adermann ------------------------//