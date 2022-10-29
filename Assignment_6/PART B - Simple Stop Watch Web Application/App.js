var hour = 0;
var min = 0;
var sec = 0;
var msec = 0;

var hourHeading = document.getElementById("hour");
var minHeading = document.getElementById("min");
var secHeading = document.getElementById("sec");

var interval;

function timer() {
    msec++;
    if(msec >= 100) {
    sec++;
    secHeading.innerHTML = sec;
    msec = 00;
}
    else if(sec >= 60) {
        min++;
        minHeading.innerHTML = min;
        sec = 00;
    }
    else if(min >= 60) {
        hour++;
        hourHeading.innerHTML = hour;
        min = 00;
    }
}


async function start() {
    // const result = await resolveAfter2Seconds();
    interval = setInterval(timer, 10);
    await disableStartBtn();
}


function stop() {
    clearInterval(interval);
    enableStartBtn();
}

function reset() {
    hour = 00;
    min = 00;
    sec = 00;
    hourHeading.innerHTML = hour;
    minHeading.innerHTML = min;
    secHeading.innerHTML = sec;
    stop();
}

function disableStartBtn() {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(document.getElementById("startBtn").disabled = true) ;
        }, 1000);
      });

}

function enableStartBtn() {
    document.getElementById("startBtn").disabled = false;
}