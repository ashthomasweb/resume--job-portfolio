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
