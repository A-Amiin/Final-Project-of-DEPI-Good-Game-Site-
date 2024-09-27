document.getElementById("signupButton").addEventListener("click", function (event) {
    // Prevent the default action if you want to manage the validation
    event.preventDefault();

    let hasError = false;

    // Name validation
    const fullName = document.getElementById("fullName").value;
    const nameRegex = /^[A-Za-z\s]+$/;
    const fullNameError = document.getElementById("fullNameError");

    console.log("Validating full name:", fullName);
    if (!nameRegex.test(fullName) || fullName.length < 12 || fullName.length > 50) {
        fullNameError.textContent = "Full name should only contain alphabets, spaces, and be between 12 and 50 characters!";
        fullNameError.style.display = "block";
        hasError = true;
    } else {
        fullNameError.style.display = "none";
    }

    // Email validation
    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailError = document.getElementById("emailError");

    if (!emailRegex.test(email)) {
        emailError.style.display = "block";
        hasError = true;
    } else {
        emailError.style.display = "none";
    }

    // Password validation
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/;
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    console.log("Validating password:", password);
    // Password strength validation
    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters, include a number, both lower and uppercase letters, and a special character!";
        passwordError.style.display = "block";
        hasError = true;
    } else {
        passwordError.style.display = "none";
    }

    // Confirm password matches
    console.log("Confirming password:", confirmPassword);
    if (password !== confirmPassword) {
        confirmPasswordError.style.display = "block";
        hasError = true;
    } else {
        confirmPasswordError.style.display = "none";
    }

    // If any error exists, stop execution
    if (hasError) {
        return;
    }

    // Retrieve the existing users or create new one
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email exists
    if (users.some(user => user.email === email)) {
        return;
    }

    // Add new user
    users.push({ fullName, email, password });

    // Save users to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Success alert and form reset
    document.getElementById("signupForm").reset();

    // Navigate to the URL specified in the button's data-url attribute
    navigateToHome();
});

function navigateToHome() {
    window.open('../Html files/Home-Index.html', '_self');
}