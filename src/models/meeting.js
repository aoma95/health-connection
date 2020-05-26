export default class Meeting {
    constructor(identifiant, date, hour, min_power, max_power, description) {
        this.identifiant = identifiant;
        this.date = date;
        this.hour = hour;
        this.min_power = min_power;
        this.max_power = max_power;
        this.description = description;
    }
}