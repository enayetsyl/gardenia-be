import { Stripe } from "stripe";
import config from "../../../config";
const stripeInstance = new Stripe(config.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async(price: string) => {
  const amount = Math.round(parseFloat(price) * 100)
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  console.log('payment intent', paymentIntent)
  return paymentIntent;
}


export const PaymentServices = {
  createPaymentIntent
}
