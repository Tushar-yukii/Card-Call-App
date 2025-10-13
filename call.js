// ALL VARIABLES AND DOC. SELECTIONS
const addNote = document.querySelector("#add-note");
const formContainer = document.querySelector(".form-container");
const closeForm = document.querySelector(".closeForm");
const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
// Select the form
const form = document.querySelector("form");

// Select individual input fields
const imageUrlInput = form.querySelector('input[type="text"]:nth-of-type(1)');
const fullNameInput = form.querySelector('input[type="text"]:nth-of-type(2)');
const homeTownInput = form.querySelector('input[type="text"]:nth-of-type(3)');
const purposeInput = form.querySelector('input[type="text"]:nth-of-type(4)');

// Select all category radio buttons
const categoryRadios = form.querySelectorAll('input[name="category"]');

// Select submit button
const submitBtn = form.querySelector(".submit-btn");

// CODE START

// localstorge
function saveLocalStorge(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldtasks = [];
    oldtasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldtasks));
  } else {
    let oldtasks = localStorage.getItem("tasks");
    oldtasks = JSON.parse(oldtasks);
    oldtasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldtasks));
  }
}

addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});

closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  if (imageUrl === "") {
    alert("please enter an image url.");
    return;
  }
  if (fullName === "") {
    alert("please enter your fulname.");
    return;
  }
  if (homeTown === "") {
    alert("please enter your home town.");
    return;
  }

  if (purpose === "") {
    alert("please enter your purpose.");
    return;
  }

  if (!selected) {
    alert("please select a catergory");
    return;
  }

  saveLocalStorge({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selected,
  });
  form.reset();
  formContainer.style.display = "none";
  showCards();
});

function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks"));

  allTasks.forEach(function (task) {
    // Create card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Avatar image
    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    // Name
    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    // Info: Home town
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    // Info: Bookings
    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = task.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    // Message button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    // Append buttons
    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    // Append buttonsDiv to card
    card.appendChild(buttonsDiv);

    // Finally, add the card to the DOM (for example, inside a container)
    document.querySelector(".stack").appendChild(card); // or any container of your choice
  });
}
showCards();
