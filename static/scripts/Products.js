
//async
window.addEventListener('load', (event) => {

    getProducts();
    getCategories();
    if (JSON.parse(sessionStorage.getItem('count')) != null) {
        document.getElementById('ItemsCountText').innerText = (JSON.parse(sessionStorage.getItem('count')));
    }
    else {
        document.getElementById('ItemsCountText').innerText = 0;
    }
});

function getProducts() {
    fetch("api/Product/")
        .then((response) => {
            debugger;
            if (response.ok && response.status == 200) {

                return response.json()
            }
            else {
                throw new Error(response.status + response.statusText + "in products");

            }
        })
        .then(data => {

            drow(data);


        }).catch((error) => { alert(error) });


}

function getCategories() {
    fetch("api/category/")
        .then((response) => {
                        if (response.ok && response.status == 200)
                return response.json()
            else {
                throw new Error(response.status + response.statusText);
            }
        })
        .then(data => {
            console.log(data[0] + "CATEGORIES");

            data.forEach((c) => {
                var elemnt = document.getElementById("temp-category");

                var cln = elemnt.content.cloneNode(true);

                cln.querySelector(".OptionName").innerText = c.name;

                cln.querySelector('.opt')._id = c._id;
                cln.querySelector('.opt').addEventListener("click", () => {
                    removePoductList();
                    //אופציה לעשות את כל הקטגוריות המסומנות בדף
                    var a = document.querySelectorAll('.opt');
                    var flage = false;
                    a.forEach((e) => {
                        if (e.checked) {
                            flage = true;
                            getByCategorie(e._id)
                        }
                    });
                    if (flage == false) {
                        window.location.href = "products.html";
                    };
                    //    if (document.getElementById(c.categoresId).checked) {
                    //        getByCategorie(c.categoresId)
                    //    }
                    //    else
                    //        window.location.href = "products.html";

                    //});

                    

                })
                document.getElementById("filters").appendChild(cln);
            })
        })
                .catch((error) => { debugger; console.log(error); alert(error) });
        }

    function addToShoppingCart(product) {

        var cart = [];
        if (JSON.parse(sessionStorage.getItem('cart')) != null) {
            cart = JSON.parse(sessionStorage.getItem('cart'));
            sessionStorage.setItem('count', JSON.parse(sessionStorage.getItem('count')) + 1);

        }
        else {
            sessionStorage.setItem('count', 1);
        }
        let item = {
            "product": product,
            "quntity": 1,
        }
        var flag = false;

        if (cart.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].product._id == product._id) {
                    cart[i].quntity++;
                    flag = true;
                }
            }
        }

        if (flag == false) {
            cart.push(item);
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('ItemsCountText').innerText = JSON.parse(sessionStorage.getItem('count'));
        console.log(parseInt(JSON.parse(sessionStorage.getItem('cart')).length));

    }

    function getByCategorie(id) {

        fetch("api/product/" + id).then((response) => {

            if (response.ok && response.status == 200)
                return response.json();
            else {
                throw new Error(response.statusText + response.status);
            }
        })
            .then(data => {
                console.log(data);

                drow(data);


            }).catch((error) => { debugger; console.log(error); alert(error) });
    }

    function drow(data) {
        document.getElementById('counter').innerText = data.length;
        data.forEach((d) => {

            var elemnt = document.getElementById("temp-card");

            var cln = elemnt.content.cloneNode(true);

            cln.querySelector("img").src = "./images/" + d.image + ".jpg";
            cln.querySelector(".name").innerText = d.name;
            cln.querySelector(".price").innerText = d.price + "₪";
            cln.querySelector(".description").innerText = d.description;

            cln.querySelector('button').addEventListener("click", () => { addToShoppingCart(d) });

            document.getElementById("PoductList").appendChild(cln);
        })
    }

    function removePoductList() {
        //אלו 2 אופציות לאותו דבר....
        document.getElementById("PoductList").innerHTML = "";
        //document.body.removeChild(document.getElementById("PoductList"));
        //var list = document.createElement('div');
        //list.setAttribute("id", "PoductList");
        //document.body.appendChild(list);
    }

    document.querySelector(".Clear").addEventListener("click", () => {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('count');
        window.location.href = "products.html";
    })
