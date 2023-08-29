const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data
  // console.log(phones)
  displayPhones(phones)
}

const displayPhones = phones => {
  // console.log(phones)
  // create
  const phoneContainer=document.getElementById("phone-container")
  phoneContainer.textContent=""

  // display show all button
  const showAllContainer=document.getElementById('show-all-container')

  if(phones.length >12){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }

  // display 10 phone
  phones =phones.slice(0,10)
  phones.forEach(phone => {
    // console.log(phone)
    // create a div
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card  bg-gray-100 shadow-xl p-4`
    // set innerhtml
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>`

    phoneContainer.appendChild(phoneCard)
  });

}

// hendel search button

const handelSearch=()=>{
  const serachField =document.getElementById('search-field')
  const searchText=serachField.value
  // console.log(searchText)
  loadPhone(searchText)
}

const handelSearch2=()=>{
  const serachField=document.getElementById('srarch-field2')
  const searchText =serachField.value
  loadPhone(searchText)
}
// loadPhone()