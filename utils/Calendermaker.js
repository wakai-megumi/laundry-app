import moment from "moment";

const calendermaker = (dayscount, setDates) => {
    const dates = [];
    for (let i = 0; i < dayscount; i++) {
        const day = moment().add(i, 'days');
        dates.push(day);
    }
    setDates(dates);


}

export { calendermaker };