import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.service";

const createPaymentIntent = catchAsync(async(req, res) => {
  const {price} = req.body;
  const paymentIntent = await PaymentServices.createPaymentIntent(price);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully!',
    data: paymentIntent,
  });
})

export const PaymentController = {
  createPaymentIntent
}
