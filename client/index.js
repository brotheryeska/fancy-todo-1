const SERVER = "http://localhost:3000"

$(document).ready(function() {
    const token = localStorage.getItem("token")
    if (!token) {
        $("#login").show()
        $("#home").hide()
        $("#register").hide()
        helloSalut()
    } else {
        helloSalut()
        $("#home").show()
        $("#login").hide()
        $("#register").hide()
    }
})


function login(e) {
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    console.log(email, password)
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email,
            password
        }
    })
        .done(res => {
            const token = res.access_token
            localStorage.setItem("token", token)
            localStorage.setItem("first_name", res.first_name)
            $('#login').hide()
            $('#home').show()
            helloSalut()
        })
        .fail(err => {
            console.log(err)
        }) 
}

function getRegister() {
    $("#register").show()
    $("#login").hide()
    $("#home").hide()
}

function register(e) {
    e.preventDefault()
    const email = $("#register-email").val()
    const password = $("#register-password").val()
    const first_name= $("#register-first_name").val()
    const last_name = $("#register-last_name").val()
    console.log(email, password, first_name, last_name)
    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email,
            password,
            first_name,
            last_name
        }
    })
    .done(res => {
        $("#register").hide()
        $("#login").show()
    })
    .fail(err => {
        console.log(err)
    })
}


function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        data: { 
            google_access_token 
        }
    })
    .done(res => {
        localStorage.getItem("token", res.google_access_token)
        localStorage.getItem("first_name", res.first_name)
        helloSalut()
        $("#login").hide()
        $("#home").show()
    })
    .fail(err => {
        console.log(err)
    })
}

function logout(e){
    $("#login").show()
    $("#home").hide()
    localStorage.removeItem("token")
    localStorage.removeItem("first_name")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('access_token');
}

function fetchToDo(){
    const token = localStorage.getItem("token")
    $.ajax({
        method: 'GET',
        url: SERVER + '/todos',
        headers: {
            
        }
    })
    .done(data => {

    })
}


function helloSalut() {
    $.ajax({
      method: "GET",
      url: SERVER + "/salut",
    }).done(response => {
      const user = localStorage.getItem("first_name")
      $("#hello-salut").empty();
      $("#hello-salut").append(`
        <h1>${response.hello} ${user}</h1>
        <p class="text-muted">Hello ${user}</p>
      `);
      setTimeout(() => {
        $("#hello-salut").empty();
      }, 5000)
    }).fail(err => {
      console.log(err)
    })
}
