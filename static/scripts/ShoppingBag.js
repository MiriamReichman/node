

window.addEventListener('load', (event) => {
  
    loadItems();

});


function loadItems() {
    var cart = [];
    cart = JSON.parse(sessionStorage.getItem('cart'));
    var sumOfItems = 0;
    var numOfItems = 0;
    cart.forEach((item) => {
        numOfItems += item.quntity;
        sumOfItems += (item.product.price) * (item.quntity);
        drowCart(item);
        
    });

    document.getElementById("itemCount").innerText = numOfItems;
    document.getElementById("totalAmount").innerText = sumOfItems;

} 

function drowCart(item) {
    var elemnt = document.getElementById("temp-row");

    var cln = elemnt.content.cloneNode(true);
 

    
    cln.querySelector(".itemName").innerText = item.product.name;
    cln.querySelector(".itemNumber").innerText = item.product.prodId;
    cln.querySelector(".price").innerText = "₪" + item.product.price ;
    var url = "url(./images/" + item.product.image + ".jpg)";
    //cln.querySelector(".image").style.backgroundImage =url;
    cln.querySelector(".image").src = "./images/" + item.product.image + ".jpg";
    cln.querySelector(".quntity").innerText = item.quntity;
    cln.getElementById('delete').addEventListener("click", () => {
        removeItem(item.product);
    })
    console.log(cln);
    document.querySelector(".tbody").appendChild(cln);

}
function removeItem(item)
{
    var cart = [];
    cart = JSON.parse(sessionStorage.getItem('cart'));
    
    //מחיקה מרשימה בסל 
   
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product._id == item._id) {
                if (cart[i].quntity > 1) {
                    cart[i].quntity--;
                }
                    else  {
                        cart = cart.filter((e) => e.product._id != item._id);
                    }
            }
        }
    var count = JSON.parse(sessionStorage.getItem('count'));
    sessionStorage.setItem('count', JSON.stringify(count-1));
   
    sessionStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(".tbody").innerHTML="";
  
    loadItems();
}

function placeOrder() {

    var orderItems = [];
    JSON.parse(sessionStorage.getItem('cart')).forEach((e) => {
        var item = {
            "orderItemId": 0,
            "prouductId": e.product._id,
            "quantity": e.quntity
        };
        
        orderItems.push(item);
    })
        ;

    var order = {
        "orderId": 0,
        "orderDate": new Date(),
        "orderSum": document.getElementById("totalAmount").innerText,
        "userId": JSON.parse(sessionStorage.getItem('user'))._id,//לבדוק שזה עובד כשנכנסים דרך ההיתחברות
        "orderItems": orderItems,
    };

    fetch("api/Order/", {
        method: 'POST',
        headers: {
            'content-Type':'application/json'
        },
        body: JSON.stringify(order)
    })
        .then((response) => {
            if (response.ok && response.status == 200)
                return response.json()

            else {
 

                throw new Error("error in placing order try agian.");
            }
        }).then((data)=>{
            alert("order num :" + data._id+"sucsseded!");
    })
       
      .catch((error) => { console.log(error); alert(error) });
//}
//ביצוע ההזמנה שליחת הנתונים בפוסט

}