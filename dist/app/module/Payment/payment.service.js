"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const stripe_1 = require("stripe");
const config_1 = __importDefault(require("../../../config"));
const stripeInstance = new stripe_1.Stripe(config_1.default.STRIPE_SECRET_KEY);
const createPaymentIntent = (price) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = Math.round(parseFloat(price) * 100);
    const paymentIntent = yield stripeInstance.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    console.log('payment intent', paymentIntent);
    return paymentIntent;
});
exports.PaymentServices = {
    createPaymentIntent
};
