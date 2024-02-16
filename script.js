let intervalId; // Variable to store the interval ID for the timer
let startTime; // Variable to store the start time
let runnerDistance = 0; // Variable to store the runner's distance in meters
let raceDistance = 0; // Variable to store the total race distance

function startRace() {
    // Clear any existing timer interval
    clearInterval(intervalId);

    // Reset runner distance, race distance, and start time
    runnerDistance = 0;
    raceDistance = parseInt(document.getElementById("race-distance").value) || 0;
    startTime = new Date().getTime();

    // Set up the interval for updating runner distance and timer
    intervalId = setInterval(function () {
        updateRace();
    }, 1000); // Update every 1 second (adjust as needed)
}

function updateRace() {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    // Calculate runner speed based on wind conditions (headwind or tailwind)
    const windDirection = document.getElementById("wind-direction").value;
    const windSpeed = parseFloat(document.getElementById("wind-speed").value) || 0;
    const windEffect = (windDirection === "headwind") ? -windSpeed : windSpeed;

    // Calculate runner speed (adjust as needed)
    const runnerSpeed = calculateRunnerSpeed() + windEffect; // Default speed is 5 m/s

    // Calculate the distance covered by the runner
    runnerDistance = calculateDistanceCovered(elapsedTimeInSeconds, runnerSpeed);

    // Check if the runner has completed the race
    if (runnerDistance >= raceDistance) {
        stopRace();
        displayResults(elapsedTimeInSeconds);
    }

    // Update the runner icon position
    moveRunner(runnerDistance);

    // Update the distance covered output
    updateDistanceCovered(runnerDistance);

    // Update the timer display
    updateTimer(elapsedTimeInSeconds);
}

function calculateRunnerSpeed() {
    const paceMinutesPerMile = parseFloat(document.getElementById("pace").value) || 0;
    return 1 / paceMinutesPerMile; // Convert pace to speed (minutes per mile)
}

function calculateDistanceCovered(elapsedTime, speed) {
    return elapsedTime * speed * 60; // Convert speed to distance (miles)
}

function moveRunner(distance) {
    // ... (unchanged)
}

function calculateDistanceCovered(elapsedTime, pace) {
    const elapsedTimeInMinutes = elapsedTime / 60; // Convert elapsed time to minutes
    const distanceCoveredInMiles = elapsedTimeInMinutes * pace; // Calculate distance in miles
    return distanceCoveredInMiles * 1609.34; // Convert miles to meters
}

function updateRace() {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    // Calculate runner speed based on wind conditions (headwind or tailwind)
    const windDirection = document.getElementById("wind-direction").value;
    const windSpeed = parseFloat(document.getElementById("wind-speed").value) || 0;
    const windEffect = (windDirection === "headwind") ? -windSpeed : windSpeed;

    // Calculate runner speed (adjust as needed)
    const paceMinutesPerMile = parseFloat(document.getElementById("pace").value) || 0;
    const runnerSpeed = 1 / paceMinutesPerMile + windEffect; // Convert pace to speed (minutes per mile)

  

function updateTimer(elapsedTime) {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(elapsedTime);
}

function stopRace() {
    clearInterval(intervalId);
}

function displayResults(elapsedTimeInSeconds) {
    // Calculate pace and total time
    const pace = calculatePace(elapsedTimeInSeconds);
    const totalTime = formatTime(elapsedTimeInSeconds);

    // Display the results
    alert(`Race completed!\nAverage Pace: ${formatPace(pace)} per mile\nTotal Time: ${totalTime}`);
}

function calculatePace(elapsedTimeInSeconds) {
    const totalMinutes = elapsedTimeInSeconds / 60;
    const pacePerMile = totalMinutes / (raceDistance / 1609.34); // Convert meters to miles
    return pacePerMile;
}

function formatPace(pace) {
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.floor((pace - paceMinutes) * 60);
    return `${padZero(paceMinutes)}:${padZero(paceSeconds)}`;
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
    return (num < 10) ? `0${num}` : num;
}

function resetRace() {
    stopRace();
    runnerDistance = 0;
    startTime = null;
    moveRunner(runnerDistance);
    updateDistanceCovered(runnerDistance);
    updateTimer(0);
}
