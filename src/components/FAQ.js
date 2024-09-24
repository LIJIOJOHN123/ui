import React, { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const FAQs = [
  {
    question: "Which type of domains and languages are supported?",
    answer:
      "We currently support all domains available in the English language.",
  },
  {
    question: "How is the domain/URL categorized?",
    answer:
      "The domain/URL categorization AI algorithms automatically determine a merchant's website category, as well as MCC codes, with over 90% accuracy. It evaluates factors such as website content, keywords, the product or service sold, mode of sale, and the presence of a free trial, etc.",
  },
  {
    question: "Can I really cancel anytime?",
    answer:
      "Yes, absolutely. To cancel your plan, go to your account and cancel on the Billing page. Upgrades, downgrades, and cancellations take effect immediately.",
  },
  {
    question: "What currencies and payment options are available?",
    answer:
      "We accept Debit Card, Credit Card, Net Banking & UPI as payment options. We accept payments in Indian Rupees and Dollars. If you would like to make payments through any other currency, please get in touch with us and we will share a payment link.",
  },
  {
    question: "What is our refund policy?",
    answer:
      "You can request a refund for the current month if you do so within 2 hours of the transaction, but this only applies to the first payment. We reserve the right to decline the request if you have used our software during this time.",
  },
  {
    question: "Is the offline database available to download?",
    answer:
      "The Blacklist database we maintain is proprietary, so it is not currently available for download. If you would like to discuss our databases further, please contact us at sales@chargebackzero.com.",
  },
  {
    question:
      "How are categories matched? By domain only or full path of URL too?",
    answer:
      "The categories are matched using the full path URL or the email's domain (if the input is an email).",
  },
  {
    question: "What is the format of offline database?",
    answer: "The format of our offline database is CSV.",
  },
  {
    question: "Can I categorize mobile apps?",
    answer:
      "We currently support websites. Categorizing mobile apps will be launched as part of the upcoming release.",
  },
  {
    question: "Do you offer personalized plans?",
    answer:
      "Yes, but it must be for a larger bundle than what is currently available.",
  },
  {
    question: "When does the billing cycle start?",
    answer:
      "Your billing cycle begins on the day you purchase one of our plans and ends on the same day the following month or year (if you're paying annually). Note that your API call allowance is renewed on the first day of each month.",
  },
  {
    question: "How can I upgrade or downgrade my plan?",
    answer: "You can manage all of this yourself from your dashboard.",
  },
  {
    question: "Is my payment info deleted after I downgrade?",
    answer:
      "Yes! It’s deleted automatically. The information is handled by Razorpay, we don’t store your credit or debit card data.",
  },
  {
    question: "Can I only obtain the categorization part of the API?",
    answer: "Yes, please contact us at sales@chargebackzero.com.",
  },
  {
    question: "How many API calls can I make per minute?",
    answer:
      "By default, it is 180 /minute because we want to avoid attacks or abusers, but we can expand it for you in case you need more.",
  },
  {
    question: "Where can I see invoices/receipts?",
    answer:
      "Invoices and receipts can be viewed and downloaded from our portal at any time by visiting the Settings menu.",
  },
  {
    question:
      "What can I do if I get ERROR 'We couldn’t retrieve domain’s category data from the URL; please try again?'",
    answer:
      "Please share the request ID and URL with us. We will respond promptly to assist you.",
  },
];
function Body() {
  return (
    <div className="container">
      <div className="m-5 w-100">
        <NavBar />

        <h2
          style={{ backgroundColor: "#420394" }}
          className="py-4 text-center text-white mt-4 rounded-1"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-4">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 p-3 rounded"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5 style={{ fontWeight: "bold" }}>{faq.question}</h5>
              <p className="text-muted mt-2" style={{ lineHeight: "1.6" }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Body />
      <Footer />
    </div>
  );
};

export default FAQ;
