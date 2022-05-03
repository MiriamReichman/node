function viewOrders(){
    var user= JSON.parse(sessionStorage.getItem('user'))
   
    fetch("api/user/" + user._id )
    .then(response => {
        if (response.ok && response.status == 200)
            return response.json()
        else {
            throw new Error( response.statusText);
           
        }
    })
        .then(data => {
            debugger
          document.getElementById('allOrders').innerText=JSON.stringify(data.allOrders)
        alert('Success:', data);
        
    }).catch((error) => {  alert(error) });
}



window.addEventListener('load', (event) => {
    viewOrders();
});