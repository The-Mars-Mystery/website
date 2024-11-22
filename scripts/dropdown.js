document.addEventListener("DOMContentLoaded", () => {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    // Toggle dropdown menu visibility
    dropdownButton.addEventListener("click", () => {
        const isHidden = dropdownMenu.classList.contains("hidden");
        if (isHidden) {
            dropdownMenu.classList.remove("hidden", "opacity-0");
            dropdownMenu.classList.add("opacity-100");
        } else {
            dropdownMenu.classList.add("hidden", "opacity-0");
            dropdownMenu.classList.remove("opacity-100");
        }
    });

    // Close the dropdown if clicked outside
    document.addEventListener("click", (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add("hidden", "opacity-0");
            dropdownMenu.classList.remove("opacity-100");
        }
    });
});
