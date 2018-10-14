/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Set reference to the DOM elements
const page = document.querySelector(".page");
const studentsList = document.querySelector(".student-list");
const pageHeader = document.querySelector(".page-header");
const allStudents = studentsList.querySelectorAll("li");
const studentsPerPage = 10;
let pageNumber = 1; // Default value of pageNumber

function showPage(list, pageNumber) {
  // Get an array from the Node collection to be able to apply the "indexOf" method
  let studentsArray = Array.from(list);

  studentsArray.forEach(elt => {
    if (
      studentsArray.indexOf(elt) >=
        studentsPerPage * pageNumber - studentsPerPage &&
      studentsArray.indexOf(elt) < pageNumber * studentsPerPage
    ) {
      elt.style.display = "block";
    } else {
      elt.style.display = "none";
    }
  });
}

// Create a function to append the pagination links

function appendPaginationLinks(list) {
  // Check if there is a node after the ul students list and remove it
  if (studentsList.nextElementSibling) {
    studentsList.nextElementSibling.remove();
  }
  // Compute the necessary numbers of links
  let studentsListLength = list.length;
  let numberOfLinks = Math.ceil(studentsListLength / studentsPerPage);
  // Create the container of the pagination links
  const paginationContainer = document.createElement("div");
  //Add the class named pagination to that container
  paginationContainer.className = "pagination";
  // Create the unordoned list for links
  const ul = document.createElement("ul");
  // Append the unordoned list to the container
  paginationContainer.appendChild(ul);

  // Dynamically add the pagination links in the unordoned list

  for (let i = 0; i < numberOfLinks; i++) {
    ul.innerHTML += `
          <li>
            <a  href="#">${i + 1}</a>
          </li>
`;
  }
  // Append the pagination container  to the page
  page.appendChild(paginationContainer);

  const paginationLinks = ul.querySelectorAll("a");
  // Add the active class on the first link by default
  paginationLinks[0].className = "active";
  // Add a click listener to each link by event delegation
  ul.addEventListener("click", event => {
    paginationLinks.forEach(link => {
      link.classList.remove("active");
    });
    // Get pageNumber value  from the click on the link by getting the textContent of the clicked link
    pageNumber = event.target.textContent;
    event.target.classList.add("active");
    event.preventDefault();
    showPage(allStudents, pageNumber);
  });
}
// Call the function that appends the pagination links
appendPaginationLinks(allStudents);
// Display the first ten elemenst on the list
showPage(allStudents, pageNumber);
