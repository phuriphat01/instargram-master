const addInfo = (res) => {
    const profile = document.querySelector(".profile");
    let html = "";
   
      html += `
          <div class="profile-image">
    
            <img src="${res.profile_image.large}" >
    
          </div>
    
          <div class="profile-user-settings">
    
            <h1 class="profile-user-name">${res.username}</h1>
    
           
    
          </div>
    
          <div class="profile-stats">
    
            <ul>
              <li><span class="profile-stat-count">${res.total_photos}</span> posts</li>
              <li><span class="profile-stat-count">${res.followers_count}</span> followers</li>
              <li><span class="profile-stat-count">${res.following_count}</span> following</li>
            </ul>
    
          </div>
    
          <div class="profile-bio">
    
            <p><span class="profile-real-name">${res.name}</span>,${res.bio} </p>
            <a href="${res.links.html}">unsplash</a>
    
          </div>
      `;
   
    profile.innerHTML = html;
  };

  const photo = (res) => {
    const gallery = document.querySelector(".gallery");
    let html = "";
    res.forEach((element)=>{
   
      html += `
      
				<div class="gallery-item" tabindex="0">

        <img src="${element.urls.full}"
          class="gallery-image" alt="">

        <div class="gallery-item-info">

          <ul>
            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i
                class="fas fa-heart" aria-hidden="true"></i> 94</li>
            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i
                class="fas fa-comment" aria-hidden="true"></i> 3</li>
          </ul>

        </div>

      </div>
      `;
    });
    gallery.innerHTML = html;
  };
  
  const callAPI = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
      addInfo(res);
    } catch (error) {
      console.log("message error --->", error);
      //Do Something 
    }
  };
  
  const callphoto = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/photo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
      photo(res);
    } catch (error) {
      console.log("message error --->", error);
      //Do Something
    }
  };
  
  
 
  
  const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username')

    if(urlParams.has('username')){
    callAPI(username);
    callphoto(username);
    console.log(username);
    }else{
      console.log("no")
    }
 
  };
  
  main();
  