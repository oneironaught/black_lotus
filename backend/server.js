const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Stripe with your Secret Key
const stripe = Stripe('sk_test_your_secret_key'); // Replace with your Stripe Secret Key

// Create Payment Intent Route
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // $50 deposit in cents
      currency: 'usd',
      payment_method_types: ['card'], // Base method

      // Enable Apple Pay and Google Pay
      payment_method_types: ['card', 'apple_pay', 'google_pay'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

// Start the Server
app.listen(3000, () => {
  console.log('Stripe server is running on http://localhost:3000');
});