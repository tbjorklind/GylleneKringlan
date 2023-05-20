const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll("section");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    // remove active class from all tabs
    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    // add active class to clicked tab
    tab.classList.add("active-tab");

    // hide all sections
    sections.forEach((section) => {
      section.style.display = "none";
    });

    // show corresponding section
    const targetSection = document.querySelector(
      `#${tab.textContent.toLowerCase()}`
    );
    targetSection.style.display = "block";
  });
});
