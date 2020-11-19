
const SERVER = "http://localhost:3000"
const access_token = localStorage.getItem("token")
let selectedData 

$(document).ready(function () {
    const token = localStorage.getItem("token")
    if (!token) {
        $("#login").show()
        $("#home").hide()
        $("#register").hide()
        $("#addToDoList").hide()
        $("#editToDoList").hide()
    } else {
        helloSalut()
        $("#home").show()
        $("#login").hide()
        $("#register").hide()
        $("#addToDoList").hide()
        $("#editToDoList").hide()
        fetchToDo()
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
            $('#addToDoList').hide()
            helloSalut()
            fetchToDo()
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
    const first_name = $("#register-first_name").val()
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
            $('#addToDoList').hide()
        })
        .fail(err => {
            console.log(err)
        })
}

function logout(e) {
    $("#login").show()
    $("#home").hide()
    $("#addToDoList").hide()
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

function fetchToDo() {
    const token = localStorage.getItem("token")
    $.ajax({
            method: 'GET',
            url: SERVER + '/todos',
            headers: {
                access_token: token
            }

        })
        .done(response => {
            $("#todolist").empty()
            console.log(response)
            response.forEach(element => {
                console.log(response)
                let dueDateRaw = new Date(element.due_date)
                let dueDate = dueDateRaw.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
                let createdAtRaw = new Date(element.createdAt)
                let createAt = createdAtRaw.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
                $("#todolist").append(`
               <div class="card" style="width: 30rem;">
                <div class="card-body">
                <h5 class="card-title" style="color: chocolate;">${element.title}</h5>
                <h6 class="card-title">Status  : ${element.status}</h6>
                <p class="card-text">"${element.description}"</p>
                <p class="card-text">Start In : ${createAt}</p>
                <p class="card-text">End In : ${dueDate}</p>
                  <a href="#" class="card-link" onclick="markAsDone(${element.id})">Mark as Done</a>
                  <a href="#" class="card-link" onclick="getFormEdit(${element.id})">Edit Activity</a>
                  <a href="#" class="card-link" onclick="deleteTodo(${element.id})">Delete Activity</a>
                </div>
              </div>
                `)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

function getFormAdd(event) {
    event.preventDefault()
    $("#home").hide()
    $("#addToDoList").show()
}

function getFormEdit(dataTodo) {
    selectedData = dataTodo
    $("#home").hide()
    $("#editToDoList").show()
}

$('#addTodo').submit((event) => {
    event.preventDefault()
    let data = $('#addTodo').serialize()
    $.ajax({
        method: "POST",
        url: SERVER + "/todos",
        headers: {
            access_token
        },
        data,

        success: (response) => {
            fetchToDo()
            console.log(response);
            $("#postingan").empty()
            $("#addToDoList").hide()
            $("#home").show()
        },
        error: (err) => {
            console.log(err)
        }
    })

})

$('#editTodo').submit((event) => {
    event.preventDefault()
    const payload = {
        title: $('#editTitle').val(),
        description: $('#editDescription').val(),
        status: $('#editStatus').val()
    }
    $.ajax({
        method: 'PUT',
        url: SERVER + `/todos/${selectedData}`,
        headers: {
            access_token
        },
        data : payload,
        success: (response) => {
            fetchToDo()
            console.log(response)
            $("#postingan").empty()
            $("#editToDoList").hide()
            $("#home").show()
        },
        error: (err) => {
            console.log(err);
        }
    })
})


function deleteTodo(id) {
    $.ajax({
            type: "DELETE",
            url: SERVER + `/todos/${id}`,
            headers: {
                access_token
            }
        })
        .done(response => {
            fetchToDo()
        })
        .fail(err => console.log(err))
}

function helloSalut() {
    $.ajax({
        method: "GET",
        url: SERVER + "/salut",
    }).done(response => {
        console.log(response)
        const user = localStorage.getItem("first_name")
        $("#hello-salut").empty();
        $("#hello-salut").append(`
        <h1>${response.hello} , ${user}</h1>
      `);
    }).fail(err => {
        console.log(err)
    })
}

function markAsDone(id) {
    $.ajax({
        type: "PATCH",
        url: SERVER + `/todos/${id}`,
        headers: {
            access_token
        }
    })
    .done((response) => {
        fetchToDo()
    })
    .fail((err) => {
        console.log(err)
    })
}