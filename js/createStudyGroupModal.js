// Get the modal
var modal = document.getElementById("createStudyGroupModal");

// Get the button that opens the modal
var btn = document.getElementById("createStudyGroupButton");

// Get the <span> element that closes the modal
var span = document.getElementById("studyGroupXBtn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//add another meeting time div
let addMeetingBtn = document.getElementById("addMeetingTimeBtn");
let deleteMeetingBtn = document.getElementById("deleteMeetingTimeBtn");
let i = 1;

function getMeetingTimes(i) {
  let meetingTimes = [];
  for (let h = 1; h <= i; h++) {
    let day = "meetingDay" + h;
    let time = "meetingTime" + h;
    let location = "meetingLocation" + h;
    let obj = {};
    if (
      document.getElementById("meetingDay1").value.localeCompare("") > 0 ||
      document.getElementById("meetingTime1").value.localeCompare("") > 0 ||
      document.getElementById("meetingLocation1").value.localeCompare("") > 0
    ) {
      if (
        document.getElementById(day).value.localeCompare("") === 0 ||
        document.getElementById(time).value.localeCompare("") === 0 ||
        document.getElementById(location).value.localeCompare("") === 0
      ) {
        document.getElementById("meetingTimesWarning").style.display = "block";
        document.getElementById("meetingTimesWarning").innerHTML =
          "Day of week, time (00:00), and location are required.";
        throw new Error("Invalid meeting time");
      }
      obj = {
        day: document.getElementById(day).value.trim(),
        time: document.getElementById(time).value.trim(),
        location: document.getElementById(location).value.trim(),
      };
      meetingTimes.push(obj);
      console.log(obj);
      document.getElementById("meetingTimesWarning").style.display = "none";
    }
  }
  return meetingTimes;
}

addMeetingBtn.onclick = function () {
  if (i < 7) {
    let id = "meetingTimeDiv" + i;
    let div = document.getElementById(id);
    div.style.className;
    div.style.display = "block";
    i++;
  }
  console.log(i);
};

deleteMeetingBtn.onclick = function () {
  if (i > 1) {
    console.log(i);
    let id = "meetingTimeDiv" + (i - 1);
    let div = document.getElementById(id);
    console.log(div);
    div.style.display = "none";
    i--;
  }
};
//get information from modal
async function createNewStudyGroup() {
  let startDate;
  let endDate;
  let groupName = document.getElementById("name").value.trim();
  if (groupName.localeCompare("") === 0) {
    document.getElementById("nameWarning").style.display = "block";
    document.getElementById("nameWarning").innerHTML =
      "Study group name is required.";
  } else {
    document.getElementById("nameWarning").style.display = "none";
  }
  let isPublic;
  if (document.getElementById("publicChk").checked === true) {
    isPublic = true;
  }
  if (document.getElementById("privateChk").checked === true) {
    isPublic = false;
  }
  if (
    document.getElementById("publicChk").checked === false &&
    document.getElementById("privateChk").checked === false
  ) {
    document.getElementById("privacyWarning").style.display = "block";
    document.getElementById("privacyWarning").innerHTML =
      "Privacy setting is required.";
  } else {
    document.getElementById("privacyWarning").style.display = "none";
  }
  let maxParticipants = document.getElementById("maxParticipants").value;
  if (maxParticipants === 0 || maxParticipants.localeCompare("") === 0) {
    document.getElementById("maxParticipantsWarning").style.display = "block";
    document.getElementById("maxParticipantsWarning").innerHTML =
      "Max participants is required.";
  } else {
    document.getElementById("maxParticipantsWarning").style.display = "none";
  }
  if (document.getElementById("startDate").value.localeCompare("") > 0) {
    startDate = document.getElementById("startDate").value;
  }
  if (document.getElementById("endDate").value.localeCompare("") > 0) {
    endDate = document.getElementById("endDate").value;
  }
  let meetingTimes = getMeetingTimes(i);
  let groupDescription = document.getElementById("description").value.trim();
  let groupSchool = document.getElementById("school").value.trim();
  let courseNum = document.getElementById("courseNum").value.trim();
  let fieldsPopulated = false;

  console.log("Start date: " + startDate);
  console.log("End date: " + endDate);

  //let url = "http://127.0.0.1:3000/studygroup";
  let url = "https://csci430-node-server.azurewebsites.net/studygroup";

  if (groupName.localeCompare("") === 0) {
    document.getElementById("nameWarning").innerHTML =
      "Study group name is required";
    document.getElementById("nameWarning").style.display = "block";
  } else if (groupName.localeCompare("") > 0) {
    document.getElementById("nameWarning").style.display = "none";
  }
  if (
    document.getElementById("publicChk").checked === false &&
    document.getElementById("privateChk").checked === false
  ) {
    //code to add warning about public chk
  }
  if (maxParticipants === 0) {
    document.getElementById("maxParticipantsWarning").innerHTML =
      "Max participants is required";
    document.getElementById("maxParticipantsWarning").style.display = "block";
  } else if (maxParticipants > 0) {
    document.getElementById("maxParticipantsWarning").style.display = "none";
  }

  if (
    groupName.localeCompare("") > 0 &&
    maxParticipants > 0 &&
    isPublic != null
  ) {
    fieldsPopulated = true;
  }
  let data = {};

  if (meetingTimes.length === 0) {
    data = {
      name: groupName,
      is_public: isPublic,
      max_participants: maxParticipants,
      start_date: startDate,
      end_date: endDate,
      description: groupDescription,
      school: groupSchool,
      course_number: courseNum,
    };
  } else {
    data = {
      name: groupName,
      is_public: isPublic,
      max_participants: maxParticipants,
      start_date: startDate,
      end_date: endDate,
      meeting_times: meetingTimes,
      description: groupDescription,
      school: groupSchool,
      course_number: courseNum,
    };
  }

  console.log(meetingTimes);
  console.log(meetingTimes.length);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (fieldsPopulated === true) {
    let response = await fetch(url, options);

    if (response.status == 201) {
      console.log("Study Group created!");
      modal.style.display = "none";
    } else if (response.status == 400) {
      console.log("Unable to create study group");
    }
  }
}
