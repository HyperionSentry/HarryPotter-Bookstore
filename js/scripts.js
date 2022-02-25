/*
Usar objetos para dibujar los items en las cartas
*/

function buildItems(){
    class Item {
      constructor(nameItem, itemPrice, itemImg){
        this.nameItem = nameItem;
        this.itemPrice = itemPrice;
        this.itemImg = itemImg;
      }
    }
    const item1 = new Item("La piedra filosofal","120$","./img/harry-potter-y-la-piedra-filosofal-edicion-gryffindor-del-20-aniversario-harry-potter-1.jpg");
    const item2 = new Item("La camara secreta","150$","./img/harry-potter-y-la-camara-secreta-edicion-hufflepuff-del-20-aniversario-harry-potter-2.jpg");
    const item3 = new Item("El prisionero de Azkaban","160$","./img/harry-potter-y-el-prisionero-de-azkaban-edicion-slytherin-del-20-aniversario-harry-potter-3.jpg");
    const item4 = new Item("El caliz de fuego","160$","./img/harry-potter-y-el-caliz-de-fuego-harry-potter-4.jpg");
    const item5 = new Item("La orden del fenix","180$","./img/harry-potter-y-la-orden-del-fenix-edicion-ravenclaw-de-20-aniversario-harry-potter.jpg");
    const item6 = new Item("El misterio del principe","180$","./img/harry-potter-y-el-misterio-del-principe-harry-potter-6.jpg");

    const item1JSON  = JSON.stringify(item1);
    const item2JSON  = JSON.stringify(item2);
    const item3JSON  = JSON.stringify(item3);
    const item4JSON  = JSON.stringify(item4);
    const item5JSON  = JSON.stringify(item5);
    const item6JSON  = JSON.stringify(item6);
 
    localStorage.setItem("item1", item1JSON);
    localStorage.setItem("item2", item2JSON);
    localStorage.setItem("item3", item3JSON);
    localStorage.setItem("item4", item4JSON);
    localStorage.setItem("item5", item5JSON);
    localStorage.setItem("item6", item6JSON);
 
  }
  buildItems();


function AddBooks () {
    const itemsContainer = document.querySelector('.items');

    for (let i=1; i<=localStorage.length ;i=i+2){
        let item1 = JSON.parse(localStorage.getItem(`item${i}`));
        let bookTitle1 = item1.nameItem;
        let bookImg1 = item1.itemImg;
        let bookPrice1 = item1.itemPrice;
        let item2 = JSON.parse(localStorage.getItem(`item${i+1}`));
        let bookTitle2 = item2.nameItem;
        let bookImg2 = item2.itemImg;
        let bookPrice2 = item2.itemPrice;


        let item = `<div class="row"> 
                        <div class="col-12 col-md-6">
                            <div class="item shadow mb-4">
                               <h3 class="item-title">${bookTitle1}</h3>
                               <img class="item-image" src="${bookImg1}">
                               <div class="item-details">
                                   <h4 class="item-price">${bookPrice1}</h4>
                                   <button class="item-button btn btn-primary addToCart">AÑADIR</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="item shadow mb-4">
                                <h3 class="item-title">${bookTitle2}</h3>
                                <img class="item-image" src="${bookImg2}">
                                <div class="item-details">
                                     <h4 class="item-price">${bookPrice2}</h4>
                                    <button class="item-button btn btn-primary addToCart">AÑADIR</button>
                                </div>
                            </div>
                        </div>
                    </div>`
        const cards = document.createElement('div');
        cards.innerHTML = item;
        itemsContainer.append(cards);

    }

}
AddBooks ();


const addToShoppingCartButtons = document.querySelectorAll(".addToCart");

addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', (e) => {
        const button = e.target;
        const item = button.closest('.item');
        
        const itemTitle = item.querySelector('.item-title').textContent;
        const itemPrice = item.querySelector('.item-price').textContent;
        const itemImage = item.querySelector('.item-image').src;

        addItemToShoppingCart(itemTitle, itemPrice, itemImage);

    });
           
});

const buyButton = document.querySelector('.buyButton');
buyButton.addEventListener('click', buyButtonClick);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle')
    for (let i = 0; i< elementsTitle.length ;i++){
        if(elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            updateCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = 
    `<div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image" style>
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}
                </h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change',amountChanged);

    updateCartTotal();
    
}

function updateCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll ('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(shoppingCartPriceElement.textContent.replace('$',''));
        
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
        
    })
    shoppingCartTotal.innerHTML = `${total}$`;
}

function removeShoppingCartItem(e){
    const buttonClicked = e.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateCartTotal();
}

function amountChanged(e){
    const input = e.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateCartTotal();
}

function buyButtonClick (){
    shoppingCartItemsContainer.innerHTML = '';
    updateCartTotal();
    const URLGET   = "https://jsonplaceholder.typicode.com/posts";
    const infoPost =  { nombre: "Comprar" };

    $.post(URLGET, infoPost ,(respuesta, estado) => {
        if(estado === "success"){
            $('body').append(`<h4 class="buyStyle">Gracias por su Compra!</h4>`);
            window.scrollTo(0,document.body.scrollHeight);
        }  

    });
}




