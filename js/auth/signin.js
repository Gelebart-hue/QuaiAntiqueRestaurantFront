const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSigin = document.getElementById("btnSignin");
const siginForm = document.getElementById("signinForm");

btnSigin.addEventListener("click", checkCredenttials);

function checkCredentials() {
    let dataForm = new FormData(siginForm);

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
let raw = JSON.stringify({
  "username": dataForm.get("email"),
  "password": dataForm.get("mdp")
});
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(apiUrl+"login", requestOptions)
  .then(response => {
    if (response.ok) {
        return response.json();
    }
  else {
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
  }
}
)
  .then(result => {
    const token = result.apiToken;
    setToken(token);
    //Placer ce token en cookie
    setCookie(RoleCookieName, result.roles[0], 7);
    window.location.replace("/");
  }
)
  .catch(error => console.log('error', error));
}