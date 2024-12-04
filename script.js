document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation
    document.querySelectorAll("#navbar a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  
    // Booking form submission
    document.getElementById("booking-form").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your booking! We will get back to you soon.");
    });
  });


document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
  
    const lightboxImage = document.createElement("img");
    lightbox.appendChild(lightboxImage);
  
    const closeButton = document.createElement("div");
    closeButton.classList.add("lightbox-close");
    closeButton.textContent = "×";
    lightbox.appendChild(closeButton);
  
    document.body.appendChild(lightbox);
  
    // Open lightbox
    galleryItems.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightbox.classList.add("active");
      });
    });
  
    // Close lightbox
    closeButton.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  
    // Close lightbox by clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImage && e.target !== closeButton) {
        lightbox.classList.remove("active");
      }
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
  
    // Add 'scrolled' class when the user scrolls
    window.addEventListener("scroll", () => {
      if (!body.classList.contains("scrolled")) {
        body.classList.add("scrolled");
      }
    });
  });