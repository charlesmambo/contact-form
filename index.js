const form = document.querySelector("form");
const emailInput = document.querySelector(".email");
const emailErrorMsg = document.querySelector(".email-error-msg");
const requiredMsgs = document.querySelectorAll(".required-msg");
const firstnameInput = document.querySelector(".firstname");
const lastnameInput = document.querySelector(".lastname");
const consentCheckbox = document.querySelector("input[name='consent']");
const consentText = document.querySelector(".consent-text");
const generalInquiryCheckbox = document.querySelector("input[name='general-inquiry']");
const supportRequestCheckbox = document.querySelector("input[name='support-request']");
const queryTypeErrorMsg = document.querySelector(".qt-container small"); // Message for query type
const messageTextarea = document.querySelector("textarea[name='message']"); // Textarea for message
const textareaErrorMsg = document.querySelector(".textarea small"); // Error message for textarea

// Function to validate email
function validateEmail(email) {
    const emailPatterns = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPatterns.test(email);
}

// Remove invalid styles and hide required messages on input
function handleInput(inputField, requiredMsgIndex) {
    inputField.addEventListener('input', () => {
        if (inputField.value.trim().length > 0) {
            inputField.classList.remove('invalid');
            requiredMsgs[requiredMsgIndex].style.display = 'none';
        } else {
            // Show required message if input is empty
            requiredMsgs[requiredMsgIndex].style.display = 'block';
        }
    });
}

// Add event listeners for firstname, lastname, and email
handleInput(firstnameInput, 0); // First message for firstname
handleInput(lastnameInput, 1);  // Second message for lastname
handleInput(emailInput, 2);      // Third message for email

// Handle textarea input
messageTextarea.addEventListener('input', () => {
    if (messageTextarea.value.trim().length > 2) {
        messageTextarea.classList.remove('invalid'); // Remove invalid class
        textareaErrorMsg.style.display = 'none'; // Hide error message
    } else if (messageTextarea.value.trim().length === 0) {
        messageTextarea.classList.add('invalid'); // Add invalid class
        textareaErrorMsg.style.display = 'block'; // Show error message
    }
});

// Hide query type message if either checkbox is checked
generalInquiryCheckbox.addEventListener('change', () => {
    if (generalInquiryCheckbox.checked || supportRequestCheckbox.checked) {
        queryTypeErrorMsg.style.display = 'none'; // Hide query type error message
    }
});

supportRequestCheckbox.addEventListener('change', () => {
    if (generalInquiryCheckbox.checked || supportRequestCheckbox.checked) {
        queryTypeErrorMsg.style.display = 'none'; // Hide query type error message
    }
});

// Hide consent error message if consent checkbox is checked
consentCheckbox.addEventListener('change', () => {
    if (consentCheckbox.checked) {
        consentText.style.display = 'none'; // Hide consent error message
    } else {
        consentText.style.display = 'block'; // Show consent error message if not checked
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const firstname = firstnameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const message = messageTextarea.value.trim();
    const isGeneralInquiryChecked = generalInquiryCheckbox.checked;
    const isSupportRequestChecked = supportRequestCheckbox.checked;

    // Hide all required messages and email error message
    requiredMsgs.forEach(msg => msg.style.display = 'none');
    emailErrorMsg.style.display = 'none';
    consentText.style.display = 'none'; // Hide consent message initially
    queryTypeErrorMsg.style.display = 'none'; // Hide query type message initially
    textareaErrorMsg.style.display = 'none'; // Hide textarea error message initially
    emailInput.classList.remove('invalid');
    emailInput.classList.remove('success'); // Reset success class for fresh submission
    messageTextarea.classList.remove('invalid'); // Reset invalid class for textarea

    let hasError = false;

    // Check if firstname is empty
    if (!firstname) {
        requiredMsgs[0].style.display = 'block'; // Show required message for firstname
        firstnameInput.classList.add('invalid');
        hasError = true;
    }

    // Check if lastname is empty
    if (!lastname) {
        requiredMsgs[1].style.display = 'block'; // Show required message for lastname
        lastnameInput.classList.add('invalid');
        hasError = true;
    }

    // Check if email is empty or invalid
    if (!email) {
        requiredMsgs[2].style.display = 'block'; // Show required message if email is empty
        emailInput.classList.add('invalid');
        hasError = true;
    } else if (!validateEmail(email)) {
        // Show invalid email message if email format is incorrect
        emailErrorMsg.style.display = 'block';
        emailInput.classList.add('invalid');
        hasError = true;
    }

    // Check if message is empty
    if (!message) {
        messageTextarea.classList.add('invalid'); // Add invalid class
        textareaErrorMsg.style.display = 'block'; // Show error message
        hasError = true;
    }

    // Check if consent checkbox is checked
    if (!consentCheckbox.checked) {
        consentText.style.display = 'block'; // Show consent message if checkbox is not checked
        hasError = true;
    }

    // Check if at least one query type checkbox is checked
    if (!isGeneralInquiryChecked && !isSupportRequestChecked) {
        queryTypeErrorMsg.style.display = 'block'; // Show message if no checkbox is checked
        hasError = true;
    }

    // If there are no errors, proceed with form submission
    if (!hasError) {
        // Show success message
        const successBox = document.querySelector(".success-box");
        successBox.style.display = 'block'; // Show success message
        
        // Reset the form fields
        form.reset();
        consentCheckbox.checked = false; // Uncheck the consent checkbox

        // Hide error messages
        requiredMsgs.forEach(msg => msg.style.display = 'none');
        emailErrorMsg.style.display = 'none';
        consentText.style.display = 'none';
        queryTypeErrorMsg.style.display = 'none';
        textareaErrorMsg.style.display = 'none';
        
        // Hide the success message after 3 seconds
        setTimeout(() => {
            successBox.style.display = 'none';
        }, 3000);
    }
});
