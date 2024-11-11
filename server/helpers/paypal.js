import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", // Specify 'sandbox' for testing or 'live' for production
  client_id: "YOUR_CLIENT_ID", // Replace with your own PayPal client ID
  client_secret: "YOUR_CLIENT_SECRET", // Replace with your own PayPal client secret
});

export default paypal;
