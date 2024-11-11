import Order from "../../models/Order.js";
import paypal from "../../helpers/paypal.js";
import dotenv from "dotenv";

dotenv.config();

// create order with PayPal method
export const createOrders = (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.SERVER_URL}/shop/paypal-return`,
        cancel_url: `${process.env.SERVER_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              quantity: item.quantity,
              price: item.price.toFixed(2),
              currency: "USD",
              sku: item.productId,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order from Mern E-commerce",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message });
      } else {
        try {
          const newlyCreatedOrder = new Order({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });

          await newlyCreatedOrder.save();
          const approvalUrl = paymentInfo.links.find(
            (link) => link.rel === "approval_url"
          ).href;
          res
            .status(201)
            .json({
              success: true,
              approvalUrl,
              orderId: newlyCreatedOrder._id,
            });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Error saving order" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating payment" });
  }
};
