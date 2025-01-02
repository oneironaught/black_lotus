document.addEventListener("DOMContentLoaded", () => {
  /** ==============================
   * 1. Smooth Scrolling for Navigation
   ============================== **/
  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  /** ==============================
   * 2. Booking Form Submission
   ============================== **/
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your booking! We will get back to you soon.");
    });
  }

  /** ==============================
   * 3. Navbar Toggle (Mobile Menu)
   ============================== **/
  const menuToggle = document.getElementById('menu-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  if (menuToggle && navbarMenu) {
    menuToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }

 /** ==============================
 * 4. Lightbox for Gallery
 ============================== **/

const galleryItems = document.querySelectorAll(".gallery-item img");
if (galleryItems.length > 0) {
  // Create the lightbox only once
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const lightboxImage = document.createElement("img");
  lightbox.appendChild(lightboxImage);

  const closeButton = document.createElement("div");
  closeButton.classList.add("lightbox-close");
  closeButton.textContent = "×";
  lightbox.appendChild(closeButton);

  document.body.appendChild(lightbox);

  // Open Lightbox
  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src; // Set the lightbox image source
      lightbox.classList.add("active"); // Show the lightbox
      document.body.style.overflow = 'hidden'; // Disable background scroll
    });
  });

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active"); // Hide the lightbox
    lightboxImage.src = ""; // Clear the image source
    document.body.style.overflow = ''; // Restore background scroll
  };

  closeButton.addEventListener("click", closeLightbox);

  // Close Lightbox by clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === closeButton) {
      closeLightbox();
    }
  });

  // Prevent image click from closing the lightbox
  lightboxImage.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

  /** ==============================
   * 5. Add 'Scrolled' Class on Scroll
   ============================== **/
  const body = document.body;
  window.addEventListener("scroll", () => {
    if (!body.classList.contains("scrolled")) {
      body.classList.add("scrolled");
    }
  });

  /** ==============================
   * 6. Stripe Payment Integration
   ============================== **/
  const stripe = Stripe('pk_test_your_publishable_key'); // Replace with your Publishable Key
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  const paymentForm = document.getElementById('payment-form');
  const paymentMessage = document.getElementById('payment-message');

  if (paymentForm) {
    cardElement.mount('#card-element');

    paymentForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const { clientSecret } = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }).then((res) => res.json());

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        paymentMessage.textContent = `Error: ${error.message}`;
        paymentMessage.style.color = 'red';
        paymentMessage.classList.remove('hidden');
      } else if (paymentIntent.status === 'succeeded') {
        paymentMessage.textContent = 'Payment successful! Your deposit has been secured.';
        paymentMessage.style.color = 'green';
        paymentMessage.classList.remove('hidden');
      }
    });
  }

  /** ==============================
   * 7. Apple Pay & Google Pay Integration
   ============================== **/
  if (window.ApplePaySession) {
    const applePayButton = document.getElementById('apple-pay-button');
    if (applePayButton) {
      applePayButton.innerHTML = '<button class="btn btn-apple-pay">Pay with Apple Pay</button>';
    }
  }

  if (window.PaymentRequest) {
    const googlePayButton = document.getElementById('google-pay-button');
    if (googlePayButton) {
      googlePayButton.innerHTML = '<button class="btn btn-google-pay">Pay with Google Pay</button>';
    }
  }
});