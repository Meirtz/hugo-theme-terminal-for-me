document.addEventListener("DOMContentLoaded", function() {
    let lightboxActive = false;

    function preventScroll(event) {
        // 如果只有一个触摸点（即一个手指），则阻止滚动
        if (event.touches.length === 1) {
            event.preventDefault();
        }
    }
    

    document.body.addEventListener("click", function(event) {
        // Check if we clicked on an image to open the lightbox
        if (event.target.classList.contains("lightbox-enabled") && !lightboxActive) {
            // Create lightbox container
            const lightbox = document.createElement("div");
            lightbox.classList.add("lightbox-container");

            // Create image for lightbox
            const img = document.createElement("img");
            img.src = event.target.src;
            img.classList.add("lightbox-image");

            // Append image to lightbox container
            lightbox.appendChild(img);

            // Append lightbox to body and activate blur
            document.body.appendChild(lightbox);
            document.body.classList.add("lightbox-active");

            // Prevent scrolling on iOS devices
            document.body.addEventListener("touchmove", preventScroll, { passive: false });
            
            lightboxActive = true;

        } else if (lightboxActive) {  // Check if we clicked anywhere to close the lightbox
            const lightbox = document.querySelector(".lightbox-container");
            if (lightbox) {
                document.body.removeChild(lightbox);
            }
            document.body.classList.remove("lightbox-active");

            // Allow scrolling on iOS devices
            document.body.removeEventListener("touchmove", preventScroll);
            
            lightboxActive = false;
        }
    });
});
