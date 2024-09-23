import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"

const URL = "https://jsonplaceholder.typicode.com/users"
fetch(URL)
    .then((res) => {
        if (!res.ok) {
            return (container.textContent = "no user found with this data")
        }
        res.json().then((json) => {
            console.log(json)
            handleData(json) 
        })
    })
    

function handleData(json) {
    json.forEach(user => {
        document.querySelector(".dynamic_data").innerHTML += `<div class="col">
        <artricle class="card">
            <div class="card-body">
                <p>${user.name}</p>
                <p>${user.email}</p>
            </div>
        </artricle>
    </div>`
    });
    console.log(typeof json)
}