// Get the modal
var spCreatePostModal = document.getElementById("createPostModal");

// Get the button that opens the modal
var spCreatePostBtn = document.getElementById("createPostButton");

// Get the <span> element that closes the modal
var spCreatePostSpan = document.getElementById("createPostXBtn");

// When the user clicks the button, open the modal
spCreatePostBtn.onclick = function () {
    spCreatePostModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spCreatePostSpan.onclick = function () {
    spCreatePostModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == spCreatePostModal) {
    spCreatePostModal.style.display = "none";
  }
};

function uploadImage() {
     // -----
      // Configuration:
      // https://www.bytescale.com/docs/upload-widget#configuration
      // -----
      const options = {
        apiKey: "free", // Get API key: https://www.bytescale.com/get-started
        maxFileCount: 1
      };

      // import * as Bytescale from "@bytescale/upload-widget";
      Bytescale.UploadWidget.open(options).then(
        files => {
          const fileUrls = files.map(x => x.fileUrl).join("\n");
          const success = fileUrls.length === 0
            ? "No file selected."
            : `File uploaded:\n\n${fileUrls}`;
          alert(success);
          localStorage.setItem("imageUrl", files[0].fileUrl)
          console.log(files)
          console.log(files[0].fileUrl)
        },
        error => {
          alert(error);
        }
      );
}