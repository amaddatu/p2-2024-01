const searchForm = document.querySelectorAll('.search-form');

const searchHandler = (event) => {
  event.preventDefault();
  

  // capture the term from the form
  let capturedTerm = event.target.children[1].children[1].value;
  capturedTerm = capturedTerm.replace(" ", "+");
  // console.log(event.target);
  console.log(capturedTerm);

  // input validation
  // capturedTerm must exist
  if(capturedTerm.length > 0){
    // redirect the user to results
    window.location = "/turtle/" + capturedTerm;
  }
  else{
    // bootstrap modal is better here
    alert("Please enter a search term");
  }
}
for(var i = 0; i < searchForm.length; i++){
  searchForm[i].addEventListener("submit", searchHandler);
}
