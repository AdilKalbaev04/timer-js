let stopWatch = {
  sec: 0,
  min: 0,
  hours: 0,
};
let timer;
let timers = [];

const start = function () {
  stopWatch.sec++;
  if (stopWatch.sec >= 60) {
    stopWatch.sec = 0;
    stopWatch.min++;
    if (stopWatch.min >= 60) {
      stopWatch.hours++;
    }
  }

  render();
};

const startTimer = function () {
  if (!timer) {
    timer = setInterval(start, 10);
  }
};

const stopTimer = function () {
  clearInterval(timer);
  timer = null;
};

const format = (units) => (units < 10 ? "0" + units : units);

const resetTimer = () => {
  stopWatch.sec = 0;
  stopWatch.min = 0;
  stopWatch.hours = 0;

  if (!timer) {
    render();
  }
};

const addTimerItem = function (watch) {
  let li = document.createElement("li");
  li.className = "timer-item";
  li.innerHTML = `
    <span>${format(watch.hours)}:${format(watch.min)}:${format(watch.sec)}</span>
    <span class="close">&times;</span>
  `;
  document.querySelector(".list").append(li);
};

const roundTimer = function () {
  timers.push({ ...stopWatch });
  localStorage.setItem("timers", JSON.stringify(timers));
  addTimerItem(stopWatch);
};

const init = function () {
  timers = JSON.parse(localStorage.getItem("timers")) || [];

  timers.forEach((timer) => addTimerItem(timer));
};

const removeItem = function (index) {
  const timers = JSON.parse(localStorage.getItem("timers")) || [];
  if (timers.length) {
    timers.splice(index, 1);
    localStorage.setItem("timers", JSON.stringify(timers));
  }
};

const render = function () {
  document.querySelector(".hours").innerHTML = format(stopWatch.hours);
  document.querySelector(".minutes").innerHTML = format(stopWatch.min);
  document.querySelector(".seconds").innerHTML = format(stopWatch.sec);
};

document.querySelector(".start").addEventListener("click", startTimer);
document.querySelector(".stop").addEventListener("click", stopTimer);
document.querySelector(".reset").addEventListener("click", resetTimer);
document.querySelector(".round").addEventListener("click", roundTimer);

init();

document.querySelector(".list").addEventListener("click", function (event) {
  const items = document.querySelectorAll(".timer-item");
  if (event.target.classList.contains("close")) {
    const timer = event.target.closest(".timer-item");
    const index = [...items].indexOf(timer);
    console.log(index);

    timer.remove();
    removeItem(index);
  }
});
