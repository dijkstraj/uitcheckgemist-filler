if (document.getElementById('tls_card_information_expirationDate')) {
  chrome.runtime.sendMessage({method: "getDetails"}, function(response) {
    let details = response.data;
    if (details.length > 0) {
      let overlay = document.createElement('div');
      overlay.id = 'filler-overlay';
      let container = document.createElement('div');
      details.forEach((detail) => {
        let node = document.createElement('button');
        let textNode = document.createTextNode(detail.name);
        node.appendChild(textNode);
        container.appendChild(node);
        node.addEventListener('click', (event) => {
          event.preventDefault();

          // enter card number
          detail.number.forEach((part, index) => {
            if (index > 0) {
              document.getElementById('tls_card_information_engravedId_' + index).value = detail.number[index];
            }
          });

          // enter expiry date
          document.getElementById('tls_card_information_expirationDate').value = detail.valid;

          // check the box
          document.getElementById('tls_card_information_optIn').click();

          // store date of birth for next screen
          window.localStorage.birthdate = detail.birthdate;

          // go to next page
          document.getElementsByClassName('submit')[0].click();
        });  
      });
      overlay.appendChild(container);
      document.body.appendChild(overlay);
    }
  });
} else if (document.getElementById('tls_person_information_holderBirthDate')) {
  // retrieve date of birth
  let birthdate = window.localStorage.birthdate;

  // fill the field
  document.getElementById('tls_person_information_holderBirthDate').value = birthdate;

  // go to next page
  document.getElementsByClassName('submit')[0].click();
}