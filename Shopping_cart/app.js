//SELECT ELEMENTS
const productEl = document.querySelector(".products");
const cartitemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal") ;
const totalItemsInCartEl = document.querySelector("total-items-in-cart");
//Render Product
function renderProducts (){
    products.forEach((product) => {
        productEl.innerHTML += `  
         <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="first Image" class="imgs">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>${product.description}</p>
                    </div>
                     <div class="add-to-wishlist"  onclick = "addToCart(${product.id})">
                        <a><i class="fa-sharp-duotone fa-solid fa-bag-shopping" alt ="add to wish List"></i></a>
                    </div>
                    <div class="add-to-cart">
                        <a><i class="fa-solid fa-heart" alt = "add to cart"></i></a>
                    </div>
                   
                </div>
            </div>
        `
    });
}
renderProducts();
//ADD CREAT FUNCTION
let cart = []
function addToCart(id){
    if(cart.some((item)=>item.id === id)){
        changenumberofunits('plus',id)
    }else{
        const item = products.find((product)=> product.id === id);
        cart.push({
          ...item, numberofunits:1,
        });
        console.log(cart);
    }
    
 updateCart();   
}
function updateCart() {
    renderCartItems();
    renderSubTotal();

    localStorage.setItem("CART", JSON.stringify(cart));
}
// calculate and render subtotal
function renderSubTotal() {
    let totalPrice = 0,
      totalItems = 0;
  
    cart.forEach((item) => {
      totalPrice += item.price * item.numberofunits;
      totalItems += item.numberofunits;
    });
  
    subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = totalItems;
  }
function renderCartItems(){
    cartitemsEl.innerHTML = "";
    cart.forEach((item)=>
    {
        cartitemsEl.innerHTML += `
                <div class="cart-item">
                    <div class="cart-img" onclick="removeItemFromCart(${item.id})">
                        <img src="${item.imgSrc}" alt="Cart images" >
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">$${item.price}</div>
                    <div class="units">
                        <div class="btn minus" onclick = "changenumberofunits('minus', ${item.id})">-</div>
                        <div class="number">${item.numberofunits}</div>
                        <div class="btn plus" onclick = "changenumberofunits('minus', ${item.id})">+</div>
                    </div>
                </div>

    `
    });
}
function removeItemFromCart(id){
    cart = cart.filter((item)=>item.id != id)
    updateCart();
}
//Change number of units in item
 function changenumberofunits(action, id){
    cart = cart.map((item) =>{
        let numberofunits = item.numberofunits;
        if(item.id === id){
            if(action === 'minus' && numberofunits > 1){
                numberofunits--;
            }else if(action === 'plus' && numberofunits < item.instack){
                numberofunits++;
            }
        }
        return{
            ...item,numberofunits,
        };
    });
    updateCart()
 }