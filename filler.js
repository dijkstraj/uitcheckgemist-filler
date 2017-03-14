if (document.getElementById('tls_card_information_expirationDate')) {
  chrome.runtime.sendMessage({method: "getDetails"}, function(response) {
    let details = response.data;
    details.forEach((detail) => {
      let node = document.createElement('button');
      let textNode = document.createTextNode(detail.name);
      node.appendChild(textNode);
      document.getElementsByTagName('h3')[0].appendChild(node);
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
  });
} else if (document.getElementById('tls_person_information_holderBirthDate')) {
  // retrieve date of birth
  let birthdate = window.localStorage.birthdate;

  // fill the field
  document.getElementById('tls_person_information_holderBirthDate').value = birthdate;

  // go to next page
  document.getElementsByClassName('submit')[0].click();
}