let intervalId; // Variable to store the interval ID for the timer
let startTime; // Variable to store the start time
let runnerPosition = 0; // Variable to store the runner's position in meters

function startRace() {
    // Clear any existing timer interval
    clearInterval(intervalId);

    // Reset runner position and start time
    runnerPosition = 0;
    startTime = new Date().getTime();

    // Get the selected race distance
    const raceDistance = document.getElementById("race-distance").value;

    // Set up the interval for updating runner position and timer
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
    const runnerSpeed = 5 + windEffect; // Default speed is 5 m/s

    // Calculate the distance covered by the runner
    const distanceCovered = elapsedTimeInSeconds * runnerSpeed;

    // Update the runner position
    runnerPosition = distanceCovered;

    // Update the runner icon position
    moveRunner(runnerPosition);

    // Update the timer display
    updateTimer(elapsedTimeInSeconds);
}

function moveRunner(distance) {
    const trackImage = document.getElementById("track-image");
    const runnerIcon = document.getElementById("runner-icon");
    const trackType = document.getElementById("track-type").value;

    const trackWidth = trackImage.clientWidth;

    // Calculate the percentage position based on the total race distance
    const percentagePosition = (distance / trackWidth) * 100;

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

// Additional function to reset the runner position and timer
function resetRace() {
    clearInterval(intervalId);
    runnerPosition = 0;
    startTime = null;
    moveRunner(runnerPosition);
    updateTimer(0);
}
