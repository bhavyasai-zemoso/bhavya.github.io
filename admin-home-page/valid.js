var email = document.getElementById("email");

email.addEventListener("input", function(event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Please enter a valid mail address!");
    } else {
        email.setCustomValidity("");
    }
});

var mobile_number = document.getElementById("number");

mobile_number.addEventListener("input", function(event) {
    if (mobile_number.value && !mobile_number.value.match(/^([1-9]{1})[0-9]{9}$/g)) {
        if (mobile_number.value)
            mobile_number.setCustomValidity("Please enter a valid mobile number!");

    } else
        mobile_number.setCustomValidity("");

});