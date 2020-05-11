// /** draw.js **/
//Author: Kasper Adermann

var startSend = document.querySelector('button#startVideo');
startSend.onclick = startVideo;

var stopSend = document.querySelector('button#stopVideo');
stopSend.onclick = stopVideo;

var canvas = document.getElementById('myCanvas');

var toggle = setInterval(() => {doNothing()},100000);
var zero = "0"
var one = "1"

function grabFrame()
{
    var img  = new Image();

    img.onload = function() {
        canvas.width  = img.width;
        canvas.height = img.height;
        console.log(canvas.width,canvas.height)

        var context = canvas.getContext("2d");

        context.drawImage(img, 0, 0);
        canvas.classList.remove('hidden');
    }

    var d = new Date();
    img.src = "images/photo.png?ver="+ d.getTime();
};

function startVideo()
{
    $.ajax({
        url: 'videoHB.php',
        type: 'POST',
        data: {input:one},
        dataType: 'text',
        success: function(data) {
          resolve(data)
        },
        error: function(error) {
          reject(error)
        },
      })

    toggle = setInterval(() => {
        grabFrame()}
        ,500);
};

function stopVideo()
{
    clearInterval(toggle);
    $.ajax({
        url: 'videoHB.php',
        type: 'POST',
        data: {input:zero},
        dataType: 'text',
        success: function(data) {
          resolve(data)
        }
      })
}

function doNothing()
{
}
