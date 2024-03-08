// Get the modal
var modal = document.getElementById("searchStudyGroupModal");

// Get the button that opens the modal
var btn = document.getElementById("searchStudyGroupButton");

// Get the <span> element that closes the modal
var span = document.getElementById("searchStudyGroupXBtn");

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

function clearResults() {
  let resultsDiv = document.getElementById("searchResults");
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }
}

function display(data) {
  console.log(data);
  let resultsDiv = document.getElementById("searchResults");
  /*while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.lastChild);
  }*/
  //resultsDiv.innerHTML = '';

  let groupName = document.createElement("h3");
  groupName.innerHTML = data.name;

  let max_participantsLabel = document.createElement("h4");
  max_participantsLabel.innerHTML = "Max Participants";
  let max_participants = document.createElement("p");
  max_participants.innerHTML = data.max_participants;

  let start_dateLabel = document.createElement("h4");
  start_dateLabel.innerHTML = "Start Date";
  let start_date = document.createElement("p");
  start_date.innerHTML = data.start_date;

  let end_dateLabel = document.createElement("h4");
  end_dateLabel.innerHTML = "End Date";
  let end_date = document.createElement("p");
  end_date.innerHTML = data.end_date;

  let descriptionLabel = document.createElement("h4");
  descriptionLabel.innerHTML = "Description";
  let description = document.createElement("p");
  description.innerHTML = data.description;

  let schoolLabel = document.createElement("h4");
  schoolLabel.innerHTML = "School";
  let school = document.createElement("p");
  school.innerHTML = data.school;

  let course_numberLabel = document.createElement("h4");
  course_numberLabel.innerHTML = "Course Number";
  let course_number = document.createElement("p");
  course_number.innerHTML = data.course_number;

  resultsDiv.appendChild(groupName);
  resultsDiv.appendChild(max_participantsLabel);
  resultsDiv.appendChild(max_participants);
  resultsDiv.appendChild(start_dateLabel);
  resultsDiv.appendChild(start_date);
  resultsDiv.appendChild(end_dateLabel);
  resultsDiv.appendChild(end_date);
  resultsDiv.appendChild(descriptionLabel);
  resultsDiv.appendChild(description);
  resultsDiv.appendChild(schoolLabel);
  resultsDiv.appendChild(school);
  resultsDiv.appendChild(course_numberLabel);
  resultsDiv.appendChild(course_number);
  resultsDiv.appendChild(document.createElement("br"));
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

    modal.display = "none";

    clearResults();

    for (let i = 0; i <= body.length; i++) {
      display(body[i]);
    }
  }
}
