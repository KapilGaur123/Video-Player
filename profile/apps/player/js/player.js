if (sessionStorage.getItem("user") == null) {
  window.location.replace("../../../index.html");
} else {
  // Working on play button
  let video = document.querySelector("#video_player");
  let play_btn = document.querySelector("#play_btn");

  play_btn.onclick = function () {
    if (play_btn.className === "fa-solid fa-circle-play") {
      video.play();
      play_btn.className = "fa-solid fa-circle-pause";
    } else if (play_btn.className === "fa-solid fa-circle-pause") {
      video.pause();
      play_btn.className = "fa-solid fa-circle-play";
    }
  };

  //  Working on progress bar
  video.ontimeupdate = function () {
    let currentTime = this.currentTime;
    let t_duration = this.duration;

    // working on update the time of video
    let v_timing = document.querySelector("#v_timing");
    let current_seconds = currentTime - parseInt(currentTime / 60) * 60;
    let t_seconds = t_duration - parseInt(t_duration / 60) * 60;
    v_timing.innerHTML =
      parseInt(currentTime / 60) +
      ":" +
      parseInt(current_seconds) +
      " / " +
      parseInt(t_duration / 60) +
      ":" +
      t_seconds;

    // calculate the currentTime in presentage for width of progress bar
    // currentTime*100/t_duration
    let progress_bar = document.querySelector("#progress_bar");
    let slide_presentage = (currentTime * 100) / t_duration;
    progress_bar.style.width = slide_presentage + "%";

    //if video complete then button will be change
    let play_btn = document.querySelector("#play_btn");

    if (currentTime === t_duration) {
      play_btn.className = "fa-solid fa-circle-play";
    }
  };

  // Open & Close add_video_box coding
  let open_video_box_btn = document.querySelector("#open_video_box_btn");
  open_video_box_btn.onclick = function () {
    let open_video_box = document.querySelector("#open_video_box");

    if (open_video_box_btn.className === "fa-solid fa-circle-plus") {
      open_video_box.style.display = "block";
      open_video_box_btn.className = "fa-solid fa-circle-xmark";
    } else if (open_video_box_btn.className === "fa-solid fa-circle-xmark") {
      open_video_box.style.display = "none";
      open_video_box_btn.className = "fa-solid fa-circle-plus";
    }
  };

  let current_user = sessionStorage.getItem("user");

  // Add video name & url in localStorage
  let add_video_btn = document.querySelector("#add_video_btn");

  add_video_btn.onclick = function () {
    let video_name = document.querySelector("#video_name");
    let video_link = document.querySelector("#video_link");

    if (video_name.value !== "" && video_link.value !== "") {
      let v_obj = { name: video_name.value, link: video_link.value };
      let v_txt = JSON.stringify(v_obj);

      localStorage.setItem(current_user + "_video" + video_name.value, v_txt);
    }
  };

  // Fecth the video name and Url from localStorage
  // Create Dynamic main_video_box coding view the structure in Dynamic_coding_str

  function load_video() {
    for (let i = 0; i < localStorage.length; i++) {
      let all_keys = localStorage.key(i);

      if (all_keys.match("_video")) {
        let json_form_data = localStorage.getItem(all_keys);
        let convered_obj_data = JSON.parse(json_form_data);

        // Creating Elements
        let main = document.createElement("DIV");
        let para = document.createElement("P");
        let B_play = document.createElement("BUTTON");
        let B_delete = document.createElement("BUTTON");

        // Give id,type etc.
        main.setAttribute("id", "main_video_box");
        para.setAttribute("id", "playlist_video_name");
        B_play.setAttribute("type", "button");
        B_play.setAttribute("id", "video_play_btn");
        B_delete.setAttribute("type", "button");
        B_delete.setAttribute("id", "video_delete_btn");

        // give the class to play button
        B_play.className = "v_play_btn";
        para.setAttribute("class","para_name");

        // give the class to play button
        B_delete.setAttribute("class","v_delete_btn");

        // innerHtml content
        para.innerHTML = convered_obj_data.name;
        B_play.innerHTML = "Play";
        B_delete.innerHTML = "Delete";

        // give the url in play button
        B_play.setAttribute("src", convered_obj_data.link);

        // appent the child
        main.appendChild(para);
        main.appendChild(B_play);
        main.appendChild(B_delete);

        // also appent the main child in super child
        let super_main = document.querySelector("#bottom");
        super_main.appendChild(main);
      }
    }
  }

  load_video();

  function play_video() {
    let v_play_btn = document.querySelectorAll(".v_play_btn");

    for (let i = 0; i < v_play_btn.length; i++) {
      v_play_btn[i].onclick = function () {
        clear_func();
        let video_url = this.getAttribute("src");
        let playerHTML_video_src = document.querySelector("#video_src");

        playerHTML_video_src.setAttribute("src", video_url);
        video.load();
        video.play();
        play_btn.className = "fa-solid fa-circle-pause";
        this.innerHTML = "Playing...";
      };
    }
  }
  function clear_func() {
    let v_play_btn = document.querySelectorAll(".v_play_btn");

    for (let i = 0; i < v_play_btn.length; i++) {
      v_play_btn[i].innerHTML = "Play";
    }
  }
  play_video();

  // next btn coding ( >> )
  function next_button() {
    let next_right_btn = document.querySelector("#right_btn");

    next_right_btn.onclick = function () {
      let all_play_btn = document.querySelectorAll(".v_play_btn");

      for (let i = 0; i < all_play_btn.length; i++) {
        if (all_play_btn[i].innerHTML === "Playing...") {
          // Find the parentElement as well as next Sibling element
          let next_element_sibling = all_play_btn[i].parentElement.nextSibling;

          let next_play_button =
            next_element_sibling.querySelector(".v_play_btn");
          next_play_button.click();
          // when if(...) condition is true then this if statement do not run
          return false;
        }
      }
    };
  }

  next_button();

  // previous_button coding ( >> )
  function previous_button() {
    let previous_left_btn = document.querySelector("#left_btn");

    previous_left_btn.onclick = function () {
      let all_play_btn = document.querySelectorAll(".v_play_btn");

      for (let i = 0; i < all_play_btn.length; i++) {
        if (all_play_btn[i].innerHTML === "Playing...") {
          // Find the parentElement as well as next Sibling element
          let previous_element_sibling = all_play_btn[i].parentElement.previousSibling;

          let privious_play_button = previous_element_sibling.querySelector(".v_play_btn");
          privious_play_button.click();
          // when if(...) condition is true then this if statement do not run
          return false;
        }
      }
    };
  }

  previous_button();

  // Delete button working of player
  // This code is working but slow performance
  // function Video_Delete_Btn(){
  //   let video_delete_btn = document.querySelector("#video_delete_btn");

  //   video_delete_btn.onclick = function(){
  //     let v_delete_btn = document.querySelectorAll(".v_delete_btn");

  //     for(let i = 0; i < v_delete_btn.length; i++){

  //       v_delete_btn[i].onclick = function(){
  //         let del_ele_parent = this.parentElement;
  //         let para_tag_ele = del_ele_parent.querySelector("#playlist_video_name");

  //         let username = para_tag_ele.innerHTML;
  //         // alert(username);
  //         // del_ele_parent.remove();

  //         localStorage.removeItem(current_user+"_video"+username);
  //         del_ele_parent.classList = "animate__animated animate__bounceOut";
  //         setTimeout(function(){
  //           del_ele_parent.remove();
  //         },1000);

  //       }
  //     }
  //   }
  // }

  // Video_Delete_Btn(); 


  // Delete button working of player
  // provide by chatgbt, fast running condition code 
    function Video_Delete_Btn() {
      let video_delete_btn = document.querySelector("#video_delete_btn");

      video_delete_btn.onclick = function() {
          // Event delegation: attaching the event listener to the parent element
          document.addEventListener('click', function(event) {
              if (event.target && event.target.classList.contains('v_delete_btn')) {
                  let del_ele_parent = event.target.parentElement;
                  let para_tag_ele = del_ele_parent.querySelector("#playlist_video_name");

                  let username = para_tag_ele.innerHTML;
                  localStorage.removeItem(current_user + "_video" + username);
                  // del_ele_parent.className = "animate__animated animate__bounceOut";
                  setTimeout( function(){
                    del_ele_parent.remove();
                  },1000);
              }
          });
      }
  }

  Video_Delete_Btn();

  // video volume coding
  function volume(){

    let volume = document.querySelector("#volume");

    volume.onclick = function(){
      let volume_control = document.querySelector("#volume_control");
      if(volume_control.style.display === "none"){
        volume_control.style.display = "block";
        volume_control.oninput = function(){

          video.volume = this.value;
        }
      }
      else{
        volume_control.style.display = "none";
      }
    }
  }

  volume();

  // Progress bar coding forward and backword coding
  function progress(){
    let progress_box = document.querySelector("#progress_box");
    progress_box.onclick = function(event){

      let presentage = event.offsetX/this.offsetWidth;
      video.currentTime = presentage*video.duration;
    }
  }

  progress();

  // full screen coding
  function fullscreen(){
    let full_screen = document.querySelector("#full_screen");
    full_screen.onclick = function(){
      video.requestFullscreen();
    }
  }

  fullscreen();

  // video Speep coding
  function speed_func(){

    let speed = document.querySelector("#speed");

    speed.onclick = function(){
      let speed_control = document.querySelector("#speed_control");
      if(speed_control.style.display === "none"){
        speed_control.style.display = "block";
        speed_control.oninput = function(){

          video.playbackRate = this.value;
        }
      }
      else if(speed_control.style.display === "block"){
        speed_control.style.display = "none";
      }
    }
  }

  speed_func();

  let search = document.querySelector("#search");
    search.oninput = () => {
        let all_contact_name = document.querySelectorAll(".para_name");

        for (let i = 0; i < all_contact_name.length; i++) {
            if(all_contact_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())){
                all_contact_name[i].parentElement.style.display = "block";
            }
            else{
                all_contact_name[i].parentElement.style.display = "none";
            }
        }
    }
}
