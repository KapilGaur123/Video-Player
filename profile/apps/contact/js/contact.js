// Start Security checking if { when url is copy by other person}

if(sessionStorage.getItem("user") == null){
    window.location.replace("../../../index.html");
}
else{
    //Start working on profile image of contact.html
    let user_email = sessionStorage.getItem("user");
    let image_url = localStorage.getItem(user_email+"_image");
    let profile_pic = document.querySelector("#profile_pic");
    profile_pic.style.backgroundImage = "url("+image_url+")";
    profile_pic.style.backgroundSize = "cover";
    profile_pic.style.backgroundPosition = "center";

    // Start working on add_contant_icon button
    let add_icon = document.querySelector("#new_contact_icon");
    add_icon.onclick = function(){
        let contact_background = document.querySelector("#contact_background");
        contact_background.style.display = "block";
    }

    // Close_button working start
    let close_btn = document.querySelector("#close");
    close_btn.onclick = function(){
        let contact_background = document.querySelector("#contact_background");
        contact_background.style.display = "none";
        window.location = location.href;
    }
    // Close button working end

    // Add contact in localStorage with add button Start
    let add_btn = document.querySelector("#add");
    add_btn.onclick = function(){
        let c_name = document.querySelector("#c_name");
        let c_number = document.querySelector("#c_number");

        if(c_name.value !== "" && c_number.value !== ""){
            let obj_contact_data = {name : c_name.value ,number : c_number.value};
            //server con't process obt data so convert into string data
            let json_txt = JSON.stringify(obj_contact_data);
            localStorage.setItem(user_email+"_contact"+c_name.value,json_txt);
            add_btn.innerHTML = "Success";
            add_btn.style.color = "red";
            add_btn.style.backgroundColor = "green";
            setTimeout(function(){
                add_btn.style.color = "black";
                add_btn.style.backgroundColor = "yellow";
                c_name.value = "";
                c_number.value = "";
            },2000);
            return false;
        }
        else{   
                let c_name = document.querySelector("#c_name");
                let c_number = document.querySelector("#c_number");
                if(c_name.value === null){
                    let contact_name_war = document.querySelector("#contact_name_war");
                    contact_name_war.style.display = "block";
                    c_name.style.borderBottomColor = "red";

                    c_name.onclick = () => {
                        c_name.value = "";
                        contact_name_war.style.display = "none";
                        c_name.style.borderBottomColor = "yellow";
                    }
                }
                else{
                    
                }
                return false;
        }
    }
    //  End of Add contact in localStorage with add button { End }
    

    /* 
       localStorage.length method return the number of keys stored in localstorage
       alert(localStorage.length);
       To find the index of the key we use the key(index no.) property
       alert(localStorage.key(0)); 
    */

    // Dynamicaly crete elements and access them
    function all_contacts(){
        let i;
        for(i=0; i < localStorage.length; i++){
            let all_kays = localStorage.key(i);
            let user_sessionStorage_email = sessionStorage.getItem("user");
            if(all_kays.match(user_sessionStorage_email+"_contact")){
                let JSON_txt_data = localStorage.getItem(all_kays);
                let obj_data = JSON.parse(JSON_txt_data);
                
                // Dynamically creating all_contact_box content through javaScript
                // Create element First
                let contact_box = document.createElement("DIV");
                let name_p = document.createElement("P");
                let name_i = document.createElement("I");
                let tool = document.createElement("DIV");
                let edit_i = document.createElement("I");
                let detete_i = document.createElement("I");
                let line = document.createElement("HR");
                let number_p = document.createElement("P");
                let number_i = document.createElement("I");

                // Fourth step is pass the id & class to all Tag or element must be same { seen in all_contact_coding file }
                contact_box.setAttribute("id","contact");
                name_p.setAttribute("class","contact_name");
                name_i.setAttribute("class","fas fa-user");
                tool.setAttribute("id","tool");
                edit_i.setAttribute("class","fas fa-edit edit");
                detete_i.setAttribute("class","fas fa-trash del");
                line.setAttribute("color","yellow");
                line.setAttribute("width","75%");
                line.setAttribute("size","1");
                number_i.setAttribute("class","fas fa-mobile-alt");

                // Second step is append child Tag in parent Tag
                name_p.appendChild(name_i);
                name_p.innerHTML += " "+obj_data.name;
                
                tool.appendChild(edit_i);
                tool.appendChild(detete_i);

                number_p.appendChild(number_i);
                number_p.innerHTML += " "+obj_data.number;

                // Third step is again append child tag in contact_box
                contact_box.appendChild(name_p);
                contact_box.appendChild(tool);
                contact_box.appendChild(line);
                contact_box.appendChild(number_p);

                // Fifth step is also again appent element into parent element
                let all_contact_box = document.querySelector("#all_contact_box");
                all_contact_box.appendChild(contact_box);
            }
        }
    }

    all_contacts();

    // working on Search functionlity of contact.html
    let search = document.querySelector("#search");
    search.oninput = () => {
        let all_contact_name = document.getElementsByClassName("contact_name");

        for (let i = 0; i < all_contact_name.length; i++) {
            if(all_contact_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())){
                all_contact_name[i].parentElement.style.display = "block";
            }
            else{
                all_contact_name[i].parentElement.style.display = "none";
            }
        }
    }

    // Delete icon working 
    function delete_func(){
        let del = document.getElementsByClassName("del"); // select by className
        let i;
        for(i=0; i<del.length; i++){
            del[i].onclick = function(){
                let parent = this.parentElement.parentElement;
                // document means overall document page but we use parent of element
                let p_ele = parent.getElementsByClassName("contact_name")[0];
                let username = p_ele.innerHTML.replace('<i class="fas fa-user"></i>','');
                // alert(user_email+"_contact"+username.trim());
                localStorage.removeItem(user_email+"_contact"+username.trim());
                // trim() is use for remove spaces in string or data
                //passing the animation to the parent element
                parent.className = "animate__animated animate__zoomOutDown";
                setTimeout(function(){
                    parent.remove();
                },1000);
            }
        }
    }
    delete_func();

    // Edit icon working
    function edit_func(){
        edit_icon = document.querySelectorAll(".edit");
        for(let i = 0; i < edit_icon.length; i++){
            edit_icon[i].onclick = function(){
                let super_parent = this.parentElement.parentElement;
        /* 1st, This method is right but we use second method creating by STP
                let name = super_parent.querySelector(".contact_name").innerHTML;
                let name2 = name.replace('<i class="fas fa-user"></i>','');
                alert(name2);
            */
                let para_tag = super_parent.getElementsByTagName("P");
                let name = para_tag[0].innerHTML.replace('<i class="fas fa-user"></i>','').trim();
                let number = para_tag[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>','').trim();

                //access the input boxes of Add contanc box
                let c_name = document.querySelector("#c_name");
                let c_number = document.querySelector("#c_number");
                c_name.value = name;
                c_number.value = number;
                let h1_c_heading = document.querySelector("#c_heading");
                let contactBox_add_btn = document.querySelector("#add");
                let add_new_user_btn = document.querySelector("#new_contact_icon");
                let contactBox_close_btn = document.querySelector("#close");
                h1_c_heading.innerHTML = "Edit Contant";
                contactBox_add_btn.innerHTML = "Updata";
                //Automatically open add contact box when user click on edit icon 
                add_new_user_btn.click();
                // delete key from the localStorage
                localStorage.removeItem(user_email+"_contact"+name);
                // Remove the Close btn this create a bug
                contactBox_close_btn.style.display = "none";
            }
        }
    }

    edit_func();
    
}
// end Security checking if { when url is copy by other person}