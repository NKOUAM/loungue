// ===== PANIER COMMANDE =====
let cart = [];
const cartItems = document.getElementById('cart-items');
const cartTotalP = document.getElementById('cart-total');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

function updateCartUI() {
  cartItems.innerHTML = '';
  if(cart.length === 0) {
    cartItems.innerHTML = '<li>Votre panier est vide</li>';
    cartTotalP.textContent = 'Total : 0 FCFA';
    return;
  }
  let total = 0;
  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} = ${item.price*item.qty} FCFA`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotalP.textContent = `Total : ${total} FCFA`;
}

// Ajouter au panier
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.menu-card');
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);
    const qty = parseInt(card.querySelector('.qty').value);
    const existing = cart.find(item => item.name === name);
    if(existing) existing.qty += qty;
    else cart.push({name, price, qty});
    updateCartUI();
  });
});

// ENVOI COMMANDE SUR WHATSAPP
document.getElementById('order-form').addEventListener('submit', e => {
  e.preventDefault();
  if(cart.length === 0) { alert('Votre panier est vide'); return; }
  const name = document.getElementById('client-name').value;
  const phone = document.getElementById('client-phone').value;
  const address = document.getElementById('client-address').value;
  let message = `Nouvelle commande:\nNom: ${name}\nTéléphone: ${phone}\nAdresse: ${address}\n\nDétails:\n`;
  cart.forEach(item => {
    message += `${item.name} x${item.qty} = ${item.price*item.qty} FCFA\n`;
  });
  const total = cart.reduce((a,b)=>a+b.price*b.qty,0);
  message += `\nTotal: ${total} FCFA`;
  const whatsappUrl = `https://wa.me/237699492192?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl,'_blank');
});

// ENVOI RESERVATION SUR WHATSAPP

document.getElementById('reservation-form').addEventListener('submit', e => {
  e.preventDefault(); // empêche le formulaire de recharger la page

  // Récupération des valeurs
  const nom = document.getElementById('res-nom').value;
  const prenom = document.getElementById('res-prenom').value;
  const phone = document.getElementById('res-phone').value;
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const personnes = document.getElementById('res-personnes').value;
  const messageText = document.getElementById('res-message').value;

  // Création du message
  let message = `Nouvelle réservation:\nNom: ${nom} ${prenom}\nTéléphone: ${phone}\nDate: ${date} à ${time}\nPersonnes: ${personnes}\nMessage: ${messageText}`;

  // URL WhatsApp avec encodage
  const whatsappUrl = `https://wa.me/237699492192?text=${encodeURIComponent(message)}`;

  // Ouvre WhatsApp dans un nouvel onglet
  window.open(whatsappUrl, '_blank');

  // Optionnel: message de confirmation
  alert("Votre réservation est prête à être envoyée sur WhatsApp !");
});
