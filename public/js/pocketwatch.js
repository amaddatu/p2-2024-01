const watchForm = document.querySelector("#pocketwatch-form");
const brandInput = document.querySelector("#brand-input");
const modelInput = document.querySelector("#model-input");
const priceInput = document.querySelector("#price-input");

const doApiCall = async (event) => {
  event.preventDefault();
  console.log("submit");

  const brand = brandInput.value;
  const model = modelInput.value;
  const price = priceInput.value;

  // do some sort of input validation
  // console.table({brand,model,price});
  console.log({brand,model,price})
  const baseurl = "/api/pocketwatch";
  try{
    const response = await fetch(baseurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({brand,model,price})
    });
    if(response.status === 400){
      // bootstrap modal is better instead of alert
      alert("you made a boo-boo");
      return; // end the function
    }
    console.log(response);
    const data = await response.json();
    console.log(data);

    // redirect to a profile or another page that lists the info
    // bootstrap modal is better than alert
    alert("You did good! \n" + JSON.stringify(data));
  } catch (err) {
    // workaround until we have input validation
    console.log(err);
  }
}
// doApiCall();
console.log("connected pocketwatch");
// don't attach to button
// attach to the form instead
watchForm.addEventListener('submit', doApiCall);