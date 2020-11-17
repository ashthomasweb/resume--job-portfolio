// || contact form field checker 




function formFieldCheck() {
    let name = document.forms["contact"]["user_name"].value;
    let email = document.forms["contact"]["user_email"].value;
    let message = document.forms["contact"]["message"].value;
    let elem = document.getElementById("contact-button");
    
    if (name == "" || email == "" || message == "") {
        elem.style.backgroundColor = "var(--theme-lightgreen-alt)";
        elem.style.pointerEvents = "none";
    } else {
        elem.style.backgroundColor = "var(--theme-green)";
        elem.style.pointerEvents = "auto";
    }
}




// || Galleries 

// * gallery image arrays 
const gallery1 = ["/images/gallery/lld-capture.png", "/images/gallery/lld-capture2.png", "2", "word"];
const gallery2 = ["/images/gallery/simon-capture.png", "/images/gallery/simon-capture2.png", "three"];


// || gallery image control buttons 

 

{
let position = 0;
function gallery1Right() {
    if ( position == gallery1.length - 1 ) {
        position = 0;
    } else {
        position++;
    }

    console.log(position);


    // let currentImg = document.getElementById('gallery1-img');
    // currentImg.setAttribute("src", )
}

function gallery1Left() {
    if ( position == 0 ) {
        position = gallery1.length - 1;
    } else {
        position--;
    }

    console.log(position);

    // let currentImg = document.getElementById('gallery1-img');
    // currentImg.setAttribute("src", )
}
}

{
    let position = 0;
    function gallery2Right() {
        if ( position == gallery2.length - 1 ) {
            position = 0;
        } else {
            position++;
        }
    
        console.log(position);
    
    
        // let currentImg = document.getElementById('gallery1-img');
        // currentImg.setAttribute("src", )
    }
    
    function gallery2Left() {
        if ( position == 0 ) {
            position = gallery2.length - 1;
        } else {
            position--;
        }
    
        console.log(position);
    
        // let currentImg = document.getElementById('gallery1-img');
        // currentImg.setAttribute("src", )
    }
    }