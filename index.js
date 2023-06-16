/* MIA SOLUZIONE
import { cart } from './cart.js'; // abbiamo il nostro array di partenza
import {
  getDiscountAmount,
  getDiscountedPrice,
  getVat,
  getFinalPrice,
} from './cart-utils.js'; // importiamo i metodi che ci servono

console.log(cart);

// viene mostrata una lista con un elemento per ogni articolo del carrello
// mostrare nome, quantità, prezzo totale ivato e sconto

for (let item of cart) {
  // sconto
  let discount = getDiscountedPrice(item.netPrice, item.discount);
  let discountedPrice = getDiscountAmount(item.netPrice, discount);
  let value = item.netPrice * item.quantity;
  // prezzo totale ivato
  let vat = getVat('IT');
  let grossPrice = getFinalPrice(discountedPrice, vat);

  console.log(
    `nome: ${item.name} quantità: ${item.quantity} 
    valore netto: ${value} sconto: ${item.discount} sconto totale: ${discountedPrice} prezzo totale ivato: ${grossPrice} `
  );
}
*/
/*SOLUZIONE PROFESSORE
 */
import { cart } from './cart.js';
import {
  getVat,
  getDiscountAmount,
  getDiscountedPrice,
  getFinalPrice,
  getVatAmount,
  getDiscountedPrice,
  getTransportFee,
} from './cart-utils.js';
import { createElement } from './utils.js';

function appendCartItem(item, vat, container) {
  let discountAmount = getDiscountAmount(item.netPrice, item.discount);
  let discountedPrice = getDiscountedPrice(item.netPrice, item.discount);
  let price = getFinalPrice(discountedPrice, vat);

  let template = `
    <li class="list-group-item item">
      <div class="d-flex flex-row d-flex justify-content-between align-items-center">
        <div class="item-name">${item.name}</div>

        <div class="d-flex flex-row align-items-center justify-content-end flex-wrap">
        <span class="ms-2 d-flex flex-row align-items-center">
          <label class="me-1" for="quantity">qty:</label>
          <input
          class="form-control item-quantity"
          value="${item.quantity}"
          type="number"
          style="width: 70px"
          />
        </span>
        <span class="ms-2">
          <span class="item-price">${price.toFixed(2)}</span>
          <span class="item-discount">(-${discountAmount.toFixed(2)}€)</span>
        </span>
        </div>
      </div>
    </li>
  `;

  const element = createElement(template);
  container.appendChild(element);
}

const vat = getVat('IT');
const container = document.querySelector('#items-list');

cart.forEach((item) => {
  appendCartItem(item, vat, container);

});

function(updateSummary(items, vat){

  let calculatedItems = items.map(item => calculateCartItem(item, vat));
  const netTotal = calculatedItems.reduce((total, item)=> {return total + item.discountedPrice},0);
      let template = "";
  
  const totalVat = items.reduce((total, item) => {
    const discountedPrice = getDiscountedPrice(item.netPrice, item.discount) * item.quantity;
    const vatAmount = getVatAmount(discountedPrice, vat);
    return total + vatAmount;
  }, 0);
  )
}
  // questa volta parto da un oggetto

function updateSummary2(items, vat) {
  let summary = items.reduce((summ, item){
    
    let getDiscountedPrice = getDiscountedPrice(item.netPrice, item.discount) * item.quantity;
    const vatAmount = getVatAmount(discountedPrice, vat);
    const weight = item.weight * item.quantity;
    const price = getFinalPrice(discountedPrice, vat);

    return {
      netTotal: summ.netTotal + discountedPrice,
      totalVat: summ.totalVat + vatAmount ,
      totalWeight: summ.totalWeight + weight,
      totalPrice: summ.totalPrice + price
    }
  }, { netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0 });
}
  
const transportFee = getTransportFee(summary.totalWeight);