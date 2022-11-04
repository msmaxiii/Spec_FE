let loginForm = document.getElementById('login-form')
let loginUsername = document.getElementById('login-customername')
let loginPassword = document.getElementById('login-password')

const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/customer'

const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        username: loginCustomername.value,
        password: loginPassword.value
    }

    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if (response.status === 200){
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
    }
}

loginForm.addEventListener("submit", handleSubmit)
