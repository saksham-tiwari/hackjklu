import MailSlurp from "mailslurp-client";

// let Details = useSelector((state)=>state.LayoutReducer).single
function generateInvoiceNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let invoiceNumber = "";
  for (let i = 0; i < 4 + Math.floor(Math.random() * 2); i++) {
    invoiceNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return invoiceNumber;
}
// generateInvoiceNumber()
const invoiceNumber = generateInvoiceNumber();

export async function sentEmail() {
  try {
    // create a client
    const apiKey =
      "342b5c0a5ee20d8fccbd53e57e6fbfdbf0144f7d682d6b46761318689c16fb45";
    const mailslurp = new MailSlurp({ apiKey });

    //  let Details = useSelector((state)=>state.LayoutReducer).single
    // create an inbox
    // const inboxId = "995465b1-cbbd-408a-8763-a142996eb927"
    const inbox = await mailslurp.inboxController.createInbox({});
    const emailAddress = localStorage.getItem("email");
    const name = localStorage.getItem("fullname");

    if (!emailAddress) {
      throw new Error("Email address not found in local storage");
    }

    // Define email options
    const options = {
      emailAddress: "NhongasMz@mailslurp.com",
      name: "nhonguistaStore",
      to: [emailAddress],
      subject: "Your Store Invoice Number",
      body: `Dear ${name},\n\nYou've successfuly left the queue!\n\nYour Store`,
      templateVars: {
        name,
        invoiceNumber,
      },
    };

    const sent = await mailslurp.sendEmail(inbox.id, options);
    console.log("Email sent:", sent);

    return sent;
  } catch (error) {
    // console.error("Error sending email:", error);
    throw error;
  }
}

export async function leftQueue() {
  try {
    // create a client
    const apiKey =
      "342b5c0a5ee20d8fccbd53e57e6fbfdbf0144f7d682d6b46761318689c16fb45";
    const mailslurp = new MailSlurp({ apiKey });

    const inbox = await mailslurp.inboxController.createInbox({});
    const emailAddress = localStorage.getItem("email");
    const name = localStorage.getItem("fullname");

    if (!emailAddress) {
      throw new Error("Email address not found in local storage");
    }

    // Define email options
    const options = {
      to: [emailAddress],
      subject: "Your Store Invoice Number",
      body: `Dear ${name},\n\nThank you for your purchase! Your invoice number is ${invoiceNumber}.\n\nYou have been added to the queue and will receive further updates shortly.\n\nBest regards,\nYour Store`,
      templateVars: {
        name,
        invoiceNumber,
      },
    };

    const sent = await mailslurp.sendEmail(inbox.id, options);
    console.log("Email sent:", sent);

    return sent;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
