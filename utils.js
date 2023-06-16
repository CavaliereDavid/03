export function createElement(html) {
  let template = document.createElement('div');
  html = html.trim();
  template.innerHTML = html;
  return template.firstChild;
}
// questa funzione crea un elemento non lo aggiunge alla pagina
// questo elemento mi serve esclusivamente d'appoggio
// gli setto il contenuto 
// il trim mi serve perchè alla fine mi vado a prendere solo il firstChild -> accetta solo il primo