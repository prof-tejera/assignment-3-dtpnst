export default class Duration {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    getTotalSeconds() {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    formatDuration() {
        const formattedHours = String(Math.floor(this.hours)).padStart(2, '0');
        const formattedMinutes = String(Math.floor(this.minutes)).padStart(2, '0');
        const formattedSeconds = String(Math.floor(this.seconds)).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      }
}
