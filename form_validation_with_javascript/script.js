const validationOptions = [
  {
    attribute: "minlength",
    isValid: (input) =>
      input.value && input.value.length >= parseInt(input.minLength, 10),
    errorMessage: (input, label) =>
      `${label.textContent} needs to be at least ${input.minLength} characters`,
  },

  {
    attribute: "type",
    isValid: (input) => {
      if (input.validity.typeMismatch) {
        return false;
      }
      return true;
    },
    errorMessage: (input, label) => {
      if (input.type === "email") {
        return `${label.textContent} is invalid`;
      }
      if (input.type === "number") {
        return `${label.textContent} needs to be numbers only`;
      }
      return "";
    },
  },
  {
    attribute: "data-maxlength",
    isValid: (input) =>
      input.value &&
      input.value.length <= parseInt(input.getAttribute("data-maxlength"), 10),
    errorMessage: (input, label) =>
      `${label.textContent} needs to be less than ${input.getAttribute(
        "data-maxlength"
      )} characters`,
  },

  {
    attribute: "data-confirm",
    isValid: (input) => {
      const selector = input.getAttribute("data-confirm");
      const passwordInput = document.querySelector(`#${selector}`);

      return (
        input.value.trim() && input.value.trim() === passwordInput.value.trim()
      );
    },
    errorMessage: (input, label) => {
      const selector = input.getAttribute("data-confirm");
      const passwordInput = document.querySelector(`#${selector}`);
      const matchedLabel =
        passwordInput.parentElement.parentElement.querySelector("label");
      return `${label.textContent} does not match ${matchedLabel.textContent}`;
    },
  },
  {
    attribute: "required",
    isValid: (input) => input.value.trim() !== "",
    errorMessage: (input, label) => `${label.textContent} is required`,
  },
];

function validateForm(formSelector, options) {
  const formElement = document.querySelector(formSelector);

  const validateSingleFromGroup = (formGroup) => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input", "textarea");
    // const inputType = input.type;
    const errorContainer = formGroup.querySelector(".error");
    const errorIcon = formGroup.querySelector(".error-icon");
    const successIcon = formGroup.querySelector(".success-icon");

    let formGroupError = false;

    for (const option of options) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);

        input.classList.remove("border-green-700");
        input.classList.add("border-red-700");

        successIcon.classList.add("hidden");
        errorIcon.classList.remove("hidden");

        formGroupError = true;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      input.classList.remove("border-red-700");
      input.classList.add("border-green-700");

      errorIcon.classList.add("hidden");
      successIcon.classList.remove("hidden");
    }
  };

  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".formGroup")
    );

    formGroups.forEach((formGroup) => {
      validateSingleFromGroup(formGroup);
    });
  };

  formElement.setAttribute("novalidate", "true");
  formElement.reset();

  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener(
      "input",
      () => {
        // eslint-disable-next-line no-param-reassign
        element.valueEntered = true;
      },
      { once: true }
    );
  });

  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener("blur", () => {
      if (element.valueEntered) {
        validateSingleFromGroup(element.parentElement.parentElement);
      }
    });
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    validateAllFormGroups(formElement);
  });
}

validateForm("#registrationForm", validationOptions);
