// using a class allows me to do multiple forms
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
    // this allows to detect a different url and do render differently
    if(window.location.href.indexOf('axios') > 0){
      window.location = "/axios-turtle/" + capturedTerm;
    }
    else{
      // redirect the user to results
      window.location = "/turtle/" + capturedTerm;
    }
  }
  else{
    // bootstrap modal is better here
    alert("Please enter a search term");
  }
}

// must use a for-loop to attach event listener to all respective forms
for(var i = 0; i < searchForm.length; i++){
  searchForm[i].addEventListener("submit", searchHandler);
}
