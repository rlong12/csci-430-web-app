// Get the modal
var queryStudyGroupModal = document.getElementById("searchStudyGroupModal");

// Get the button that opens the modal
var queryStudyGroupBtn = document.getElementById("searchStudyGroupButton");

// Get the <span> element that closes the modal
var queryStudyGroupXBtn = document.getElementById("searchStudyGroupXBtn");

// When the user clicks the button, open the modal
queryStudyGroupBtn.onclick = function () {
  queryStudyGroupModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
queryStudyGroupXBtn.onclick = function () {
  queryStudyGroupModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == queryStudyGroupModal) {
    queryStudyGroupModal.style.display = "none";
  }
};

function militaryToStandard(military) {
  var time = military; // your input

  time = time.split(":"); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

  return timeValue;
}

function loadMeetingTimes(times) {
  for (let k = 0; k < times.length; k++) {
    let day = "editMeetingDay" + (k + 1);
    let time = "editMeetingTime" + (k + 1);
    let location = "editMeetingLocation" + (k + 1);

    let oldDay = times[k].day;
    let oldTime = times[k].time;
    let oldLocation = times[k].location;

    if (k > 0) {
      document.getElementById("editMeetingTimeDiv" + k).style.display = "block";
    }
    document.getElementById(day).value = oldDay;
    document.getElementById(time).value = oldTime;
    document.getElementById(location).value = oldLocation;

    localStorage.setItem("numMeetingTimes", k);
  }
}

function hideMeetingTimes() {
  for (let u = 1; u < 7; u++) {
    document.getElementById("editMeetingTimeDiv" + u).style.display = "none";
  }
}

function clearResults() {
  let resultsDiv = document.getElementById("searchResults");
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }
}

function display(data) {
  console.log(data);
  let resultsDiv = document.getElementById("searchResults");

  let groupContainer = document.createElement("div");

  let header = document.createElement("div");

  let bodyContainer = document.createElement("div");

  let containerDiv1 = document.createElement("div");
  let containerDiv2 = document.createElement("div");
  let containerDiv3 = document.createElement("div");

  let footer = document.createElement("div");
  footer.className = "footer";

  let groupName = document.createElement("h2");
  groupName.innerHTML = data.name;

  let max_participantsLabel = document.createElement("h5");
  max_participantsLabel.innerHTML = "Max Participants";
  let max_participants = document.createElement("p");
  max_participants.innerHTML = data.max_participants;

  let start_dateLabel = document.createElement("h5");
  start_dateLabel.innerHTML = "Start Date";
  let start_date = document.createElement("p");
  if (data.start_date) {
    start_date.innerHTML = data.start_date.slice(0, 10);
  }

  let end_dateLabel = document.createElement("h5");
  end_dateLabel.innerHTML = "End Date";
  let end_date = document.createElement("p");
  if (data.end_date) {
    end_date.innerHTML = data.end_date.slice(0, 10);
  }

  let meetingTimesLabel = document.createElement("h5");
  meetingTimesLabel.innerHTML = "Meeting Times";
  let meetingTimesDiv = document.createElement("div");
  for (let r = 0; r < data.meeting_times.length; r++) {
    let time = militaryToStandard(data.meeting_times[r].time);
    let info = document.createElement("p");
    info.innerHTML =
      data.meeting_times[r].day +
      "s at " +
      time +
      " at " +
      data.meeting_times[r].location;
    meetingTimesDiv.appendChild(info);
  }

  let descriptionLabel = document.createElement("h5");
  descriptionLabel.innerHTML = "Description";
  let description = document.createElement("p");
  description.innerHTML = data.description;

  let schoolLabel = document.createElement("h5");
  schoolLabel.innerHTML = "School";
  let school = document.createElement("p");
  school.innerHTML = data.school;

  let course_numberLabel = document.createElement("h5");
  course_numberLabel.innerHTML = "Course Number";
  let course_number = document.createElement("p");
  course_number.innerHTML = data.course_number;

  header.appendChild(groupName);
  containerDiv1.appendChild(max_participantsLabel);
  containerDiv1.appendChild(max_participants);
  containerDiv1.appendChild(start_dateLabel);
  containerDiv1.appendChild(start_date);
  containerDiv1.appendChild(end_dateLabel);
  containerDiv1.appendChild(end_date);
  containerDiv2.appendChild(meetingTimesLabel);
  containerDiv2.appendChild(meetingTimesDiv);
  containerDiv3.appendChild(descriptionLabel);
  containerDiv3.appendChild(description);
  containerDiv3.appendChild(schoolLabel);
  containerDiv3.appendChild(school);
  containerDiv3.appendChild(course_numberLabel);
  containerDiv3.appendChild(course_number);
  containerDiv3.appendChild(document.createElement("br"));
  containerDiv1.className = "searchResult";
  containerDiv2.className = "searchResult";
  containerDiv3.className = "searchResult";
  groupContainer.className = "searchResultGroup";
  bodyContainer.className = "searchResultBodyContainer";

  let userID = localStorage.getItem("userID");
  let owner = data.owner;

  console.log(userID);
  console.log(owner);
  if (userID.localeCompare(owner) === 0) {
    let editButton = document.createElement("button");
    editButton.className = "button";
    editButton.innerHTML = "Edit";
    editButton.style.backgroundColor = "#5cb85c";
    editButton.id = "editStudyGroupButton";
    footer.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.className = "button";
    deleteButton.innerHTML = "Delete";
    deleteButton.style.backgroundColor = "red";
    deleteButton.id = "deleteStudyGroupButton";
    footer.appendChild(deleteButton);

    let inviteButton = document.createElement("button");
    inviteButton.className = "button";
    inviteButton.innerHTML = "Invite";
    inviteButton.style.backgroundColor = "#5cb85c";
    inviteButton.id = "inviteStudyGroupButton";
    footer.appendChild(inviteButton);

    inviteButton.onclick = function () {
      resultMessage.style.display = "none";
      localStorage.setItem("studyGroupID", data._id);
      inviteModal.style.display = "block";
    }

    deleteButton.onclick = function () {
      localStorage.setItem("deleteStudyGroupId", data._id);
      confirmDeleteModal.style.display = "block";
    };
    editButton.onclick = function () {
      localStorage.setItem("studyGroupID", data._id);
      editStudyGroupModal.style.display = "block";

      //populate modal
      document.getElementById("editName").value = data.name;
      if (data.is_public === true) {
        document.getElementById("editPublicChk").checked = true;
      } else {
        document.getElementById("editPrivateChk").checked = true;
      }
      document.getElementById("editMaxParticipants").value =
        data.max_participants;
      try {
        document.getElementById("editStartDate").value = data.start_date.slice(
          0,
          10
        );
      } catch {
        console.log("field empty");
      }
      try {
        document.getElementById("editEndDate").value = data.end_date.slice(
          0,
          10
        );
      } catch {
        console.log("field empty");
      }
      try {
        document.getElementById("editDescription").value = data.description;
      } catch {
        console.log("field empty");
      }
      try {
        document.getElementById("editSchool").value = data.school;
      } catch {
        console.log("field empty");
      }
      try {
        document.getElementById("editCourseNum").value = data.course_number;
      } catch {
        console.log("field empty");
      }

      hideMeetingTimes();
      loadMeetingTimes(data.meeting_times);
      localStorage.setItem("numMeetingTimes", data.meeting_times.length);
      console.log("J: " + localStorage.getItem("numMeetingTimes"));
      console.log("participants: " + data.participants);
      participantsBtn.onclick = function () {
        loadParticipants(data.participants);
        participantsModal.style.display = "block";
      };
    };
  } else {
    let memberOfGroup = false;
    for (
      let thisGroupParticipants = 0;
      thisGroupParticipants < data.participants.length;
      thisGroupParticipants++
    ) {
      if (
        data.participants[thisGroupParticipants].localeCompare(userID) === 0
      ) {
        memberOfGroup = true;
      }
    }
    if (memberOfGroup) {
      let leaveButton = document.createElement("button");
      leaveButton.className = "button";
      leaveButton.innerHTML = "Leave Group";
      leaveButton.style.backgroundColor = "red";
      leaveButton.id = "leaveStudyGroupButton";
      footer.appendChild(leaveButton);

      leaveButton.onclick = async function () {
        //let url = `http://127.0.0.1:3000/studygroup/${data._id}/participants?remove=true`;
        let url = `https://csci430-node-server.azurewebsites.net/studygroup/${data._id}/participants?remove=true`;

        let userObject = {
          userId: userID,
        };

        console.log(userObject);

        const options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        };

        let response = await fetch(url, options);

        if (response.status === 200) {
          console.log("Study group left!");
          leaveButton.style.display = 'none';
          let successMessage = document.createElement("p");
          successMessage.innerHTML = "Study Group left!";
          successMessage.style.color = "red";
          footer.appendChild(successMessage);
        } else {
          console.log("Unable to leave study group");
        }
      };

    } else {
      let joinButton = document.createElement("button");
      joinButton.className = "button";
      joinButton.innerHTML = "Join Group";
      joinButton.style.backgroundColor = "#5cb85c";
      joinButton.id = "joinStudyGroupButton";
      footer.appendChild(joinButton);

      joinButton.onclick = async function () {
        //let url = `http://127.0.0.1:3000/studygroup/${data._id}/participants?add=true`;
        let url = `https://csci430-node-server.azurewebsites.net/studygroup/${data._id}/participants?add=true`;

        let userObject = {
          userId: userID,
        };

        console.log(userObject);

        const options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        };

        let response = await fetch(url, options);

        if (response.status === 200) {
          console.log("Study group joined!");
          joinButton.style.display = 'none';
          let successMessage = document.createElement("p");
          successMessage.innerHTML = "Study Group joined!";
          successMessage.style.color = "#5cb85c";
          footer.appendChild(successMessage);
          
        } else {
          console.log("Unable to join study group");
        }
      };
    }
  }

  groupContainer.appendChild(header);
  bodyContainer.appendChild(containerDiv1);
  bodyContainer.appendChild(containerDiv2);
  bodyContainer.appendChild(containerDiv3);
  groupContainer.appendChild(bodyContainer);
  groupContainer.appendChild(footer);

  resultsDiv.appendChild(groupContainer);
}

async function queryStudyGroups() {
  let queryString = "?";

  let isOngoing;
  if (document.getElementById("queryYesChk").checked === true) {
    isOngoing = true;
  }
  if (document.getElementById("queryNoChk").checked === true) {
    isOngoing = false;
  }

  let ownerOnly;
  if (document.getElementById("queryOwnerYes").checked === true) {
    ownerOnly = true;
  }

  let memberOnly;
  if (document.getElementById("queryMemberYes").checked === true) {
    memberOnly = true;
  }

  let sortByValue = "";
  if (document.getElementById("queryAscChk").checked === true) {
    sortByValue = "asc";
  }
  if (document.getElementById("queryDescChk").checked === true) {
    sortByValue = "desc";
  }

  console.log(sortByValue);

  if (isOngoing != null) {
    queryString += "ongoing=" + isOngoing;
  }

  if (document.getElementById("querySkip").value.localeCompare("") > 0) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&skip=" + document.getElementById("querySkip").value;
    } else {
      queryString += "skip=" + document.getElementById("querySkip").value;
    }
  }

  if (document.getElementById("queryLimit").value.localeCompare("") > 0) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&limit=" + document.getElementById("queryLimit").value;
    } else {
      queryString += "limit=" + document.getElementById("queryLimit").value;
    }
  }

  if (sortByValue.localeCompare("") > 0) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&sortBy=" + sortByValue;
    } else {
      queryString += "sortBy=" + sortByValue;
    }
  }

  console.log("Owner only: " + ownerOnly);
  if (ownerOnly === true) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&mine=" + ownerOnly;
    } else {
      queryString += "mine=" + ownerOnly;
    }
  }

  if (memberOnly === true) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&member=" + memberOnly;
    } else {
      queryString += "member=" + memberOnly;
    }
  }

  if (document.getElementById("querySearch").value.localeCompare("") > 0) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&search=" + document.getElementById("querySearch").value;
    } else {
      queryString += "search=" + document.getElementById("querySearch").value;
    }
  }

  //let url = "http://127.0.0.1:3000/studygroups";
  let url = "https://csci430-node-server.azurewebsites.net/studygroups";

  localStorage.setItem("lastQuery", url);
  if (queryString.localeCompare("?") > 0) {
    url += queryString;
    localStorage.setItem("lastQuery", url);
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  console.log(url);

  let response = await fetch(url, options);

  if (response.status === 200) {
    const body = await response.json();
    console.log(body);

    queryStudyGroupModal.style.display = "none";

    clearResults();

    let resultsDiv = document.getElementById("searchResults");
    let resultsHeader = document.createElement("h1");
    resultsHeader.innerHTML = "Search Results";
    resultsDiv.appendChild(resultsHeader);

    for (let i = 0; i < body.length; i++) {
      console.log(body[i]);
      display(body[i]);
    }
  }
}
