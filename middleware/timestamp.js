//we come up with the current timestamp
const current_timestamp = () => {
    let year = new Date().getFullYear();

    let month = new Date().getMonth();

    month = month < 10 ? `0${month}` : month;

    let day = new Date().getDay();

    day = day < 10 ? `0${day}` : day;

    let hour = new Date().getHours();

    hour = hour < 10 ? `0${hour}` : hour;

    let minute = new Date().getMinutes();

    minute = minute < 10 ? `0${minute}` : minute;

    let second = new Date().getSeconds();

    second = second < 10 ? `0${second}` : second;

    return `${year}${month}${day}${hour}${minute}${second}`;

};

module.exports = {
    timestamp : current_timestamp()
};