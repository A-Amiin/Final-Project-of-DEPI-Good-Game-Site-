document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Log the retrieved users for debugging
    console.log("Users retrieved from localStorage:", users);

    // Check if the email exists
    const user = users.find(user => user.email === email);

    //Errors Alert
    let hasError = false;
    const passwordError = document.getElementById("passwordError")
    const noAccount = document.getElementById("noAccount")

    if (!user) {
        noAccount.textContent = ('No account found with this email. Please sign up to create an account.');
        noAccount.style.display = "block";
        hasError = true;
    } else if (user.password === password) {
        // Success: Login the user
        redirectToDashboard();
    } else {
        passwordError.textContent = ('Incorrect password.');
        passwordError.style.display = "block";
        hasError = true;
    }
});
function redirectToDashboard() {
    window.location.href = "../Html files/Home-Index.html";
}