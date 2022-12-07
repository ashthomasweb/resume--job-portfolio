// Main JS file for "Job-portfolio"

// || contact form field checker

function toggleProjectPane(e) {
    let personalElem = document.querySelector(".personal-projects");
    let professionalElem = document.querySelector(".professional-projects");
    let header = document.querySelector('#project-header')
    let topSwitchInput = document.querySelector('#top-switch-input')
    if (personalElem.dataset.display === 'true') {
        if (e.target.id === 'lower-switch') {
            topSwitchInput.checked = false
            setTimeout(() => {
                window.scrollTo({left: 0, top: 400, behavior: 'smooth'})
            }, 10);
            setTimeout(() => {
                professionalElem.style.display = 'block'
            }, 190);
            setTimeout(() => {
                personalElem.dataset.display = 'false'
                personalElem.style.display = 'none'
            }, 1000);
        } else {
            personalElem.dataset.display = 'false'
            personalElem.style.display = 'none'
            professionalElem.style.display = 'block'
        }
        header.textContent = 'Professional Projects'
    } else if (personalElem.dataset.display === 'false'){
        personalElem.dataset.display = 'true'
        personalElem.style.display = 'block'
        professionalElem.style.display = 'none'
        header.textContent = 'Personal Projects'
    }
}

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

// || Galleries 

// * gallery image arrays 
const gallery1 = [
    "/images/gallery/loose-leash-dog/lld-capture.png",
    "/images/gallery/loose-leash-dog/lld-capture2.png",
    "/images/gallery/loose-leash-dog/lld1.png",
    "/images/gallery/loose-leash-dog/lld3.png",
    "/images/gallery/loose-leash-dog/lld4.png",
    "/images/gallery/loose-leash-dog/lld7.png",
];
const gallery3 = [
    "/images/gallery/lumber/capture.png",
    "/images/gallery/lumber/capture1.png",
    "/images/gallery/lumber/capture2.png",
    "/images/gallery/lumber/capture3.png",
    "/images/gallery/lumber/capture4.png",
    "/images/gallery/lumber/capture5.png",
    "/images/gallery/lumber/mobile.png"
];
const gallery4 = [
    "/images/gallery/music-trainer/melody.jpg",
    "/images/gallery/music-trainer/tempo.jpg",
    "/images/gallery/music-trainer/generator.jpg"
];
const gallery5 = [
    "/images/gallery/wyldgreens/Capture1.png",
    "/images/gallery/wyldgreens/wg1.png",
    "/images/gallery/wyldgreens/wg2.png",
    "/images/gallery/wyldgreens/Capture2.png",
    "/images/gallery/wyldgreens/wg3.png",
];
const gallery6 = [
    "/images/gallery/metaqdb/window-view.jpg",
    "/images/gallery/metaqdb/capture3.png",
    "/images/gallery/metaqdb/capture1.png",
    "/images/gallery/metaqdb/capture2.png",
    "/images/gallery/metaqdb/capture4.png"
];
const gallery7 = [
    "/images/gallery/elephant-chart/EC6.png",
    "/images/gallery/elephant-chart/EC5.png",
    "/images/gallery/elephant-chart/EC1.png",
    "/images/gallery/elephant-chart/EC3.png",
];

const gallery8 = [
    "/images/gallery/logger/Capture1.png",
    "/images/gallery/logger/Capture2.png",
    "/images/gallery/logger/Capture3.png",
];

const gallery9 = [
    "/images/gallery/skylines/dashboard.png",
];

const gallery10 = [
    "/images/gallery/FERN/Capture.png",
    "/images/gallery/FERN/Capture1.png",
];

// gallery image copy/paste control scopes - Rainy day refactor project!

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

{
    let position = 0;
    let currentImg = document.getElementById('gallery6-img');

    function gallery6Right() {
        if (position == gallery6.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery6[position])
    }

    function gallery6Left() {
        if (position == 0) {
            position = gallery6.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery6[position])
    }
}

{
    let position = 0;
    let currentImg = document.getElementById('gallery7-img');

    function gallery7Right() {
        if (position == gallery7.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery7[position])
    }

    function gallery7Left() {
        if (position == 0) {
            position = gallery7.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery7[position])
    }
}


{
    let position = 0;
    let currentImg = document.getElementById('gallery8-img');

    function gallery8Right() {
        if (position == gallery8.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery8[position])
    }

    function gallery8Left() {
        if (position == 0) {
            position = gallery8.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery8[position])
    }
}

{
    let position = 0;
    let currentImg = document.getElementById('gallery9-img');

    function gallery9Right() {
        if (position == gallery9.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery9[position])
    }

    function gallery9Left() {
        if (position == 0) {
            position = gallery9.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery9[position])
    }
}


{
    let position = 0;
    let currentImg = document.getElementById('gallery10-img');

    function gallery10Right() {
        if (position == gallery10.length - 1) {
            position = 0;
        } else {
            position++;
        }
        currentImg.setAttribute("src", gallery10[position])
    }

    function gallery10Left() {
        if (position == 0) {
            position = gallery10.length - 1;
        } else {
            position--;
        }
        currentImg.setAttribute("src", gallery10[position])
    }
}

document.querySelector('.edu-exp-wrap').addEventListener('mouseover', function() {
	document.querySelector('.exp-wrap').style.animationPlayState = 'paused'
})

document.querySelector('.edu-exp-wrap').addEventListener('mouseout', function() {
	document.querySelector('.exp-wrap').style.animationPlayState = 'running'
})


// END of document
