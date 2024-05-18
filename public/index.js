// Main JS file for "Job-portfolio"

function toggleProjectPane(e) {
    let personalElem = document.querySelector(".personal-projects");
    let professionalElem = document.querySelector(".professional-projects");
    let header = document.querySelector('#project-header')
    let topSwitchInput = document.querySelector('#top-switch-input')
    if (personalElem.dataset.display === 'true') {
        if (e.target.id === 'lower-switch') {
            topSwitchInput.checked = false
            setTimeout(() => {
                window.scrollTo({ left: 0, top: 400, behavior: 'smooth' })
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
    } else if (personalElem.dataset.display === 'false') {
        personalElem.dataset.display = 'true'
        personalElem.style.display = 'block'
        professionalElem.style.display = 'none'
        header.textContent = 'Personal Projects'
    }
}

const galleryObject = {
    1: {
        position: 0,
        images: [
            "/images/gallery/loose-leash-dog/lld-capture.png",
            "/images/gallery/loose-leash-dog/lld-capture2.png",
            "/images/gallery/loose-leash-dog/lld1.png",
            "/images/gallery/loose-leash-dog/lld3.png",
            "/images/gallery/loose-leash-dog/lld4.png",
            "/images/gallery/loose-leash-dog/lld7.png",
        ]
    },
    2: {
        position: 0,
        images: []
    },
    3: {
        position: 0,
        images: [
            "/images/gallery/lumber/capture.png",
            "/images/gallery/lumber/capture1.png",
            "/images/gallery/lumber/capture2.png",
            "/images/gallery/lumber/capture3.png",
            "/images/gallery/lumber/capture4.png",
            "/images/gallery/lumber/capture5.png",
            "/images/gallery/lumber/mobile.png"
        ]
    },
    4: {
        position: 0,
        images: [
            "/images/gallery/music-trainer/melody.jpg",
            "/images/gallery/music-trainer/tempo.jpg",
            "/images/gallery/music-trainer/generator.jpg"
        ]
    },
    5: {
        position: 0,
        images: [
            "/images/gallery/wyldgreens/Capture1.png",
            "/images/gallery/wyldgreens/wg1.png",
            "/images/gallery/wyldgreens/wg2.png",
            "/images/gallery/wyldgreens/Capture2.png",
            "/images/gallery/wyldgreens/wg3.png",
        ]
    },
    6: {
        position: 0,
        images: [
            "/images/gallery/metaqdb/window-view.jpg",
            "/images/gallery/metaqdb/capture3.png",
            "/images/gallery/metaqdb/capture1.png",
            "/images/gallery/metaqdb/capture2.png",
            "/images/gallery/metaqdb/capture4.png"
        ]
    },
    7: {
        position: 0,
        images: [
            "/images/gallery/elephant-chart/EC6.png",
            "/images/gallery/elephant-chart/EC5.png",
            "/images/gallery/elephant-chart/EC1.png",
            "/images/gallery/elephant-chart/EC3.png",
        ]
    },
    8: {
        position: 0,
        images: [
            "/images/gallery/logger/Capture1.png",
            "/images/gallery/logger/Capture2.png",
            "/images/gallery/logger/Capture3.png",
        ]
    },
    9: {
        position: 0,
        images: [
            "/images/gallery/skylines/dashboard.png",
        ]
    },
    10: {
        position: 0,
        images: [
            "/images/gallery/FERN/Capture.png",
            "/images/gallery/FERN/Capture1.png",
        ]
    },
    11: {
        position: 0,
        images: [
            '/images/gallery/codestasher/Capture.png',
            '/images/gallery/codestasher/Capture1.png',
        ]
    },
    12: {
        position: 0,
        images: [
            '/images/gallery/lake-level-viewer/llv-1.png',
            '/images/gallery/lake-level-viewer/llv-2.png',
            '/images/gallery/lake-level-viewer/llv-3.png',
            '/images/gallery/lake-level-viewer/llv-4.png',
            '/images/gallery/lake-level-viewer/llv-5.png',
            '/images/gallery/lake-level-viewer/llv-6.png',
            '/images/gallery/lake-level-viewer/llv-7.png',
            '/images/gallery/lake-level-viewer/llv-8.png',
        ]
    },
    13: {
        position: 0,
        images: [
            '/images/gallery/enow/enow-2.png',
            '/images/gallery/enow/enow-3.png',
            '/images/gallery/enow/enow-1.png',
        ]
    },
    14: {
        position: 0,
        images: [
            '/images/gallery/hal/hal-1.png',
        ]
    }
}

function galleryRight(galleryNumber) {
    let currentImg = document.getElementById(`gallery${galleryNumber}-img`);
    if (galleryObject[galleryNumber].position == galleryObject[galleryNumber].images.length - 1) {
        galleryObject[galleryNumber].position = 0;
    } else {
        galleryObject[galleryNumber].position++;
    }
    currentImg.setAttribute("src", galleryObject[galleryNumber].images[galleryObject[galleryNumber].position])
}

function galleryLeft(galleryNumber) {
    let currentImg = document.getElementById(`gallery${galleryNumber}-img`);
    if (galleryObject[galleryNumber].position == 0) {
        galleryObject[galleryNumber].position = galleryObject[galleryNumber].images.length - 1;
    } else {
        galleryObject[galleryNumber].position--;
    }
    currentImg.setAttribute("src", galleryObject[galleryNumber].images[galleryObject[galleryNumber].position])
}

// END of document
