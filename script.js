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
    runnerDistance += elapsedTimeInSeconds * runnerSpeed;

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
    const pace = parseFloat(document.getElementById("pace").value) || 0;
    return 1 / (pace / 60); // Convert pace to speed (meters per second)
}

function moveRunner(distance) {
    // ... (unchanged)
}

function updateDistanceCovered(distance) {
    const distanceCoveredOutput = document.getElementById("runner-distance");
    distanceCoveredOutput.value = distance.toFixed(2);
}

function updateTimer(elapsedTime) {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(elapsedTime);
}

function stopRace() {
    clearInterval(intervalId);
}

function displayResults(elapsedTimeInSeconds) {
    // Display the pace and total time
    const pace = calculatePace(elapsedTimeInSeconds);
    const totalTime = formatTime(elapsedTimeInSeconds);

    alert(`Race completed!\nPace: ${pace} min/mile\nTotal Time: ${totalTime}`);
}

function calculatePace(elapsedTimeInSeconds) {
    const totalMinutes = elapsedTimeInSeconds / 60;
    return totalMinutes / (runnerDistance / 1609.34); // Convert meters to miles
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
