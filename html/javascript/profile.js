
function openSection(event, sectionName) {
    // Get all tab content elements
    var tabContent = document.getElementsByClassName("profile__section__tab__tabcontent");

    // Hide all tab content elements
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all tab links elements
    var tabLinks = document.getElementsByClassName("tablinks");

    // Remove the "active" class from all tab links
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the selected tab content
    document.getElementById(sectionName).style.display = "block";

    // Add the "active" class to the clicked tab link
    event.currentTarget.classList.add("active");
}

// Set the default tab to be opened
document.getElementById("defaultOpen").click();
