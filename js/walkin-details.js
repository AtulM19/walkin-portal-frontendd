"use strict";

import config from "../config.json" assert { type: "json" };
const API_URL = config.API_URL;

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

async function getWalkinDataUsingId(walkin_id) {
  try {
    const apiUrl = `${API_URL}/Walkin/GetWalkinDataUsingId?id=${walkin_id}`;

    const response = await fetch(apiUrl, { rejectUnauthorized: false });

    if (!response.ok) return null;

    const walkinData = await response.json();
    return walkinData;
  } catch (error) {
    return null;
  }
}

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

function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':');

    const hour = parseInt(hours, 10);

    const period = hour < 12 ? 'AM' : 'PM';

    const hour12 = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);

    const time12 = `${hour12}:${minutes} ${period}`;

    return time12;
}




const main = document.getElementById("main"); 


async function roles_ele_creator(walkin_id) {
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

async function timeslot_creator(walkin_id) {
    const timeslots = await getWalkinTimeSlotsUsingId(walkin_id);
    let timeslot_ele = ``;
    for (const timeslot of timeslots) {
        const ele = `
                    <div class="form-check mb-4 ver-align timeslot-container">
                        <input type="radio"  name="selectedTime" value=${convertTo12HourFormat(timeslot.start_time) + " to " + convertTo12HourFormat(timeslot.end_time)} id=${"radio-btn-" + timeslot.timeslot_id} class="form-check-input radio-btn timeslot-input">
                        <label class="form-check-label timeslot-label">${convertTo12HourFormat(timeslot.start_time) + " to " + convertTo12HourFormat(timeslot.end_time)}</label>
                    </div>
                    `;
        timeslot_ele += ele;
    }
    return timeslot_ele;
}

async function roles_checkbox_creator(walkin_id) {
    const roles = await getWalkinRolesUsingId(walkin_id);
    let role_checkbox_ele = ``;
    for (const role of roles) {
        const ele = `
                        <div class="ver-align role-container">
                            <input class="check-btn role-input" id=${"check-btn-" + role.roles_id} type="checkbox" value=${role.title}>
                            <label class="remember"> ${role.title} </label> 
                        </div>
                    `;
        role_checkbox_ele += ele;
    }
    return role_checkbox_ele;
}

async function roles_details_creator(walkin_id) {
    const roles = await getWalkinRolesUsingId(walkin_id);
    let roles_details = ``
    for (const role of roles) {
        const ele = `
                            <div>
                                <div class="role-header">
                                    <span class="education-title" id="title">${role.title}</span>
                                    <div class="vertical-line"></div>
                                    <button class="btn-role"><img class="expand img-role" id=${"walkin-role-" + role.roles_id} src="https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/expand-less.svg" alt=""> </button>
                                </div>
                                <div class="role-desc">
                                    <div class="inner-content">
                                        <div>
                                            <p class="label">Gross Compensation Package :</p>
                                            <p class="input-data" id="package">${role.package}</p>
                                        </div>
                                        <hr class="custom-hr">
                                        <div>
                                            <p class="label">Role Description :</p>
                                            <p class="input-data" id="generate-instructional-strategies">${"- " + JSON.parse(role.role_description).generate_instructional_strategies} }</p>
                                            <p class="input-data" id="develop-course-structure">${"- " + JSON.parse(role.role_description).develop_course_structure}</p>
                                            <p class="input-data" id="construct-testing-strategies">${"- " + JSON.parse(role.role_description).construct_testing_strategies}</p>
                                            <p class="input-data" id="address-usability-issues">${"- " + JSON.parse(role.role_description).address_usability_issues}</p>
                                            <p class="input-data" id="stay-updated-on-trends">${"- " + JSON.parse(role.role_description).stay_updated_on_trends}</p>
                                            <p class="input-data" id="ensure-global-standards">${"- " + JSON.parse(role.role_description).ensure_global_standards}</p>
                                            <p class="input-data" id="prepare-design-checklists">${"- " + JSON.parse(role.role_description).prepare_design_checklists}</p>
                                            <p class="input-data" id="ensure-quality-assurance">${"- " + JSON.parse(role.role_description).ensure_quality_assurance}</p>
                                        </div>
                                        <hr class="custom-hr">
                                        <div>
                                            <p class="label">Requirements :</p>
                                            <p class="input-data" id="experience-instructional-planning">${"- " + JSON.parse(role.role_requirements).experience_instructional_planning}</p>
                                            <p class="input-data" id="media-usage-experience">${"- " + JSON.parse(role.role_requirements).media_usage_experience}</p>
                                            <p class="input-data" id="familiarity-instructional-design">${"- " + JSON.parse(role.role_requirements).familiarity_instructional_design}</p>
                                            <p class="input-data" id="awareness-elearning-trends">${"- " + JSON.parse(role.role_requirements).awareness_elearning_trends}</p>
                                            <p class="input-data" id="client-consulting-skills">${"- " + JSON.parse(role.role_requirements).client_consulting_skills}</p>
                                            <p class="input-data" id="ability-guide-clients">${"- " + JSON.parse(role.role_requirements).ability_guide_clients}</p>
                                            <p class="input-data" id="strong-meeting-skills">${"- " + JSON.parse(role.role_requirements).strong_meeting_skills}</p>
                                            <p class="input-data" id="web-understanding">${"- " + JSON.parse(role.role_requirements).web_understanding}</p>
                                            <p class="input-data" id="education-degree">${"- " + JSON.parse(role.role_requirements).education_degree}</p>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        `;
        roles_details += ele;
    }
    return roles_details;
}


async function all_cards() {
    const id = localStorage.getItem('walkin_id_selected')
    const walkin = await getWalkinDataUsingId(id);
    const roles = await getWalkinRolesUsingId(id);
    const timeslot_ele = await timeslot_creator(id);
    const roles_available = await roles_ele_creator(id); 
    const roles_checkbox_ele = await roles_checkbox_creator(id); 
    const role_details = await roles_details_creator(id); 
    localStorage.setItem("walkin_date_selected", date_converter(walkin[0].start_date))
    
    // console.log("walkin data " , walkin[0]);
    // console.log("walkin roles ", roles);
    // console.log(walkin[0].walkin_title);

    const cards_ele = `
                        <div class="allCards">
                            <div class="card">
                                <div class="card-pad">
                                    <div class="card-header">
                                        <span class="walkin-title" id="walkin-title-${walkin[0].walkin_id}">${walkin[0].walkin_title}  </span>
                                        <button class="btn btn-apply" id="btn-apply">Apply</button>
                                    </div>
                                    <p class="label mb-4">Date & Time:</p>
                                    <div class="date-time">
                                        <span class="input-data" id="start-end-date"> ${date_converter(walkin[0].start_date) + " to " + date_converter(walkin[0].end_date)}   </span>
                                        <div class="vl"></div>
                                        <div class="location ver-align">
                                            <img class="loc-img" src="https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/location.svg" alt="">
                                            <span class="label" id="location"> ${walkin[0].location} </span>
                                        </div>
                                    </div>
                                    <hr class="custom-hr">
                                    <p class="label">Job Roles:</p>
                                    <div class="job-roles">
                                        ${roles_available}
                                    </div>
                                </div>

                                
                                <div>
                                    <div class="qualification-header">
                                        <span class="education-title">Pre-requisites & Application Process</span>
                                        <div class="vertical-line"></div>
                                        <button class="btn-accordion"><img class="expand img-acc" src="https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/expand-less.svg" alt=""> </button>
                                    </div>
                                    <div class="content">
                                        <div class="inner-content">
                                            <div>
                                                <p class="label">General Instructions :</p>
                                                <p class="input-data" id="indemnity-period">${"- " + JSON.parse(walkin[0].general_instruction).indemnity_period}</p>
                                                <p class="input-data" id="previous-test-condition">${"- " + JSON.parse(walkin[0].general_instruction).previous_test_condition}</p>
                                            </div>
                                            <hr class="custom-hr">
                                            <div>
                                                <p class="label">Instructions for the Exam :</p>
                                                <p class="input-data" id="login-time">${"- " + JSON.parse(walkin[0].exam_instruction).login_time}</p>
                                                <p class="input-data" id="video-permission">${"- " + JSON.parse(walkin[0].exam_instruction).video_permission}</p>
                                                <p class="input-data" id="camera-functionality">${"- " + JSON.parse(walkin[0].exam_instruction).camera_functionality}</p>
                                                <p class="input-data" id="webcam-requirement">${"- " + JSON.parse(walkin[0].exam_instruction).webcam_requirement}</p>
                                                <p class="input-data" id="proctor-monitoring">${"- " + JSON.parse(walkin[0].exam_instruction).proctor_monitoring}</p>
                                                <p class="input-data" id="recommended-setup">${"- " + JSON.parse(walkin[0].exam_instruction).recommended_setup}</p>
                                                <p class="input-data" id="ios-not-supported">${"- " + JSON.parse(walkin[0].exam_instruction).ios_not_supported}</p>
                                            </div>
                                            <hr class="custom-hr">
                                            <div>
                                                <p class="label">Minimum System Requirements :</p>
                                                <p class="input-data" id="system-condition">${"- " + JSON.parse(walkin[0].min_system_requirement).system_condition}</p>
                                                <p class="input-data" id="browser-requirement">${"- " + JSON.parse(walkin[0].min_system_requirement).browser_requirement}</p>
                                                <p class="input-data" id="internet-speed">${"- " + JSON.parse(walkin[0].min_system_requirement).internet_speed}</p>
                                                <p class="input-data" id="restrictions">${"- " + JSON.parse(walkin[0].min_system_requirement).restrictions}</p>
                                            </div>
                                            <hr class="custom-hr">
                                            <div>
                                                <p class="label">Process :</p>
                                                <p class="input-data mb-5" id="rounds">${"- " + JSON.parse(walkin[0].process).rounds}</p>
                                                <p class="input-data" id="round-i">${"- " + JSON.parse(walkin[0].process).round_i}</p>
                                                <p class="input-data mb-5" id="aptitude-test">${"- " + JSON.parse(walkin[0].process).aptitude_test}</p>
                                                <p class="input-data" id="round-ii">${"- " + JSON.parse(walkin[0].process).round_ii}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> 

                        </div>
                    `;
    
    const card_time = `
                        <div class="cardTime">
                            <p class="mb-5 card-time-title">Time Slots & Preferences</p>
                            <form>

                                <div class="mb-20">
                                    <label class="label mb-4">Select a Time Slot : </label>
                                    <div class="radio-container">
                                        ${timeslot_ele}
                                    </div>
                                </div>

                                <hr class="custom-hr mb-20">

                                <div class="mb-20">
                                    <label for="preferredRole" class="label mb-4">Select Your Preference :</label>
                                    <div class="check" >
                                        ${roles_checkbox_ele}
                                    </div>
                                </div>
                                    
                                <hr class="custom-hr mb-20">

                                <div class="resume" >
                                    <img class="upload" src="https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/Upload_green_24dp.svg" alt="">
                                    <input type="file" name="resume-input" id="resume-input" class="resume-input">
                                    <label class="resume-text" for="resume-input">UPLOAD UPDATED RESUME</label>
                                </div>

                            </form>
                        </div>
                
                    `;
    
    const new_ele = document.createElement('div');
    new_ele.innerHTML = cards_ele + card_time + role_details;

    main.appendChild(new_ele);
    return walkin[0].walkin_id;
}


document.addEventListener('DOMContentLoaded', async() => {
    const walkin_id = await all_cards();
    const up = document.getElementById("up");
    up.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });

    // prereq elements
    const acc = document.querySelector(".btn-accordion");
    const img_acc = document.querySelector(".img-acc");
    const panel = document.querySelector(".content");

    // role elements
    const btn_role = document.querySelectorAll(".btn-role");
    const img_role = document.querySelectorAll(".img-role");
    const role_desc = document.querySelectorAll(".role-desc");

    // Apply button
    const btn_apply = document.getElementById("btn-apply");


    const accordion = function (ele, img) {
      if (!ele.style.maxHeight) {
        img.src = "https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/expand-more.svg";
        ele.style.maxHeight = ele.scrollHeight + "px";
      } else {
        img.src = "https://s3-ap-south-1.amazonaws.com/walkin-portal-file-server/assets/icons/expand-less.svg";
        ele.style.maxHeight = null;
      }
    };

    for (let i = 0; i < btn_role.length; i++) {
        btn_role[i].addEventListener('click', () => {
            accordion(role_desc[i], img_role[i]);
        })
    }

    const prereq = function () {
      accordion(panel, img_acc);
    };

    acc.addEventListener("click", prereq);

    const timeslot_input = document.getElementsByClassName("timeslot-input");
    const role_input = document.getElementsByClassName("role-input");
    const timeslot_label = document.getElementsByClassName("timeslot-label");

    const is_timeslot_selected = function () {
        for (const inp of timeslot_input) {
            if(inp.checked) return true;
        }
        return false;
    }

    const is_role_selected = function () {
        for (const inp of role_input) {
            if(inp.checked) return true;
        }
        return false;
    }


    const check = function () {
      if (is_timeslot_selected() && is_role_selected() ) {
        btn_apply.style.filter = "opacity(1)";
      } else {
        btn_apply.style.filter = "opacity(0.7)";
      }
    };

    const add_listener = function () {
        for (const inp of timeslot_input) {
            inp.addEventListener('click', check)
        }
        for (const inp of role_input) {
            inp.addEventListener('click', check)
        }
    }

    add_listener()

    const selected_timeslot = function () {
        for (let i = 0; i < timeslot_input.length; i++) {
            if (timeslot_input[i].checked) {
                localStorage.setItem("timeslot_selected", timeslot_label[i].textContent)
            }
        } 
    }

    // const post_data = function() {
    //     if (is_timeslot_selected() && is_role_selected()) {
    //         const obj = {
    //             walkin_id: walkin_id,
    //             timeslot_id: selected_timeslot(),
    //             user_id: localStorage.getItem('user_id'),
    //         }
    //     }
    // }

    btn_apply.addEventListener('click', function (e) {
        e.preventDefault();
        selected_timeslot();
        window.location = '../hall-ticket.html'
    })


})
