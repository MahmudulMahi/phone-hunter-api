const loadPhone = async (searchText='13',isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phones = data.data
  // console.log(phones)
  displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) => {
  // console.log(phones)
  // create
  const phoneContainer=document.getElementById("phone-container")
  phoneContainer.textContent=""

  // display show all button
  const showAllContainer=document.getElementById('show-all-container')

  if(phones.length >12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  console.log("is show ",isShowAll)
  // display 10 phone

  if(!isShowAll){
    phones =phones.slice(0,12)
  }
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
        <button onclick="handelShowDetail('${phone.slug}');show_details.showModal()" class="btn btn-primary">Buy Now</button>
      </div>
    </div>`

    phoneContainer.appendChild(phoneCard)
  });

  toggleLoadSpinner(false)

}

const handelShowDetail= async (id)=>{
  // console.log('clicked',id)

  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data =await res.json();
  const phone =data.data
  console.log(data)
  showPhoneDetail(phone)
}
const showPhoneDetail=(phone)=>{
  // show the model
  console.log(phone)
  const phoneName =document.getElementById('phone-name')
  phoneName.innerText=phone.name

  const showDetailsContainer=document.getElementById('show-details-container')
  showDetailsContainer.innerHTML=`
  <img src="${phone.image}" alt="" />
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
  <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
  
  `
  show_details.showModal()
}

// hendel search button

const handelSearch=(isShowAll)=>{
  toggleLoadSpinner(true)
  const serachField =document.getElementById('search-field')
  const searchText=serachField.value
  // console.log(searchText)
  loadPhone(searchText,isShowAll)
}

// const handelSearch2=()=>{
//   toggleLoadSpinner(true)
//   const serachField=document.getElementById('srarch-field2')
//   const searchText =serachField.value
//   loadPhone(searchText)
// }

const toggleLoadSpinner=(isload)=>{
  const loadingSpinner =document.getElementById('loading-spinner')
  if(isload){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const handelShowAll=()=>{
  handelSearch(true)
}
loadPhone()