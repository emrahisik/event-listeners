const store=[];
const apiKey = `9b4V7GqPvj8MtNh9x165FjzGJQvImDzu`;
window.addEventListener("DOMContentLoaded", main);

function main(event) {
   let commentForm = document.querySelector(".comment-form");
   commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(formData);
      let name = formData.get("name");
      let search = formData.get("search");
      let isValid = validateForm(name, search);
      if (!isValid) {
        document.querySelector(
          ".error"
        ).innerHTML = `<p class="error">You did not enter your email or comment</p>`;
      } else{
        document.querySelector(
            ".error"
          ).innerHTML = `<p class="success">Your form hs been submitted</p>`;
          axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=1`).then(response=>{
              let image =response.data.data[0].images.original.url; 
              store.push({name, search, image}); 
              console.log(store);
              render();
          })
         
         
      }
    
    });

    function render(){
        let template=``;
        for(let item of store){
            template += `<div class="card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.search}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`;
        }
        console.log(template);
        document.querySelector('.output').innerHTML=template;

    }

  function validateForm(name, search) {
    if (!name || !search) {
      return false;
    }
    return true;
  }
}
