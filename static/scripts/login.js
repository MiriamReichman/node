function login() {
    debugger
    fetch("api/user/" + document.getElementById("email").value
     + "/" + document.getElementById("password").value)
        .then((response) => {

            if (response.ok && response.status == 200)
                return response.json()

            else {
                alert("there is no exsisting user with this password! ");
                document.getElementById("add").style.display = "block";
                return "erro";
            }
        })
        .then(data => {
            
            console.log(data);
      
            if (data != "erro") {
          
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = "welcomeBack.html" ;
          

            }

        }).catch((error) => { debugger;console.log(error); alert(error) });
}

function load() {
    var old = JSON.parse(sessionStorage.getItem('user'))

    document.getElementById("email1").value = old.email;
    document.getElementById("password1").value = old.password;
    document.getElementById("firstName1").value = old.firstname;
    document.getElementById("lastName1").value =old.lastname;

}
function addNewUser() {
    document.getElementById("add").style.display = "block";
}
function sign() {
    fetch("api/user", {
    method: 'POST',
        headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        email: document.getElementById("email2").value,
        password: document.getElementById("password2").value,
        firstname: document.getElementById("firstName2").value,
        lastname: document.getElementById("lastName2").value,
 
    })
    
    }).then(response => {
        if (response.ok && response.status == 200)
            return response.json()
        else {
            throw new Error( response.statusText);
           
        }
    })
        .then(data => {
          
        alert('Success:', data.firstname);
        
    }).catch((error) => {  alert(error) });

}
function update() {
    var user= JSON.parse(sessionStorage.getItem('user'))
 
    fetch("api/user/" + user._id , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email1").value,
            password: document.getElementById("password1").value,
            firstname: document.getElementById("firstName1").value,
            lastname: document.getElementById("lastName1").value,
           // Id: user._id
        })
    }).then(response => { return response.json() })
        .then(data => {
            alert('updated Successfuly:'+ data.firstname);

        })

}
function loadExsisting() {
    var user = JSON.parse(sessionStorage.getItem('user'))
    document.getElementById("wellcom").innerText = "wellcom back : " + user.firstname+"!!!!";
}
function enter() {
    window.location.href = "Products.html";
}
function ToUpdate() {
    window.location.href = "ExsistingUser.html";
}
function viewOrders(){
window.location.href = "allOrders.html" ;
}