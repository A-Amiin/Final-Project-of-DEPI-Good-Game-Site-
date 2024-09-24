function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Errors Alert
    let hasError = false;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const noAccount = document.getElementById("noAccount");

    // Clear previous error messages
    emailError.style.display = "none";
    passwordError.style.display = "none";
    noAccount.style.display = "none";

    // Check if email or password fields are empty
    if (!email) {
        emailError.textContent = "Please enter your email.";
        emailError.style.display = "block";
        hasError = true;
    }

    if (!password) {
        passwordError.textContent = "Please enter your password.";
        passwordError.style.display = "block";
        hasError = true;
    }

    // Stop function if there's an error
    if (hasError) return;

    // Check if the email exists
    const user = users.find(user => user.email === email);

    if (!user) {
        noAccount.textContent = 'No account found with this email. Please sign up to create an account.';
        noAccount.style.display = "block";
        hasError = true;
    } else if (user.password === password) {
        // Success: Login the user and redirect to the home page
        window.location.href = "../Html files/Home-Index.html";
    } else {
        passwordError.textContent = 'Incorrect password.';
        passwordError.style.display = "block";
        hasError = true;
    }
}
