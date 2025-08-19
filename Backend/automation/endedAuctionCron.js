import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("endedAuctionCron.js running..");
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const message = `${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\n
          Before proceeding for payment contact your auctioneer via their email:${auctioneer.email} \n\n
          Please complete your payment using one of the following methods:\n\n
          1. **Bank Transfer**: \n
          - Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n
          - Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n
          - Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n
          2. **UPI payments**:\n
          - You can send payment via UPI payments: ${auctioneer.paymentMethods.upipayment.upinumber}\n\n
          3. **PayPal**:
          \n- Send payment to: the paypal email of you auctioneer ${auctioneer.email}\n\n
          4. **Cash on Delivery (COD)**:\n
          - If you prefer COD, you must pay 40% of the total amount upfront before delivery.\n
          - To pay the 40% upfront, use any of the above methods.\n-
           The remaining 60% can be paid upon delivery.\n
           - If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}\n\n
           Please ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\n
           Thank you for participating!\n\n
           Best regards,\n
           Value Vault Team.`;
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
          sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SENT TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error occured in ended auction cron"));
      }
    }
  });
};