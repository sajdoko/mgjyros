const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch Animals From API
function fetchAnimals(e) {
  e.preventDefault();

  // Get User Input
  const animal = document.querySelector('#animal').value;
  const zip = document.querySelector('#zip').value;

// Example posting an image URL:

var request = require('request');
request.post({
  url: 'https://api.deepai.org/api/colorizer',
  headers: {
      'Api-Key': '0ea2392a-0e01-4080-883f-10cd3afb35fc'
  },
  formData: {
      'image': 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/34624_1224919482707_4740864_n.jpg?_nc_cat=0&oh=6f2e353d4a1e8d1c126f0e96dc08df3e&oe=5BD95997',
  }
}, function callback(err, httpResponse, body) {
  if (err) {
      console.error('request failed:', err);
      return;
  }
  var response = JSON.parse(body);
  console.log(response);
});

}

// // JSONP Callback
// function callback(data) {
//   console.log(data);
// }

// Show Listings Of Pets
function showAnimals(pets) {
  const results = document.querySelector('#results');
  // Clear First
  results.innerHTML = '';
  // Loop Through Pets
  pets.forEach(pet => {
    console.log(pet);
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name.$t} (${pet.age.$t})</h4>
          <p class="text-secondary">${pet.breeds.breed.$t}</p>
          <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
          <ul class="list-group">
            <li class="list-group-item">Phone: ${pet.contact.phone.$t}</li>
            ${
              pet.contact.email.$t
                ? `<li class="list-group-item">Email: ${
                    pet.contact.email.$t
                  }</li>`
                : ``
            }
            <li class="list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
          </ul>
        </div>
        <div class="col-sm-6 text-center">
          <img class="img-fluid rounded-circle mt-2" src="${
            pet.media.photos.photo[3].$t
          }">
        </div>
      </div>
    `;

    results.appendChild(div);
  });
}