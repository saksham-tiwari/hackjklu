// import { MailSlurp } from "mailslurp-client";


// export async function sentEmail(){
// // create a client
// const apiKey = "342b5c0a5ee20d8fccbd53e57e6fbfdbf0144f7d682d6b46761318689c16fb45"
// const mailslurp = new MailSlurp({ apiKey });

// // create an inbox
// const inbox = await mailslurp.inboxController.createInbox({});
// const emailAddress = localStorage.getItem("email")
// const options = {
//     to: emailAddress,
//     subject: 'Hello',
//     body: 'Dear {{name}}, your invoice number is {invoice}}.',
//     templateVars: {
//       name: '',
//       code: ''
//     }
  
//   };
//   const sent = await mailslurp.sendEmail(inbox.id, options);
//   expect(inbox.emailAddress).toContain('@mailslurp');
//   expect(sent.to).toContain(emailAddress);
// }


import MailSlurp from "mailslurp-client";

export async function sentEmail() {
  try {
    // create a client
    const apiKey = "342b5c0a5ee20d8fccbd53e57e6fbfdbf0144f7d682d6b46761318689c16fb45";
    const mailslurp = new MailSlurp({ apiKey });

    // create an inbox
    const inbox = await mailslurp.inboxController.createInbox({});
    const emailAddress = localStorage.getItem("email");

    if (!emailAddress) {
      throw new Error("Email address not found in local storage");
    }

    const options = {
      to: [emailAddress],
      subject: 'Store Invoice number',
      body: 'Dear {{name}}, your invoice number is {{invoice}}.',
      templateVars: {
        name: 'Recipient Name', // Update with actual data
        code: '12345' // Update with actual data
      }
    };

    const sent = await mailslurp.sendEmail(inbox.id, options);
    console.log('Email sent:', sent);

    // Optionally, if you need to check the result, you can use assertions in a test file.
    // expect(inbox.emailAddress).toContain('@mailslurp');
    // expect(sent.to).toContain(emailAddress);

    return sent;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
