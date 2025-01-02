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

// Front end code for the payment form

const stripe = Stripe('pk_test_your_publishable_key'); // Replace with your Publishable Key

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const paymentForm = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

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

document.addEventListener("DOMContentLoaded", () => {
  // Check for Apple Pay Support
  if (window.ApplePaySession) {
    const applePayButton = document.getElementById('apple-pay-button');
    applePayButton.innerHTML = '<button class="btn btn-apple-pay">Pay with Apple Pay</button>';
  }

  // Check for Google Pay Support
  if (window.PaymentRequest) {
    const googlePayButton = document.getElementById('google-pay-button');
    googlePayButton.innerHTML = '<button class="btn btn-google-pay">Pay with Google Pay</button>';
  }
});

