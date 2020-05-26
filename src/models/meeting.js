export default class Meeting {
    constructor(identifiant, date, time, min_power, max_power, description) {
        this.identifiant = identifiant;
        this.date = date;
        this.time = time;
        this.min_power = min_power;
        this.max_power = max_power;
        this.description = description;
    }
}