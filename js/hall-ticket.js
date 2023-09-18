"use strict";

// import config from "../config.json" assert { type: "json" };
// const API_URL = config.API_URL;

const date_and_time = document.getElementById("date-and-time");

const getDateSuffix = function (day) {
    if (day >= 11 && day <= 13) {
        return "th";
    } else {
        switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
        }
    }
}


document.addEventListener('DOMContentLoaded',  async() => {
    const timeslot = localStorage.getItem('timeslot_selected');
    const walkin_id = localStorage.getItem("walkin_id_selected");
    const walkin_date = localStorage.getItem("walkin_date_selected");

    const val = walkin_date.split("-")
    const suffix = getDateSuffix(val[0])

    const ele = `
                    <p class="input-data">
                        <span class="span-margin">${val[0].trim()}</span>
                        <sup>${suffix}</sup> 
                        <span>${val[1] + " " + val[2]}</span>
                    </p>
                    <div>
                        <span class="input-data">${timeslot}</span>  
                    </div>
                `;
    const new_ele = document.createElement('div');
    new_ele.innerHTML = ele
    date_and_time.appendChild(new_ele);
})