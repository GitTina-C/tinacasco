(function (window, document) {

    function getElements() {
        return {
            layout: document.getElementById('layout'),
            menu: document.getElementById('menu'),
            menuLink: document.getElementById('menuLink')
        };
    }

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/);
        var length = classes.length;
        var i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll() {
        var active = 'active';
        var elements = getElements();

        toggleClass(elements.layout, active);
        toggleClass(elements.menu, active);
        toggleClass(elements.menuLink, active);
    }
    
    function handleEvent(e) {
        var elements = getElements();
        
        if (e.target.id === elements.menuLink.id) {
            toggleAll();
            e.preventDefault();
        } else if (elements.menu.className.indexOf('active') !== -1) {
            toggleAll();
        }
    }

    document.addEventListener('click', handleEvent);

}(this, this.document));

/* validate Handler */
function validate(e) {
	hideErrors();

	if (!validateContactInfo()) {
		e.preventDefault();
		return false;
	}

    alert("Message Sent!")
	return true;
}

// function to Check if input fields are empty 
function isFieldEmpty(value, errorId, errorMessage) {
    if (value.trim() === "") {
        displayError(errorId, errorMessage);
        return true;
    } else {
        hideError(errorId);
        return false;
    }
}

/* email validation */
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function displayError(errorId, errorMessage) {
	const errorElement = document.getElementById(errorId);
	errorElement.textContent = errorMessage;
	errorElement.style.display = "block";
}

function hideError(errorId) {
	const errorElement = document.getElementById(errorId);
	errorElement.style.display = "none";
}

/* validate contact information and error messages */
function validateContactInfo() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let isValid = true;

    // Check if the required fields are empty
    if (isFieldEmpty(name, "name_error", "Name is required.")){ isValid = false; }

    if (isFieldEmpty(phone, "phone_error", "Phone is required.")){ isValid = false; }

    if (isFieldEmpty(message, "message_error", "Message is required.")){ isValid = false; }

    if (isFieldEmpty(email, "email_error", "Email is required.")) { isValid = false; }
    else if (!isValidEmail(email)) {
        displayError("email_error", "Invalid Email Address.");
        isValid = false;
    } else {
        hideError("email_error");
    }

    return isValid;
}

/* Hides all of the error elements. */
function hideErrors() {
    let error = document.getElementsByClassName("error");
    for (let i = 0; i < error.length; i++) {
        error[i].style.display = "none";
    }
}

/* reset form */
function resetForm(e) {
	if (confirm('Reset From?')) {
		hideErrors();
		document.getElementById("name").focus();
		return true;
	}

	e.preventDefault();

	return false;
}


function load() {
    // event listener for the form submit
    document.getElementById("contactForm").addEventListener("submit", validate);

    // event listener for the form reset
    document.getElementById("contactForm").addEventListener("reset", resetForm);

    hideErrors();
}

document.addEventListener("DOMContentLoaded", load);