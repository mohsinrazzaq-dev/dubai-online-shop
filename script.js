const products=[
{name:"Embroidered Abaya",price:299,cat:"embroidered",img:"assets/images/embroidered-abaya.jpg",tag:"NEW"},
{name:"Premium Mocha Abaya",price:279,cat:"classic",img:"assets/images/premium-mocha-abaya.jpg",tag:"BEST SELLER"},
{name:"Classic Black Abaya",price:249,cat:"classic",img:"assets/images/classic-black-abaya.jpg",tag:""},
{name:"Pearl Kimono Abaya",price:259,cat:"kimono",img:"assets/images/pearl-kimono-abaya.jpg",tag:"NEW"},
{name:"Royal Party Abaya",price:329,cat:"party",img:"assets/images/royal-party-abaya.jpg",tag:""},
{name:"Open Flow Abaya",price:269,cat:"classic",img:"assets/images/open-flow-abaya.jpg",tag:""},
{name:"Luxury Embroidery",price:349,cat:"embroidered",img:"assets/images/luxury-embroidery.jpg",tag:"PREMIUM"},
{name:"Signature Handbag",price:189,cat:"accessories",img:"assets/images/signature-handbag.jpg",tag:""}
];
let filtered=[...products], cart=[];
function renderProducts(){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=filtered.length?filtered.map((p,i)=>`<article class="product-card">
 <div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy">${p.tag?`<span class="tag">${p.tag}</span>`:""}<button class="heart" onclick="showToast('Added to wishlist')">♡</button></div>
 <div class="product-info"><h3>${p.name}</h3><div class="price">AED ${p.price}</div><button class="order" onclick="addToCart(${products.indexOf(p)})">Add to Cart</button></div>
 </article>`).join(""):`<p>No products found.</p>`;
}
function filterProducts(cat){filtered=cat==="all"?[...products]:products.filter(p=>p.cat===cat);renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"});}
function searchProducts(q){q=q.toLowerCase();filtered=products.filter(p=>p.name.toLowerCase().includes(q)||p.cat.includes(q));renderProducts();}
function focusSearch(){document.getElementById("searchInput").focus();document.getElementById("shop").scrollIntoView({behavior:"smooth"});}
function addToCart(i){cart.push(products[i]);document.getElementById("cartCount").textContent=cart.length;showToast(products[i].name+" added to cart");renderCart();}
function renderCart(){
 const box=document.getElementById("cartItems"),total=cart.reduce((s,p)=>s+p.price,0);
 box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><img src="${p.img}" alt=""><div><strong>${p.name}</strong><small>AED ${p.price}</small><button style="display:block;margin-top:8px;border:0;background:none;color:#76284e;cursor:pointer" onclick="removeCart(${i})">Remove</button></div></div>`).join(""):`<p class="empty">Your cart is empty.</p>`;
 document.getElementById("cartTotal").textContent="AED "+total;
}
function removeCart(i){cart.splice(i,1);document.getElementById("cartCount").textContent=cart.length;renderCart();}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show");renderCart();}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show");}
function checkout(e){e.preventDefault();if(!cart.length){showToast("Add a product first");return}const msg="Hello Dubai Online Shop, I would like to order:%0A"+cart.map(p=>`• ${p.name} — AED ${p.price}`).join("%0A");window.open("https://wa.me/971509961378117?text="+msg,"_blank")}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function showToast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
renderProducts();
