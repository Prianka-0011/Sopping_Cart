let cart = [];
document.addEventListener("DOMContentLoaded", function() {
    
let productList=[];
    let isLoggedIn = sessionStorage.getItem("userInfo");
    console.log(isLoggedIn)
    if(isLoggedIn) { 
        if(cart.length===0)
        {
            document.getElementById("cart-item-list").classList.add('d-none');
            document.getElementById("noitem").classList.remove('d-none'); 
        }
        else{
            document.getElementById("cart-item-list").classList.remove('d-none');
            document.getElementById("noitem").classList.add('d-none'); 
            
        }
       document.getElementById("auth-user").innerHTML ="Welcome, "+ sessionStorage.getItem('userInfo');
      
      //product List
       //fetchProduct();
     //  const prodList=sessionStorage.getItem('productList');


     fetch('http://localhost:3000/products', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(data => {
            
            if(data.error){
                document.getElementById('procuct-tbody').innerHTML = data.error;
            } else {
              //  var arrayString = JSON.stringify(data);
              var arrayString = JSON.stringify(data);
             
             sessionStorage.setItem('productList', arrayString);
                productList=data;
                console.log("after relaod");
                let html = '';
       
                for (let i = 0; i < productList.length; i++) {
                    
                    html += "<tr>" +
                        "<td>" + productList[i].id + "</td>" +
                        "<td>" + productList[i].name + "</td>" +
                        "<td>" + productList[i].price + "</td>" +
                       // <img src='" + prodList[i].Image + "' alt='Product Image'></img>
                        "<td><img src='../images/"+productList[i].image+"' style='height: 3rem;width:3rem; border-radius: 1.5rem;' alt='Product Image'></td>" +
                        "<td>" + productList[i].stock + "</td>" +
                        "<td>" +
                        "<button class='btn cart-btn' onclick='addToCart(" + productList[i].id + ")'><i class='bx bx-cart'></i></button>" +
                        "</td>" +
                        "</tr>";
                }
             document.getElementById('product-tbody').innerHTML = html;
                   }
        });
       // console.log(productList)
    //  console.log(productList)
    //    var storedArrayProd = JSON.parse(productList);
    //    console.log(storedArrayProd);
       
    }
    else{
        window.location.href = "login.html";
    }
});


// //logout button
let logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", function() {
    console.log("Hi logout");
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userInfo');
   // sessionStorage.removeItem('productList');
    window.location.href = "index.html";
   // document.getElementById("main-content").classList.toggle("d-none");
    
})



function addToCart(productId) {
    
   console.log("Afterreload I am hear");
   
    const prodList = sessionStorage.getItem('productList');
    var storedArrayProd = JSON.parse(prodList);
    const product = storedArrayProd.find(prod => prod.id === productId);
    console.log("Afterreload product"+prodList);

    if(product.stock<1)
    {
        alert("Out of stock");
    }
    else{
        if (product) {
            const existingCartItem = cart.find(item => item.id === productId);
    
            if (existingCartItem) {
                if (existingCartItem.quantity < product.stock) {
                    existingCartItem.quantity++;
                }
                else{
                    alert("out of stock");
                }
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }
        }
    }
    

    renderCart();
    if(cart.length===0)
    {
        document.getElementById("cart-item-list").classList.add('d-none');
        document.getElementById("noitem").classList.remove('d-none'); 
    }
    else{
        document.getElementById("cart-item-list").classList.remove('d-none');
        document.getElementById("noitem").classList.add('d-none'); 
        
    }
}

function removeFromCart(productId) {
    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
        cart = cart.filter(item => item.id !== productId);
    }
    renderCart();
    if(cart.length===0)
    {
        document.getElementById("cart-item-list").classList.add('d-none');
        document.getElementById("noitem").classList.remove('d-none'); 
    }
    else{
        document.getElementById("cart-item-list").classList.remove('d-none');
        document.getElementById("noitem").classList.add('d-none'); 
        
    }
}

function increaseCartItemQuantity(productId) {

    const existingCartItem = cart.find(item => item.id === productId);
    const prodList = sessionStorage.getItem('productList');
    var storedArrayProd = JSON.parse(prodList);
    const product = storedArrayProd.find(prod => prod.id === productId);
    if (existingCartItem) {
        console.log(product.quantity);
        if(product.stock>existingCartItem.quantity)
        {
            existingCartItem.quantity+=1;
        }else{
            alert('stock out');
        }
    }
    renderCart();
    if(cart.length===0)
        {
            document.getElementById("cart-item-list").classList.add('d-none');
            document.getElementById("noitem").classList.remove('d-none'); 
        }
        else{
            document.getElementById("cart-item-list").classList.remove('d-none');
            document.getElementById("noitem").classList.add('d-none'); 
            
        }
}
function decreaseCartItemQuantity(productId) {
    const existingCartItem = cart.find(item => item.id === productId);
    const prodList = sessionStorage.getItem('productList');
    var storedArrayProd = JSON.parse(prodList);
    const product = storedArrayProd.find(prod => prod.id === productId);
    if (existingCartItem) {
        console.log(product.quantity);
        if(existingCartItem.quantity>1)
        {
            existingCartItem.quantity-=1;
        }else{
            removeFromCart(productId);
        }
        
     
    }
    renderCart();
    if(cart.length===0)
    {
        document.getElementById("cart-item-list").classList.add('d-none');
    }
    else{
        document.getElementById("cart-item-list").classList.remove('d-none'); 
    }
}

function renderCart() {
    let html = '';
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemTotal = item.price * item.quantity;
        html += "<tr>" +
            "<td>" + item.id + "</td>" +
            "<td>" + item.name + "</td>" +
            "<td>" + item.price + "</td>" +
            "<td>" + item.quantity + "</td>" +
            "<td>" + itemTotal + "</td>" +
            "<td>" +
            "<button class='btn cart-btn' onclick='decreaseCartItemQuantity(" + item.id +")'>-</button>" +item.quantity+
            "<button class='btn cart-btn' onclick='increaseCartItemQuantity(" + item.id + ")'>+</button>" +
            "<button class='btn cart-btn ms-1'  onclick='removeFromCart(" + item.id + ")'><i class='bx bx-trash'></i></button>" +
            "</td>" +
            "</tr>";
        totalPrice += itemTotal;
    }

    document.getElementById('cart-tbody').innerHTML = html;
    document.getElementById('total-price').innerHTML = totalPrice;
}

function reranderProductTable()
{
    const prodList=sessionStorage.getItem('productList');
    var storedArrayProd = JSON.parse(prodList);
    console.log(storedArrayProd);
     let html = '';
    
     for (let i = 0; i < storedArrayProd.length; i++) {
         
         html += "<tr>" +
             "<td>" + storedArrayProd[i].id + "</td>" +
             "<td>" + storedArrayProd[i].name + "</td>" +
             "<td>" + storedArrayProd[i].price + "</td>" +
            // <img src='" + prodList[i].Image + "' alt='Product Image'></img>
             "<td><img src='../images/"+storedArrayProd[i].image+"' style='height: 3rem;width:3rem; border-radius: 1.5rem;' alt='Product Image'></td>" +
             "<td>" + storedArrayProd[i].stock + "</td>" +
             "<td>" +
             "<button class='btn ' onclick='addToCart(" + storedArrayProd[i].id + ")'><i class='bx bx-cart'></i></button>" +
             "</td>" +
             "</tr>";
     }
  document.getElementById('product-tbody').innerHTML = html;
}
// Place order
function placeOrder() {
   cart.forEach(item => {
         updateProductById(item.id, item.name, item.price, item.quantity) ;

        });

    cart = [];
    fetchProduct();
    reranderProductTable();
    renderCart();
    window.location.reload();
    }

///update product
function updateProductById(productId, name, price, stock) {
    const prodList=sessionStorage.getItem('productList');
    var storedArrayProd = JSON.parse(prodList);
    const product = storedArrayProd.find(prod => prod.id === productId);
    let stockQn=product.stock-stock;
    stock=stockQn;
    fetch(`/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, stock })
    })
    .then(response => response.json())
    .then(updatedProduct => {
      console.log('Updated Product:', updatedProduct);
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
  }
 


//get all product
function fetchProduct(){
    // console.log(`${sessionStorage.getItem('accessToken')}`);
   
    fetch('http://localhost:3000/products', {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                        }
                    }).then(response => response.json())
                        .then(data => {
                            
                            if(data.error){
                                document.getElementById('procuct-tbody').innerHTML = data.error;
                            } else {
                                var arrayString = JSON.stringify(data);
                                productList=arrayString;
                                sessionStorage.setItem('productList', arrayString);
                                    //let html = '';
                                   }
                        });
}
