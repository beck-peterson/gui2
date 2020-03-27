const dogForm = document.querySelector('#add-dog-form');


// asynchronus call, fires then() when .get() has retrieved a snapshot of the database
db.collection('Dog').get().then((snapshot) => {
      // cycle through each document in the Dog collection and print to console
      snapshot.docs.forEach(doc => {
          console.log(doc.data())
      })
})


// saving data from AddDog form
// (e) is callback event
dogForm.addEventListener('submit' , (e) => {
  // want to prevent default because otherwise it reloads the page
    e.preventDefault()
    // get reference to Dog collection and retrieve values from form
    db.collection('Dog').add({
        age: dogForm.dogAge.value,
        breed: dogForm.dogBreed.value,
        city: dogForm.dogCity.value,
        dogPurpose: $('dogPurpose:checked').val(),
        name: dogForm.dogName.value,
        sex: dogForm.dogSex.value,
        state: dogForm.dogState.value,
        zip: dogForm.dogZip.value,
    })
})
