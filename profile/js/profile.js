    // Check condition, if anyone copy the URL of the profile.html than who can not open & access the profile page because key of sessionStorage is null
    if(sessionStorage.getItem("user") === null){
        window.location.replace("../index.html");
    }
    else{
        // Start working on profile name portion 
        let user_email = sessionStorage.getItem("user");
        let json_text = localStorage.getItem(user_email);
        let obj_data = JSON.parse(json_text);
        let profile_name = document.getElementById("profile_name");
        profile_name.innerHTML = atob(obj_data.username);
        // change the main profile username
        let main_profile_username = document.querySelector("#profile_username");
        main_profile_username.innerHTML = atob(obj_data.username);
        // change the main profile username
        // End working on name portion

        // Start working on profile session, if user once complete profile than profile session does not display again

        if(localStorage.getItem(user_email+"_image") !== null){
            let cover_page = document.querySelector("#page_cover");
            let main_profile_page = document.querySelector("#main_profile_page");
            cover_page.style.display = "none";
            main_profile_page.style.display = "block";
        }
        // End woking on profile session
        // Start working on profile image upload 
        let profile_upload = document.querySelector("#profile_upload"); //inputElement
        let profile_icon = document.querySelector("#profile_icon"); //fas fa-icon
        profile_upload.onchange = () => {
// FileReader methor read the stored file in you computer {using <input type ="file">}
            let F_Reader = new FileReader(); 
            F_Reader.readAsDataURL(profile_upload.files[0]);
            F_Reader.onload = () => {
                let FilePhoto = F_Reader.result;
                let profile_pic = document.querySelector("#profile_pic");
                profile_pic.style.backgroundImage = "URL("+FilePhoto+")";
                profile_pic.style.backgroundSize = "cover";
                profile_pic.style.backgroundPosition = "center";
                profile_icon.style.display = "none";
                // Start working on profile button 
                let next_btn = document.getElementById("next");
                next_btn.style.display = "block";
                next_btn.style.marginLeft = "20px";
             // End working on profile image upload 
            
                // Start working on image store in localstorage 
                next_btn.onclick = () => {
                    localStorage.setItem(user_email+"_image",FilePhoto);
                    let cover_page = document.querySelector("#page_cover");
                    let main_profile_page = document.querySelector("#main_profile_page");
                    cover_page.style.display = "none";
                    main_profile_page.style.display = "block";
                    // Reload the for image because 1st time img not seen 
                    window.location = location.href; 
                }
                // End working on image store in localstorage 
                // End working on profile button 
            }
        }
        //Start working on main profile image upload 
        let img_url = localStorage.getItem(user_email+"_image");
        let main_profile_picture = document.querySelector("#profile_picture");
        main_profile_picture.style.backgroundImage = "url("+img_url+")";
        main_profile_picture.style.backgroundSize = "cover";
        main_profile_picture.style.backgroundPosition = "center";
        //End working on main profile image upload 

        // Start working on mail_profile logout session 
        let logout = document.querySelector("#logout");
        logout.onclick = function(){
            sessionStorage.clear();
            let logout_text = document.querySelector("#logout_text");
            logout_text.innerHTML = "Please Wait...";
            setTimeout(function(){
                window.location.replace("../index.html");
            },2000);
        }
        // End working on mail_profile logout session 
    }