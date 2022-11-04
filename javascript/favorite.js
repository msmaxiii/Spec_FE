//Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

//DOM Elements
const submitForm = document.getElementById("favorite-form")
const favoriteContainer = document.getElementById("favorite-container")

//Modal Elements
let favoriteBody = document.getElementById("favorite-body")
let updateFavoriteBtn = document.getElementById("update-favorite-button")

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/favorite/"

const handleSubmit = async (e) => {
    e.preventDefault()
    let favoriteObj = {
        favorite: document.getElementById("favorite-input").value
    }
    await addFavorite(favoriteObj);
    document.getElementById("favorite-input").value = ''
}

async function addFavorite(obj) {
    const response = await fetch(`${baseUrl}customer/${customerId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getFavorites(customerId);
    }
    }
    async function getFavorites(customerId) {
        await fetch(`${baseUrl}customer/${customerId}`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => createFavoriteCards(data))
            .catch(err => console.error(err))
    }

    async function handleDelete(favoriteId){
        await fetch(baseUrl + favoriteId, {
            method: "DELETE",
            headers: headers
        })
            .catch(err => console.error(err))

        return getFavorites(favoriteId);
    }


async function getFavoriteById(favoriteId){
    await fetch(baseUrl + favoriteId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}

async function handleFavoriteEdit(favoriteId){
    let favoriteObj = {
        id: favoriteId,
        body: favoriteBody.value
    }

    await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(favoriteObj),
        headers: headers
    })
        .catch(err => console.error(err))

    return getFavorites(customerId);
}

const createFavoriteCards = (array) => {
    favoriteContainer.innerHTML = ''
    array.forEach(obj => {
        let favoriteCard = document.createElement("div")
        favoriteCard.classList.add("m-2")
        favoriteCard.innerHTML =`
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getNoteById(${obj.id})" type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#note-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
            `
        favoriteContainer.append(favoriteCard);
    })
}
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }

}

const populateModal = (obj) =>{
    favoriteBody.innerText = ''
    favoriteBody.innerText = obj.body
    updateFavoriteBtn.setAttribute('data-note-id', obj.id)
}

getFavorites(customerId);

submitForm.addEventListener("submit", handleSubmit)

updateFavoriteBtn.addEventListener("click", (e)=>{
    let favoriteId = e.target.getAttribute('data-favorite-id')
    handleFavoriteEdit(favoriteId);
})



const createFavoriteCards = (array) => {
    favoriteContainer.innerHTML = ''
    array.forEach(obj => {
        let favoriteCard = document.createElement("div")
        favoriteCard.classList.add("m-2")
        favoriteCard.innerHTML =`
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getFavoriteById(${obj.id})" type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#note-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
            `
        favoriteContainer.append(favoriteCard);
    })
}
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }

}

const populateModal = (obj) =>{
    favoriteBody.innerText = ''
    favoriteBody.innerText = obj.body
    updateFavoriteBtn.setAttribute('data-favorite-id', obj.id)
}

getFavorites(favoriteId);

submitForm.addEventListener("submit", handleSubmit)

updateFavoriteBtn.addEventListener("click", (e)=>{
    let favoriteId = e.target.getAttribute('data-favorite-id')
    handleFavoriteEdit(favoriteId);
})

// function handleSend(evt) {
// 	evt.preventDefault();
	
// 	alert('Email sent');
    
// }
// form.addEventListener('submit', handleSend);