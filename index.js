const clockElement = document.getElementById("clock");
const alarmsListElement = document.getElementById("alarmsList");
const setAlarmButton = document.getElementById("setAlarmButton");

let alarms = [];

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  clockElement.textContent = `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
  checkAlarms(now);
}

function checkAlarms(currentTime) {
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();
  const currentAmpm = currentHours >= 12 ? "PM" : "AM";
  const displayHours = currentHours % 12 || 12;
  alarms.forEach((alarm, index) => {
    if (
      alarm.hours === displayHours &&
      alarm.minutes === currentMinutes &&
      alarm.seconds === currentSeconds &&
      alarm.ampm === currentAmpm
    ) {
      alert("Alarm ringing!");
      removeAlarm(index);
    }
  });
}

function setAlarm() {
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);
  const ampm = document.getElementById("ampm").value;

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter valid time");
    return;
  }

  const alarm = { hours, minutes, seconds, ampm };
  alarms.push(alarm);
  displayAlarms();
}

function displayAlarms() {
  alarmsListElement.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = `${alarm.hours}:${
      alarm.minutes < 10 ? `0${alarm.minutes}` : alarm.minutes
    }:${alarm.seconds < 10 ? `0${alarm.seconds}` : alarm.seconds} ${
      alarm.ampm
    }`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => removeAlarm(index);
    li.appendChild(deleteButton);
    alarmsListElement.appendChild(li);
  });
}

function removeAlarm(index) {
  alarms.splice(index, 1);
  displayAlarms();
}

setAlarmButton.addEventListener("click", setAlarm);

setInterval(updateClock, 1000);
