// Function to Load Notes with enhanced functionality
function loadNote(noteKey) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    if (notes[noteKey]) {
        // Add fade-out effect
        const contentBody = document.querySelector('.content-body');
        contentBody.style.opacity = '0';

        // Update content after a brief delay for smooth transition
        setTimeout(() => {
            // Update title and content
            document.getElementById("note-title").innerText = notes[noteKey].title;
            document.getElementById("note-content").innerText = notes[noteKey].content;

            // Add active class to selected menu item
            const selectedItem = document.querySelector(`[onclick="loadNote('${noteKey}')"]`);
            if (selectedItem) {
                selectedItem.classList.add('active');
            }

            // Fade content back in
            contentBody.style.opacity = '1';
        }, 200);
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.note-section');

    // Handle menu clicks
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
                section.style.opacity = '0';
            });
            
            // Show selected section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                setTimeout(() => {
                    targetSection.style.opacity = '1';
                }, 50);
            }
        });
    });

    // Show first section by default
    menuItems[0].classList.add('active');
    sections[0].classList.remove('hidden');
    sections[0].style.opacity = '1';
});
