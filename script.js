let intervalId; // Variable to store the interval ID for the timer
let startTime; // Variable to store the start time
let runnerDistance = 0; // Variable to store the runner's distance in meters

function startRace() {
    // Clear any existing timer interval
    clearInterval(intervalId);

    // Reset runner distance and start time
    runnerDistance = 0;
    startTime = new Date().getTime();

    // Get the selected race distance
    const raceDistance = document.getElementById("race-distance").value;

    // Set up the interval for updating runner distance and timer
    intervalId = setInterval(function () {
        updateRace(raceDistance);
    }, 1000); // Update every 1 second (adjust as needed)
}

function updateRace(raceDistance) {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    // Calculate runner speed based on wind conditions (headwind or tailwind)
    const windDirection = document.getElementById("wind-direction").value;
    const windSpeed = parseFloat(document.getElementById("wind-speed").value) || 0;
    const windEffect = (windDirection === "headwind") ? -windSpeed : windSpeed;

    // Calculate runner speed (adjust as needed)
    const runnerSpeed = calculateRunnerSpeed() + windEffect; // Default speed is 5 m/s

    // Calculate the distance covered by the runner
    const distanceCovered = elapsedTimeInSeconds * runnerSpeed;

    // Check if the runner has completed the race
    if (runnerDistance >= raceDistance) {
        stopRace();
        displayResults(elapsedTimeInSeconds);
    }

    // Update the runner distance
    runnerDistance += distanceCovered;

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
    const trackImage = document.getElementById("track-image");
    const runnerIcon = document.getElementById("runner-icon");
    const trackType = document.getElementById("track-type").value;

    const trackWidth = trackImage.clientWidth;

    // Calculate the percentage position based on the total race distance
    const percentagePosition = (distance / raceDistance) * 100;

    // Update the runner icon position
    runnerIcon.style.left = percentagePosition + "%";

    // Adjust the icon's top position based on track type
    const trackImageRect = trackImage.getBoundingClientRect();
    const iconHeight = runnerIcon.clientHeight;

    if (trackType === "dirt") {
        const dirtTrackOffset = 20; // You can customize the offset as needed
        const dirtTrackPosition = trackImageRect.top + dirtTrackOffset;
        runnerIcon.style.top = dirtTrackPosition + "px";
    } else {
        const defaultTopPosition = trackImageRect.top + trackImageRect.height / 2 - iconHeight / 2;
        runnerIcon.style.top = defaultTopPosition + "px";
    }
}

function updateDistanceCovered(distance) {
    const distanceCoveredOutput = document.getElementById("runner-distance");
    distanceCoveredOutput.value = distance.toFixed(2);
}

function updateTimer(elapsedTime) {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
    return (num < 10) ? `0${num}` : num;
}

// Function to stop the race
function stopRace() {
    clearInterval(intervalId);
}

// Additional function to reset the runner distance, timer, and output
function resetRace() {
    clearInterval(intervalId);
    runnerDistance = 0;
    startTime = null;
    moveRunner(runnerDistance);
    updateDistanceCovered(runnerDistance);
    updateTimer(0);
}
