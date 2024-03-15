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

function loadMeetingTimes(times) {
  for (let k = 0; k < times.length; k++) {
    let day = "editMeetingDay" + (k+1);
    let time = "editMeetingTime" + (k+1);
    let location = "editMeetingLocation" + (k+1);

    let oldDay = times[k].day;
    let oldTime = times[k].time;
    let oldLocation = times[k].location;

    if(k>0) {
        document.getElementById('editMeetingTimeDiv' + k).style.display = "block";
    }
    document.getElementById(day).value = oldDay;
    document.getElementById(time).value = oldTime;
    document.getElementById(location).value = oldLocation;
  }
}

function hideMeetingTimes() {
    for (let u = 1; u < 7; u++) {
        document.getElementById('editMeetingTimeDiv' + u).style.display = "none";
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

  let containerDiv = document.createElement("div");

  let groupName = document.createElement("h3");
  groupName.innerHTML = data.name;

  let max_participantsLabel = document.createElement("h5");
  max_participantsLabel.innerHTML = "Max Participants";
  let max_participants = document.createElement("p");
  max_participants.innerHTML = data.max_participants;

  let start_dateLabel = document.createElement("h5");
  start_dateLabel.innerHTML = "Start Date";
  let start_date = document.createElement("p");
  if(data.start_date) {
    start_date.innerHTML = data.start_date;
  }

  let end_dateLabel = document.createElement("h5");
  end_dateLabel.innerHTML = "End Date";
  let end_date = document.createElement("p");
  if(data.end_date) {
    end_date.innerHTML = data.end_date;
  }

  let meetingTimesLabel = document.createElement("h5");
  meetingTimesLabel.innerHTML = "Meeting Times";
  let meetingTimesDiv = document.createElement("div");
  for(let r=0; r<data.meeting_times.length; r++) {
   let info = document.createElement('p');
   info.innerHTML = data.meeting_times[r].day + "s at " + data.meeting_times[r].time + " at " + data.meeting_times[r].location;
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

  containerDiv.appendChild(groupName);
  containerDiv.appendChild(max_participantsLabel);
  containerDiv.appendChild(max_participants);
  containerDiv.appendChild(start_dateLabel);
  containerDiv.appendChild(start_date);
  containerDiv.appendChild(end_dateLabel);
  containerDiv.appendChild(end_date);
  containerDiv.appendChild(meetingTimesLabel);
  containerDiv.appendChild(meetingTimesDiv);
  containerDiv.appendChild(descriptionLabel);
  containerDiv.appendChild(description);
  containerDiv.appendChild(schoolLabel);
  containerDiv.appendChild(school);
  containerDiv.appendChild(course_numberLabel);
  containerDiv.appendChild(course_number);
  containerDiv.appendChild(document.createElement("br"));
  containerDiv.className = "searchResult";

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
    containerDiv.appendChild(editButton);

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
      document.getElementById("editStartDate").value = data.start_date;
      document.getElementById("editEndDate").value = data.end_date;
      document.getElementById("editDescription").value = data.description;
      document.getElementById("editSchool").value = data.school;
      document.getElementById("editCourseNum").value = data.course_number;

      hideMeetingTimes();
      loadMeetingTimes(data.meeting_times);
      localStorage.setItem('numMeetingTimes', data.meeting_times.length);
    };
  }

  resultsDiv.appendChild(containerDiv);
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

  if (document.getElementById("querySearch").value.localeCompare("") > 0) {
    if (queryString.localeCompare("?") != 0) {
      queryString += "&search=" + document.getElementById("querySearch").value;
    } else {
      queryString += "search=" + document.getElementById("querySearch").value;
    }
  }

  //let url = "http://127.0.0.1:3000/studygroups";
  let url = "https://csci430-node-server.azurewebsites.net/studygroups";

  if (queryString.localeCompare("?") > 0) {
    url += queryString;
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

    queryStudyGroupModal.style.display = "none";

    clearResults();

    for (let i = 0; i <= body.length; i++) {
      console.log(body[i]);
      display(body[i]);
    }
  }
}
