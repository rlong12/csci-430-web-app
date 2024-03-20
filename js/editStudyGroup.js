//edit study group modal
var editStudyGroupModal = document.getElementById("editStudyGroupModal");
var editStudyGroupBtn = document.getElementById("editStudyGroupButton");
var editStudyGroupXBtn = document.getElementById("editStudyGroupXBtn");

editStudyGroupXBtn.onclick = function () {
  editStudyGroupModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == editStudyGroupModal) {
    editStudyGroupModal.style.display = "none";
  }
};

let editAddMeetingBtn = document.getElementById("editAddMeetingTimeBtn");
let editDeleteMeetingBtn = document.getElementById("editDeleteMeetingTimeBtn");
let j = localStorage.getItem('numMeetingTimes');
console.log("J increment" + j)

function editGetMeetingTimes(j) {
  console.log("J increment" + j)
  let meetingTimes = [];
  for (let h = 1; h <= j; h++) {
    let day = "editMeetingDay" + h;
    let time = "editMeetingTime" + h;
    let location = "editMeetingLocation" + h;
    let obj = {};
    if (
      document.getElementById("editMeetingDay1").value.localeCompare("") > 0 ||
      document.getElementById("editMeetingTime1").value.localeCompare("") > 0 ||
      document.getElementById("editMeetingLocation1").value.localeCompare("") >
        0
    ) {
      if (
        document.getElementById(day).value.localeCompare("") === 0 ||
        document.getElementById(time).value.localeCompare("") === 0 ||
        document.getElementById(location).value.localeCompare("") === 0
      ) {
        document.getElementById("editMeetingTimesWarning").style.display =
          "block";
        document.getElementById("editMeetingTimesWarning").innerHTML =
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
      document.getElementById("editMeetingTimesWarning").style.display = "none";
    }
  }
  return meetingTimes;
}

editAddMeetingBtn.onclick = function () {
  if (j < 7) {
    let id = "editMeetingTimeDiv" + j;
    let div = document.getElementById(id);
    div.style.className;
    div.style.display = "block";
    j++;
  }
  console.log(j);
};

editDeleteMeetingBtn.onclick = function () {
  if (j > 1) {
    console.log(j);
    let id = "editMeetingTimeDiv" + (j - 1);
    let div = document.getElementById(id);
    console.log(div);
    div.style.display = "none";
    j--;
  }
  console.log(j);
};

//get information from modal
async function editStudyGroup() {
  let newStartDate;
  let newEndDate;
  let newGroupName = document.getElementById("editName").value.trim();

  if (document.getElementById("editStartDate").value.localeCompare("") > 0) {
    newStartDate = document.getElementById("editStartDate").value;
  }
  if (document.getElementById("editEndDate").value.localeCompare("") > 0) {
    newEndDate = document.getElementById("editEndDate").value;
  }
  let newMaxParticipants = document.getElementById("editMaxParticipants").value;
  let newMeetingTimes = editGetMeetingTimes(j);
  console.log(newMeetingTimes.length);
  let newGroupDescription = document
    .getElementById("editDescription")
    .value.trim();
  let newGroupSchool = document.getElementById("editSchool").value.trim();
  let newCourseNum = document.getElementById("editCourseNum").value.trim();

  let newIsPublic;
  if (document.getElementById("editPublicChk").checked === true) {
    newIsPublic = true;
  }
  if (document.getElementById("editPrivateChk").checked === true) {
    newIsPublic = false;
  }

  console.log("Start date: " + newStartDate);
  console.log("End date: " + newEndDate);

  console.log(localStorage.getItem("studyGroupID"));
  let studyGroupID = localStorage.getItem("studyGroupID");

  //let url = `http://127.0.0.1:3000/studygroup/${studyGroupID}`;
  let url = `https://csci430-node-server.azurewebsites.net/studygroup/${studyGroupID}`;

  let data = {};

  if (newMeetingTimes.length === 0) {
    data = {
      name: newGroupName,
      is_public: newIsPublic,
      max_participants: newMaxParticipants,
      start_date: newStartDate,
      end_date: newEndDate,
      description: newGroupDescription,
      school: newGroupSchool,
      course_number: newCourseNum,
    };
  } else {
    data = {
      name: newGroupName,
      is_public: newIsPublic,
      max_participants: newMaxParticipants,
      start_date: newStartDate,
      end_date: newEndDate,
      meeting_times: newMeetingTimes,
      description: newGroupDescription,
      school: newGroupSchool,
      course_number: newCourseNum,
    };
  }

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);

  if (response.status == 200) {
    console.log("Study Group successfully edited!");
    editStudyGroupModal.style.display = "none";
  } else if (response.status == 400) {
    console.log("Unable to edit study group");
  }
}