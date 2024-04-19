const myName = document.getElementById('name')
const myphone = document.getElementById('phone')
const myemail = document.getElementById('email')
const myaddress = document.getElementById('address')
const button = document.getElementById('btn')
const updateButton = document.getElementById('upbtn')
const table = document.getElementById('table')
const dataButton = document.getElementById('getdata')
const API_URL = "http://localhost:3000/users" // Local JSON server url running at port 3000 run the server by 'npx json-server -p 3000 db.json'
var uid


button.addEventListener('click', () => {
    const id = Math.floor(Math.random()*100) // Giving random id to the user using random function
    const users = {
        id: `${id}`,
        name: `${myName.value}`,
        phone: `${myphone.value}`,
        email: `${myemail.value}`,
        address: `${myaddress.value}`
    }
    handlePost(users) // Calling post function to post the users at the json server 
})

dataButton.addEventListener('click', async () => {
    const data = await handleGet() // Calling get function to get the users from the json server and it takes time to convert the data to json so await is used
    data.forEach( e => { // data is an array so forEach is used for all the users stored in the array
        const newRow = //`<div>
        //                 <i class='bx bx-child profile-pic'></i>
        //                 <p>${e.id}
        //                 ${e.name}
        //                 ${e.phone}
        //                 ${e.email}
        //                 ${e.address}</p>
        //                 <p><button onclick="handleEdit(${e.id},'${e.name}','${e.phone}','${e.email}','${e.address}')">Edit</button><button onclick="handleDelete(${e.id})">Delete</button></p>
        //                 </div>`

`<section class="Home1-section">
                
                        <div class="Home1-section-maindiv">
                            <div class="Home1-section-profile">
                                <i class='bx bx-child profile1-pic'></i>
                            </div>
                            <div class="Home1-section-Name">
                                <p>${e.name}</p>
                                <p>${e.phone}</p>
                            </div>
                            <div class="Home1-section-arrow">
                            <p><button onclick="handleEdit(${e.id},'${e.name}','${e.phone}','${e.email}','${e.address}')">Edit</button></p>
                            <p><button onclick="handleDelete(${e.id})">Delete</button></p>

                            </div>
                        </div>
                
            </section>
            <hr>
            `


        table.innerHTML += newRow
    })
})

const handleGet = async () => {
    try
    {
        const response = await fetch(API_URL, {
            method:'GET',
            headers: {
                'Accept': 'Application/json' // Accepting the response as json
            }
        }) 
        const data = await response.json() // converting the response into json it takes time so await is used. If await is not used it will return a promise with state pending
        return(data)
    }
    catch(err)
    {
        console.log(err)
    }
}

const handlePost = async(users) => {
    try
    {
        const response = await fetch(API_URL,{
            method:'POST',
            headers: {
                'Content-Type' : 'Application/json' // posting the data into json server so the content type is mentioned as json 
            },
            body: JSON.stringify(users) // converting the object user into json using stringify method. the content inside the body will be posted at the server
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

const handleDelete = async (id) => {
    try
    {
        const response = await fetch(`${API_URL}/${id}`, { // The url of the json server is constructed again using the id that of the user wanted to be deleted 
            method: 'DELETE'
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

const handleEdit = (id,name,phone,email,address) => {
    uid = id
    myName.value = name
    myphone.value = phone
    myemail.value = email
    myaddress.value = address
    button.style.display = 'none'
    updateButton.style.display = 'block'
}

updateButton.addEventListener('click', (e) => {
    e.preventDefault()
    const editedUser = {
        id: `${uid}`,
        name : `${myName.value}`,
        phone : `${myphone.value}`,
        email : `${myemail.value}`,
        address : `${myaddress.value}`
    }
    console.log(editedUser)
    handleJsonEdit(editedUser)
    myName.value = ''
    myphone.value = ''
    myemail.value = ''
    myaddress.value = ''
})

const handleJsonEdit = async (users) => {
    try
    {
        const response = await fetch(`${API_URL}/${uid}`,{ // The url of the json server is constructed again using the id that of the user wanted to be updated
            method: 'PUT',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify(users)
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

function myAdd(){
    document.getElementById('demo').innerHTML="clicked";
}

