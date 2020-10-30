const SERVER = "http://localhost:3000"

$(document).ready(function () {
    const token = localStorage.getItem("access_token")
    if(token){
        $("#login").show()
        $("#home").hide()
    } else {
        $("#home").show()
        $("#login").hide()
    }
})

function login(e){
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {  
        const token = response.access_token
        localStorage.setItem("token", token)
        
        $('#login').hide()
        $('#home').show()
    })
    .fail(err => {
        console.log(err)
    })

    // const password =   
}