export default class Duration {
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.totalSeconds = minutes * 60 + seconds;
    }

    formatDuration() {
        const minutes = Math.floor((this.totalSeconds % 3600) / 60);
        const seconds = this.totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}
