function expandCircle(element) {
    const isSmallViewport = window.innerWidth <= 480;
    if (!isSmallViewport) {
        // Remove expanded class from any other circles
        document.querySelectorAll('.circle-container.expanded').forEach(function(el) {
            el.classList.remove('expanded');
        });

        // Add expanded class to the clicked circle
        element.classList.add('expanded');

        // Close the expanded circle when clicking outside
        window.addEventListener('click', function(e) {
            if (!element.contains(e.target)) {
                element.classList.remove('expanded');
            }
        });
    }
    // For small viewports, the CSS takes care of the layout, no JS needed.
}
