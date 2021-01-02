// || contact form field checker

function formFieldCheck() {
    let name = document.forms["contact"]["user_name"].value;
    let email = document.forms["contact"]["user_email"].value;
    let message = document.forms["contact"]["message"].value;
    let elem = document.getElementById("contact-button");

    if (name == "" || email == "" || message == "") {
        elem.style.backgroundColor = "var(--theme-darkgreen)";
        elem.style.pointerEvents = "none";
    } else {
        elem.style.backgroundColor = "var(--theme-yellow)";
        elem.style.pointerEvents = "auto";
    }
}

function testThis() {

    document.getElementById("contact-button").innerText = "SENT"
    document.getElementById("hidden-response").style.display = "block";

}



// || Galleries 

// * gallery image arrays 
const gallery1 = ["/images/gallery/lld-capture.png", "/images/gallery/lld-capture2.png"];
const gallery2 = ["/images/gallery/simon-capture.png", "/images/gallery/simon-capture2.png"];
const gallery3 = [];
const gallery4 = [];
const gallery5 = [];


// || gallery image control buttons 

{
    let position = 0;
    let currentImg = document.getElementById('gallery1-img');

    function gallery1Right() {
        if (position == gallery1.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery1[position])
    }

    function gallery1Left() {
        if (position == 0) {
            position = gallery1.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery1[position])
    }
} 

{
    let position = 0;
    let currentImg = document.getElementById('gallery2-img');

    function gallery2Right() {
        if (position == gallery2.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery2[position])
    }

    function gallery2Left() {
        if (position == 0) {
            position = gallery2.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery2[position])
    }
}

{
    let position = 0;
    let currentImg = document.getElementById('gallery3-img');

    function gallery3Right() {
        if (position == gallery3.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery3[position])
    }

    function gallery3Left() {
        if (position == 0) {
            position = gallery3.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery3[position])
    }
} 

{
    let position = 0;
    let currentImg = document.getElementById('gallery4-img');

    function gallery4Right() {
        if (position == gallery4.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery4[position])
    }

    function gallery4Left() {
        if (position == 0) {
            position = gallery4.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery4[position])
    }
} 

{
    let position = 0;
    let currentImg = document.getElementById('gallery5-img');

    function gallery5Right() {
        if (position == gallery5.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery5[position])
    }

    function gallery5Left() {
        if (position == 0) {
            position = gallery5.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery5[position])
    }
}

