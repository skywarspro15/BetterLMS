document.onscroll = function () {
  appearCards("features");
};

async function checkSession() {
  var result = await authenticateUser(
    getCookie("username"),
    getCookie("password")
  );

  if (result != "Password's valid!") {
    window.location.href = "index.html";
  }
}

async function signIn() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var submit = document.getElementById("submitLogin");

  submit.innerHTML = "Signing in...";
  submit.onclick = "";

  var result = await authenticateUser(username, password);

  if (result == "Password's valid!") {
    closeModal("signIn");
    openModal("success");
    submit.innerHTML = "Sign in";
    submit.setAttribute("onclick", "signIn();");
    setCookie("username", username);
    setCookie("password", password);
  } else if (result == "Password's not valid") {
    closeModal("signIn");
    openModal("error");
    submit.innerHTML = "Sign in";
    submit.setAttribute("onclick", "signIn();");
  } else if (result == "Not a valid user") {
    closeModal("signIn");
    openModal("nonExistentUser");
    submit.innerHTML = "Sign in";
    submit.setAttribute("onclick", "signIn();");
  }
}

async function authenticateUser(username, password) {
  var result = await makeRequest(
    "GET",
    "https://CloudWebV2.skywarspro15.repl.co/login.php?username=" +
      username +
      "&password=" +
      password
  );

  return result;
}

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

function setCookie(cname, cvalue) {
  const today = new Date();
  const d = new Date();
  d.setTime(today.getTime() + 3600000 * 24 * 15);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
