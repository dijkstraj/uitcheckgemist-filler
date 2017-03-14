function save_options() {
  let rows = document.getElementsByClassName('detail');
  let details = [];
  for (let i = 0; i < rows.length; i++) {
    let fields = rows[i].getElementsByTagName('input');
    if (fields[0].value && fields[0].value !== '') {
      details.push({
        name: fields[0].value,
        number: split_card_number(fields[1].value),
        valid: fields[2].value,
        birthdate: fields[3].value
      });
    }
  }
  chrome.storage.sync.set({
    details: JSON.stringify(details)
  }, () => {
    // Update status to let user know options were saved.
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// split the card number into 4 parts of 4 digits
function split_card_number(number) {
  let digits = number.split('');
  let parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(digits.slice(i * 4, (i + 1) * 4).join(''));
  }
  return parts;
} 

function add_detail_row(detail, index) {
  let row = document.createElement('div');
  row.id = 'detail' + index;
  row.className = 'detail';
  let nameInput = document.createElement('input');
  nameInput.id = 'name' + index;
  nameInput.placeholder = 'Your name';
  nameInput.value = detail.name || '';
  row.appendChild(nameInput);
  let numberInput = document.createElement('input');
  numberInput.id = 'number' + index;
  numberInput.placeholder = '0000000000000000';
  numberInput.value = (detail.number && detail.number.join('')) || '';
  numberInput.size = '16';
  row.appendChild(numberInput);
  let validInput = document.createElement('input');
  validInput.id = 'valid' + index;
  validInput.placeholder = '01-01-2020';
  validInput.value = detail.valid || '';
  validInput.size = '10';
  row.appendChild(validInput);
  let birthdateInput = document.createElement('input');
  birthdateInput.id = 'birthdate' + index;
  birthdateInput.placeholder = '01-01-1970';
  birthdateInput.value = detail.birthdate || '';
  birthdateInput.size = '10';
  row.appendChild(birthdateInput);
  document.getElementById('detailsContainer').appendChild(row);
}

function restore_options() {
  chrome.storage.sync.get({details: '[{"name":"noname"}]'}, (items) => {
    let details = JSON.parse(items.details);
    details.forEach(add_detail_row);
    console.log(details);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add').addEventListener('click', (event) => {
  event.preventDefault();
  add_detail_row({}, document.getElementsByClassName('detail').length);
});
document.getElementById('save').addEventListener('click', save_options);