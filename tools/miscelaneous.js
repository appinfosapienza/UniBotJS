const fs = require("fs"); // fs is Node's native file system module

//get the debug date
module.exports.formattedDate = () => {
    let d = new Date();
    return "[" + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
        + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
}

//Save the debug info onto a .txt file
module.exports.saveDebug = (content) => {
    fs.writeFile('debug.txt', content, { flag: 'a+' }, err => { });
    console.log(content);
}

//get a number based on the string passed
module.exports.giveDayFromString = (day) => {
    let d = new Date()

    if (day == null) {
        return [this.giveDay(), this.giveDayOfWeek(), d.getDate(), this.giveMonth()]
    }

    day = day.toLowerCase();
    var list = ["errore", capitalize(day), "errore", "errore"]
    switch (day) {
        case "domenica":
            list[0] = "pranzo-0";
            break;
        case "lunedì":
        case "lunedi":
            list[0] = "pranzo-1";
            break;
        case "martedì":
        case "martedi":
            list[0] = "pranzo-2";
            break;
        case "mercoledì":
        case "mercoledi":
            list[0] = "pranzo-3";
            break;
        case "giovedì":
        case "giovedi":
            list[0] = "pranzo-4";
            break;
        case "venerdì":
        case "venerdi":
            list[0] = "pranzo-5";
            break;
        case "sabato":
            list[0] = "pranzo-6";
            break;
    }

    return list;
}

//get a number based on the day of the week
module.exports.giveDay = () => {

    let d = new Date();
    let day = d.getDay();
    return "pranzo-" + day;
}

//return the month in a string format
module.exports.giveMonth = () => {
    let d = new Date();
    let month = d.getMonth();
    switch (month) {
        case 0:
            return "Gennaio";
        case 1:
            return "Febbraio";
        case 2:
            return "Marzo";
        case 3:
            return "Aprile";
        case 4:
            return "Maggio";
        case 5:
            return "Giugno";
        case 6:
            return "Luglio";
        case 7:
            return "Agosto";
        case 8:
            return "Settembre";
        case 9:
            return "Ottobre";
        case 10:
            return "Novembre";
        case 11:
            return "Dicembre";
    }
}

//get the day of the week in a string format
module.exports.giveDayOfWeek = () => {
    let d = new Date();
    let day = d.getDay();
    switch (day) {
        case 0:
            return "Domenica";
        case 1:
            return "Lunedì";
        case 2:
            return "Martedì";
        case 3:
            return "Mercoledì";
        case 4:
            return "Giovedì";
        case 5:
            return "Venerdì";
        case 6:
            return "Sabato";
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
}
