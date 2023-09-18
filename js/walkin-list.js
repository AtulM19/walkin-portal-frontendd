"use strict";

import config from "../config.json" assert { type: "json" };
let API_URL = config.API_URL


async function getWalkinTimeSlotsUsingId(walkin_id) {
    try {
        const apiUrl = `${API_URL}/TimeSlotAvailable/GetTimeSlotUsingWalkinId?id=${walkin_id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
        return null;
        }

        const timeSlotsData = await response.json();
        return timeSlotsData;
    } catch (error) {
        return null;
    }
}

async function getWalkinRolesUsingId(walkin_id) {
    try {
        const apiUrl = `${API_URL}/WalkinRoles/GetRolesUsingWalkinId?id=${walkin_id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) return null;

        const rolesData = await response.json();
        return rolesData;
    } catch (error) {
        return null;
    }
}


async function getWalkinData() {
    try {
        const apiUrl = `${API_URL}/Walkin/GetWalkinData/`;
        const response = await fetch(apiUrl, { rejectUnauthorized: false });
        
        if (!response.ok) return null;

        const walkinData = await response.json();
        return walkinData;
    } catch (error) {
        return null;
    }
}

const date_converter = function (datetime) {
    const date = new Date(datetime);
    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    const formatteddatetime = date
        .toLocaleDateString("en-GB", options)
        .split(" ")
        .join("-");
    return formatteddatetime;
};


const all_cards_container = document.getElementById("main");

async function roles_ele_creator (walkin_id) {
    const roles = await getWalkinRolesUsingId(walkin_id);
    let roles_ele = ``;
    for (let i = 0; i < roles.length; i++) {
        const ele = `
                        <img class="role-img" src=${roles[i].role_logo}>
                        <p class="input-data" id="walkin-role-${walkin_id}-${roles[i].roles_id}">${roles[i].title}</p>
                        ${ i < roles.length - 1 ? `<div class="vl"></div>` : ''}
                    `;
        roles_ele += ele;
    }
    return roles_ele;
}



async function walkinData() {

    const walkins = await getWalkinData();
    
    let all_cards = ``;

    for (const walkin of walkins) {
        
        const roles_ele = await roles_ele_creator(walkin.walkin_id);
        
        const ele = `<div class="allCards">
                        <div>
                        ${walkin.expiry !== null ? 
                            `<div class="expire-div">
                                <p class="expire">Expires in ${walkin.expiry} days</p>
                            </div>`
                            : 
                            "" 
                        }
                            
                            <div class="card shadow">
                                <p class="walkin-title" id="walkin-title-${walkin.walkin_id}">${walkin.walkin_title}</p>
                                <p class="label mb-5">Date & Time:</p>
                                <div class="date-time mb-5">
                                    <span class="input-walkin" id="start-end-date-2"> ${date_converter(walkin.start_date) + " to " + date_converter(walkin.end_date) }</span> 
                                    <div class="vl"></div>
                                    <div class="location">
                                        <img class="loc-img" src="https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/location.svg" alt="">
                                        <span class="label" id="location-${walkin.walkin_id}"> ${walkin.location} </span>
                                    </div>
                                </div>
                                <hr class="custom-hr">
                                <p class="label">Job Roles:</p>
                                <div class="job-roles">
                                  ${roles_ele}
                                </div>
                                ${walkin.internship !== null ? `<p class="internship" id="internship-2"> ${walkin.internship} </p>` : `` }
                                
                                <div class="apply-button">
                                    <button type="button"  class="btn text-dark shadow" id="walkin-details-${walkin.walkin_id}" >VIEW MORE DETAILS</button>
                                </div>
                            </div>
                        </div>
                    </div>`
            ;
        
        all_cards += ele;
    }

    // creating a node and adding the cards to its inner html 
    // and then appending it insde the main container
    const new_ele = document.createElement("div");
    new_ele.innerHTML = all_cards;
    all_cards_container.appendChild(new_ele);
    return walkins;

}


document.addEventListener('DOMContentLoaded', async() => {
    const walkins = await walkinData();
    const buttons = {};
    for (const data of walkins) {
        const dynamic_name = `view_more_button_${data.walkin_id}`;
        buttons[`view_more_button_${data.walkin_id}`] = document.getElementById(`walkin-details-${data.walkin_id}`);
    }

    document.body.addEventListener("click", (e) => {
        const clicked_element = e.target;
        if (clicked_element && clicked_element.id && clicked_element.id.startsWith('walkin-details-')) {
            localStorage.setItem('walkin_id_selected', clicked_element.id[clicked_element.id.length - 1])
            window.location = "../walkin-details.html"
        }
    })
})














































