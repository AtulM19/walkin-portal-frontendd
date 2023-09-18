'use strict'

import config from "../config.json" assert { type: "json" };
const AWS_BASE_URL = config.AWS_BASE_URL;
const ACCESS_KEY_ID = config.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = config.SECRET_ACCESS_KEY;
const REGION = config.REGION;

AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION, 
});


const s3 = new AWS.S3();


// the code for displaying and hiding notice period details 
// when the option of fresher or experienced is selected
const conditional = document.getElementById('conditional')
const experienced = document.getElementById('experienced')
const fresher = document.getElementById('fresher')
experienced.addEventListener('click', (e) => {
    if (experienced.checked === true) {
        conditional.classList.remove('hidden')
    }
    else {
        conditional.classList.add('hidden')
    }
})
fresher.addEventListener('click', (e) => {
    if (fresher.checked === true) {
        conditional.classList.add('hidden')
    }
})







// Validating user inputs for each click for page 1
const firstname = document.getElementById('fname')
const lastname = document.getElementById('lname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const resume_input = document.getElementById('resume-input')
const portfolio = document.getElementById('portfolio')
const referral = document.getElementById('referral')
const photo = document.getElementById('profile-image-input')
// list of nodes
const preferred_roles = document.getElementsByClassName("check-btn-preferred-roles")
const job_related_updates = document.getElementById("rem")


// Validating user inputs for each click for page 2
const percentage = document.getElementById('percentage')
const pass_year = document.getElementById("pass-year")
const qualification = document.getElementById("qualification")
const stream = document.getElementById("stream")
const college = document.getElementById("college")
const other_college = document.getElementById("other-college")
const college_location = document.getElementById("college-location")
// fresher and experienced are already selected above
const years_of_experience = document.getElementById("years-of-experience")
const current_ctc = document.getElementById("current-ctc")
const expected_ctc = document.getElementById("expected-ctc")
const other_expertise_tech = document.getElementById("other-expertise-tech")
const other_familiar_tech = document.getElementById("other-familiar-tech")
const notice_period_yes = document.getElementById("notice-period-yes")
const notice_period_no = document.getElementById("notice-period-no")
const notice_period_date = document.getElementById("notice-period-date")
const notice_period_month = document.getElementById("notice-period-month")
const appeared_for_zeus_yes = document.getElementById("appeared-for-zeus-yes")
const appeared_for_zeus_no = document.getElementById("appeared-for-zeus-no")
const previously_applied_role = document.getElementById("previously-applied-role")

// list of nodes
const tech_expertise_in = document.getElementsByClassName("check-btn-tech-expertise")
const tech_familiar_in = document.getElementsByClassName("check-btn-tech-familiar")



const personal_info_container = document.getElementById("personal-info-container")
const qualifications_container = document.getElementById("qualifications-container")
const submit_container = document.getElementById("submit-container")
const btn_next_personal_info = document.getElementById("btn-next-personal-info")
const btn_prev_qualifications = document.getElementById("btn-prev-qualifications") 
const btn_next_qualifications = document.getElementById("btn-next-qualifications")
const btn_prev_submit = document.getElementById("btn-prev-submit")
const btn_create_submit = document.getElementById("btn-create-submit")

// submit page
// submit page Personal Information
const fname_preview = document.getElementById('fname-preview');
const lname_preview = document.getElementById('lname-preview');
const email_preview = document.getElementById('email-preview');
const phone_preview = document.getElementById('phone-preview');
const resume_preview = document.getElementById('resume-preview');
const portfolio_url_preview = document.getElementById('portfolio-url-preview');
const selected_roles_preview = document.getElementById('selected-roles-preview');
const referral_preview = document.getElementById('referral-preview');
const is_notice_period_preview = document.getElementById('is-notice-period-preview');
const notice_period_date_preview = document.getElementById('notice-period-date-preview');
const notice_period_month_preview = document.getElementById('notice-period-month-preview');
const appeared_for_zeus_preview = document.getElementById('appeared-for-zeus-preview');
const appeared_for_role_preview = document.getElementById('appeared-for-role-preview');

// submit page Profile Picture
const profile_image_preview = document.getElementById('profile-image-preview');

// submit page Qualifications
const percentage_preview = document.getElementById('percentage-preview');
const passing_year_preview = document.getElementById('passing-year-preview');
const qualification_preview = document.getElementById('qualification-preview');
const stream_preview = document.getElementById('stream-preview');
const college_preview = document.getElementById('college-preview');
const other_college_preview = document.getElementById('other-college-preview');
const college_location_preview = document.getElementById('college-location-preview');
const applicant_type_preview = document.getElementById('applicant-type-preview');
const years_of_experience_preview = document.getElementById('years-of-experience-preview');
const current_ctc_preview = document.getElementById('current-ctc-preview');
const expected_ctc_preview = document.getElementById('expected-ctc-preview');
const expertise_tech_preview = document.getElementById('expertise-tech-preview');
const other_expertise_tech_preview = document.getElementById('other-expertise-tech-preview');
const familiar_tech_preview = document.getElementById('familiar-tech-preview');
const other_familiar_tech_preview = document.getElementById('other-familar-tech-preview');








// reads profile image and adds to profile image preview
const photo_viewer = function () {
  const selectedFile = photo.files[0];

  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profile_image_preview.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  } else {
    profile_image_preview.src = "#";
  }
};


// performs input validation on personal information page and moves to the qualification page
btn_next_personal_info.addEventListener("click", () => {
    let isPreferredRoleSelected = false;
    for (const checkbox of preferred_roles) {
        if (checkbox.checked) {
            isPreferredRoleSelected = true;
            break; 
        }
    }
    if (
        firstname.value.trim() === '' ||
        lastname.value.trim() === '' ||
        email.value.trim() === '' ||
        phone.value.trim() === '' ||
        resume_input.value.trim() === '' ||
        !isPreferredRoleSelected ||
        !job_related_updates.checked
    ) {
        alert('Please fill in all required fields and select at least one preferred job role.');
    } else {
        personal_info_container.classList.add("hide-container");
        qualifications_container.classList.remove("hide-container");
        window.scrollTo(0, 0);
    }

})


// moves back to the personal info page from qualifications page
btn_prev_qualifications.addEventListener('click', () => {
    personal_info_container.classList.remove("hide-container");
    if(!qualifications_container.classList.contains("hide-container"))qualifications_container.classList.add("hide-container");
    if(!submit_container.classList.contains("hide-container"))submit_container.classList.add("hide-container");
    window.scrollTo(0, 0);
})


// performs input validations on the qualifications page and moves to the preview page
btn_next_qualifications.addEventListener('click', () => {
    let isTechExpertiseSelected = false;
    for (const checkbox of tech_expertise_in) {
        if (checkbox.checked) {
            isTechExpertiseSelected = true;
            break; 
        }
    }
    
    let isTechFamiliarSelected = false;
    for (const checkbox of tech_familiar_in) {
        if (checkbox.checked) {
            isTechFamiliarSelected = true;
            break; 
        }
    }

    if (
      percentage.value.trim() === "" ||
      pass_year.value.trim() === "" ||
      qualification.value.trim() === "" ||
      stream.value.trim() === "" ||
      college.value.trim() === "" ||
      college_location.value.trim() === "" ||
      (!experienced.checked && !fresher.checked) ||
      tech_expertise_in.length  === 0 ||
      tech_familiar_in.length === 0 ||
      current_ctc.value.trim() === "" ||
      expected_ctc.value.trim() === "" ||
      years_of_experience.value.trim() === "" ||
      !isTechExpertiseSelected ||
      !isTechFamiliarSelected ||
      (appeared_for_zeus_yes.checked && previously_applied_role.value.trim() === "") 
    ) {
        alert("Please fill out all required fields on the Educational and Proffesional page.");
    }
    else if ( experienced.checked && !notice_period_yes.checked && !notice_period_no.checked ) {
        alert("Please fill out all required fields regarding your notice period details");
    } else {
        qualifications_container.classList.add("hide-container");
        submit_container.classList.remove("hide-container");
        window.scrollTo(0, 0);
    }


    updatePreview();
    photo_viewer();
})







const prev_qualifications = function () {
  if(!submit_container.classList.contains("hide-container")) submit_container.classList.add("hide-container");
  if(!personal_info_container.classList.contains("hide-container"))personal_info_container.classList.add("hide-container");
  qualifications_container.classList.remove("hide-container");
  window.scrollTo(0, 0);
};

// Edit feature in the application
const edit_text_personal_info = document.getElementById("edit-text-personal-info");
const edit_text_qualifications = document.getElementById("edit-text-qualifications");

// moves back from preview page to the qualifications page
btn_prev_submit.addEventListener("click", prev_qualifications);
edit_text_personal_info.addEventListener("click", prev_qualifications);

edit_text_personal_info.addEventListener("click", () => {
    if (!submit_container.classList.contains("hide-container")) submit_container.classList.add("hide-container");
    if (!qualifications_container.classList.contains("hide-container")) qualifications_container.classList.add("hide-container");
    personal_info_container.classList.remove("hide-container");
})

edit_text_qualifications.addEventListener("click", () => {
    if (!submit_container.classList.contains("hide-container")) submit_container.classList.add("hide-container");
    if (!personal_info_container.classList.contains("hide-container")) personal_info_container.classList.remove("hide-container");
    qualifications_container.classList.remove("hide-container");
} )



function updatePreview() {
    // Personal Information
    fname_preview.textContent = firstname.value;
    lname_preview.textContent = lastname.value;
    email_preview.textContent = email.value;
    phone_preview.textContent = phone.value;
    resume_preview.textContent = resume_input.value;
    portfolio_url_preview.textContent = portfolio.value || "-";
    // profile_image_preview = 

    let roles_selected_text = ``;
    for (let i = 0; i < preferred_roles.length; i++) {
        if (preferred_roles[i].checked) {
            roles_selected_text += preferred_roles[i].value + `<br>`;
        }
    }
    selected_roles_preview.innerHTML = roles_selected_text;

    referral_preview.textContent = referral.value.trim() || "-";



    // Educational Qualifications
    percentage_preview.textContent = percentage.value;
    passing_year_preview.textContent = pass_year.value;
    qualification_preview.textContent = qualification.value;
    stream_preview.textContent = stream.value;
    college_preview.textContent = college.value;
    other_college_preview.textContent = other_college.value || "-";
    college_location_preview.textContent = college_location.value;



    // Professional Qualifications
    applicant_type_preview.textContent = experienced.checked ? "Experienced" : "Fresher";
    years_of_experience_preview.textContent = years_of_experience.value;
    current_ctc_preview.textContent = current_ctc.value;
    expected_ctc_preview.textContent = expected_ctc.value;

    let expertiseTechText = ``;
    for (let i = 0; i < tech_expertise_in.length; i++) {
        if (tech_expertise_in[i].checked) {
            expertiseTechText += tech_expertise_in[i].value + `<br>`;
        }
    }
    expertise_tech_preview.innerHTML = expertiseTechText;

    other_expertise_tech_preview.textContent = other_expertise_tech.value || "-";

    let familiarTechText = ``;
    for (let i = 0; i < tech_familiar_in.length; i++) {
        if (tech_familiar_in[i].checked) {
            familiarTechText += tech_familiar_in[i].value + `<br>`;
        }
    }
	familiar_tech_preview.innerHTML = familiarTechText;
	
    other_familiar_tech_preview.textContent = other_familiar_tech.value || "-";


    // Notice Period
    is_notice_period_preview.textContent = notice_period_yes.checked ? "Yes" : "No";
        
    notice_period_date_preview.textContent = notice_period_date.value || "-";
    notice_period_month_preview.textContent = notice_period_month.value || "-";

    // Appeared for Zeus
    appeared_for_zeus_preview.textContent = appeared_for_zeus_yes.checked ? "Yes" : "No";
    appeared_for_role_preview.textContent = previously_applied_role.value || "-";
}

const uploadFile = (file, folder) => {
  if (file) {
    const params = {
      Bucket: "walkin-portal-file-server",
      Key: `/${folder}/${file.name}`, // Replace with the desired file name
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully. S3 Location:", data.Location);
      }
    });
  }
  else {
    alert("No File Selected for resume or photo ");
  }
};



btn_create_submit.addEventListener("click", () => {
	let job_roles = "";
	for (let i = 0; i < preferred_roles.length; i++) {
		if(preferred_roles[i].checked) job_roles += preferred_roles[i].value + " ";
	}

	let tech_expert = "";
	for (let i = 0; i < tech_expertise_in.length; i++) {
		if(tech_expertise_in[i].checked) tech_expert += tech_expertise_in[i].value + " ";
	}

	let tech_familiar = "";
	for (let i = 0; i < tech_familiar_in.length; i++) {
		if(tech_familiar_in[i].checked) tech_familiar += tech_familiar_in[i].value + " ";
	}

	const photo_file = photo.files[0]
	const resume_file = resume_input.files[0]
	let resume_key = ""
	let photo_key = ""
	if (photo_file && resume_file) {
		resume_key = resume_file.name
		photo_key = photo_file.name
		// uploadFile(resume_file, "resume")
		// uploadFile(photo_file, "profile-photos")
	}
	else {
		alert("Upload image and resume again")
	}

	const user = {
		firstname: firstname.value,
		lastname: lastname.value,
		email: email.value,
		phoneNumber: "+91" + phone.value,
		portfolioUrl: portfolio.value || "",
		jobRolesSelected: job_roles,
		referral: referral.value || "",
		jobRelatedUpdates: true,
		percentage: Number(percentage.value) || 35,
		yearOfPassing: Number(pass_year.value) || 2019,
		qualification: qualification.value,
		stream: stream.value,
		college: college.value,
		collegeOthers: other_college.value || "",
		collegeLocation: college_location.value,
		applicantType: experienced.checked ? "Experienced" : "Fresher",
		yearsOfExperience: Number(years_of_experience.value) || 0,
		currentCtc: Number(current_ctc.value) || 0,
		expectedCtc: Number(expected_ctc.value) || 0,
		noticePeriod: notice_period_yes.checked || false,
		noticePeriodEndDate: notice_period_date.value || "2001-01-01",
		noticePeriodDuration: Number(notice_period_month.value) || 0,
		appearedForZeus: appeared_for_zeus_yes.checked || false,
		appearedForRoleInZeus: previously_applied_role.value || "",
		resume: `${AWS_BASE_URL}/resume/${resume_key}`,
		userExpertiseIn: tech_expert,
		userFamiliarIn: tech_familiar,
		userOtherExpertiseIn: other_expertise_tech.value || "",
		userOtherFamiliarIn: other_familiar_tech.value || "",
		photo: `${AWS_BASE_URL}/profile-photos/${photo_key}`,
	};
	console.log(user);
	const userData = JSON.stringify(user);
	console.log(userData);

	fetch("https://localhost:7205/User/CreateUser/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: userData,
	})
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
		}
		if (response.ok) {
            alert("COngratulations your account has been created")
            window.location = "../walkin-list.html";
		}
        return response.json(); // Return the parsed JSON here
    })
    .then((data) => {
        console.log(JSON.stringify(data));
    })
    .catch((error) => {
        console.error("Error:", error);
    });







	console.log("submit click");

});
