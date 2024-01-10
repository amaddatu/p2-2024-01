  // need to hide the api key from the git repo and use an env variable instead
  const baseurl = "https://api.giphy.com/v1/gifs/search?api_key=::api_key::&q=::placeholder::&limit=25&offset=0&rating=pg&lang=en&bundle=messaging_non_clips";
  // term is something that we to turn into a dynamic piece of our url
  const doApiCall = async (apikey, term) => {
    try{
      const response = await fetch(baseurl.replace("::api_key::", apikey).replace("::placeholder::", term), {
        method: "GET"
      });
      const data = await response.json();
      console.log(data);
      // url is here
      console.log(data.data[0].url);
      // create
      const imgTag = document.createElement('img');

      // attr/text
      imgTag.setAttribute("src", data.data[0].images.original.url);

      //append
      document.querySelector("#giphy").append(imgTag);
    } catch (err) {
      console.log(err);
    }
  }
  doApiCall(apikey, searchterm);