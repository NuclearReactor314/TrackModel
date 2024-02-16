let intervalId; // Variable to store the interval ID for the timer
const metersPerLap = 400; // Define the distance for one lap in meters

function startRace() {
    // Clear any existing timer interval
    clearInterval(intervalId);

    // Start the timer
    const startTime = new Date().getTime();

    // Get the selected race distance
    const raceDistance = document.getElementById("race-distance").value;

    // Set up the interval for updating runner position
    intervalId = setInterval(function () {
        updateRunnerPosition(startTime, metersPerLap, raceDistance);
    }, 1000); // Update every 1 second (adjust as needed)
}

function updateRunnerPosition(startTime, metersPerLap, raceDistance) {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    // Calculate the total distance covered
    const totalDistance = elapsedTimeInSeconds / metersPerLap * 400;

    // Calculate the current position as a percentage of the race distance
    const currentPosition = (totalDistance / raceDistance) * 100;

    // Update the runner icon position
    const runnerPositionInput = document.getElementById("runner-position");
    runnerPositionInput.value = currentPosition.toFixed(2);
    moveRunner();
}

// Function to stop the race
function stopRace() {
    clearInterval(intervalId);
}

// Additional function to reset the runner position
function resetRunner() {
    clearInterval(intervalId);
    document.getElementById("runner-position").value = 0;
    moveRunner();
}

function moveRunner() {
    const runnerPositionInput = document.getElementById("runner-position");
    const trackImage = document.getElementById("track-image");
    const runnerIcon = document.getElementById("runner-icon");
    const trackType = document.getElementById("track-type").value;

    if (runnerPositionInput.value && runnerPositionInput.value >= 0 && runnerPositionInput.value <= 100) {
        const percentagePosition = parseFloat(runnerPositionInput.value);
        const trackWidth = trackImage.clientWidth;

        const iconPosition = (percentagePosition / 100) * trackWidth;
        runnerIcon.style.left = iconPosition + "px";

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
    } else {
        alert("Please enter a valid runner position (0-100).");
    }
}
