import axios from "axios";

let addToCart=document.querySelectorAll('.add-to-cart')

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(
        function(res){
            console.log(res)
        }
    )
}
addToCart.forEach((btn)=> {
    btn.addEventListener('click',(e)=>{
    console.log(e);
    let pizza = JSON.parse(btn.dataset.pizza);
    console.log(pizza)
    updateCart(pizza)

    })
});
