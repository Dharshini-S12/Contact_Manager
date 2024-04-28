const myFName = document.getElementById('fname')
const myLName = document.getElementById('lname')
const myphone = document.getElementById('phone')
const button = document.getElementById('btn')
const updateButton = document.getElementById('upbtn')
const table = document.getElementById('table')
const dataButton = document.getElementById('getdata')
const API_URL = "http://localhost:3000/users"
var uid


button.addEventListener('click', () => {
    const id = Math.floor(Math.random()*100) 
    const users = {
        id: `${id}`,
        fname: `${myFName.value}`,
        lname: `${myLName.value}`,
        phone: `${myphone.value}`
    }
    handlePost(users) 
})

dataButton.addEventListener('click', async () => {
    const data = await handleGet() 
    data.forEach( e => { 
        const newRow = `
                            <div class="section-right-contacts">
                                <div class="contact-1">
                                    <div class="c1">${e.fname}</div>
                                    <div class="c2">${e.lname}</div>
                                    <div class="c3">${e.phone}</div>
                                </div>
                                <div class="contact-2">
                                    <div><button class="edit-btn" onclick="handleEdit(${e.id},'${e.fname}','${e.lname}','${e.phone}')"><p class='bx bxs-edit'></p></button></div>
                                    <div><button class="edit-btn" onclick="handleDelete(${e.id})"><p class='bx bx-user-x'></p></button></div>
                                    <div><button class="edit-btn" onclick="mycall()"><p class='bx bx-phone-call '></p></button></div>
                                    <div><button class="edit-btn" onclick="mymsg()"><p class='bx bx-message'></p></button></div>
                                </div>
   
                            </div>    
                            <hr>
                            `

// `<section class="Home1-section">
                
//                         <div class="Home1-section-maindiv">
//                             <div class="Home1-section-profile">
//                                 <i class='bx bx-child profile1-pic'></i>
//                             </div>
//                             <div class="Home1-section-Name">
//                                 <p>${e.fname}</p>
//                                 <p>${e.lname}</p>
//                                 <p>${e.phone}</p>
//                             </div>
//                             <div class="Home1-section-arrow">
//                             <p><button onclick="handleEdit(${e.id},'${e.fname}','${e.lanme}','${e.phone}')">Edit</button></p>
//                             <p><button onclick="handleDelete(${e.id})">Delete</button></p>

//                             </div>
//                         </div>
                
//             </section>
//             <hr>
//             `


        table.innerHTML += newRow
    })
})

const handleGet = async () => {
    try
    {
        const response = await fetch(API_URL, {
            method:'GET',
            headers: {
                'Accept': 'Application/json'
            }
        }) 
        const data = await response.json()
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
                'Content-Type' : 'Application/json'  
            },
            body: JSON.stringify(users) 
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
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

const handleEdit = (id,fname,lname,phone) => {
    uid = id
    myFName.value = fname
    myLName.value = lname
    myphone.value = phone
    button.style.display = 'none'
    updateButton.style.display = 'block'
}

updateButton.addEventListener('click', (e) => {
    e.preventDefault()
    const editedUser = {
        id: `${uid}`,
        fname : `${myFName.value}`,
        lname : `${myLName.value}`,
        phone : `${myphone.value}`
    }
    console.log(editedUser)
    handleJsonEdit(editedUser)
    myFName.value = ''
    myLName.value = ''
    myphone.value = ''
})

const handleJsonEdit = async (users) => {
    try
    {
        const response = await fetch(`${API_URL}/${uid}`,{ 
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


function mycall(){
    alert("Ringing");
}
function mymsg(){
    alert("Messaging");
}



