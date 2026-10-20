const loginForm = document.querySelector("#login-form");
const loginNotice = document.querySelector("#login-notice");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginNotice.textContent = "This demo login is not connected to an account service yet. Use the dashboard link to continue.";
});
