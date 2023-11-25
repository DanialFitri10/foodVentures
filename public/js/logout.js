function logout() {
    sessionStorage.removeItem("email");

    // redirects the user to the login page after logout

    window.location.href = 'login.html'; 
}
