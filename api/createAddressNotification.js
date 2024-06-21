// require('dotenv').config()

// const { Alchemy, Network, WebhookType } = require('alchemy-sdk');

// authToken is required to use Notify APIs. Found on the top right corner of
// https://dashboard.alchemy.com/notify.
 async function createAddressActivityNotification() {
  const settings = {
    authToken: process.env.ALCHEMY_NOTIFY_TOKEN,
    network: Network.ETH_SEPOLIA, // Replace with your network.
    isActive:true
  };

  const alchemy = new Alchemy(settings);
  const addressActivityWebhook = await alchemy.notify.createWebhook(
		// TO DO: You will replace this URL in Step #3 of this guide!
    'https://webhook.site/020226b8-e2bd-4a8c-86a3-f71f763914f0',
    WebhookType.ADDRESS_ACTIVITY,
    {
      // use any address you want to monitor activity on!
      addresses: ['0x117230682974d73f2DB5C21F0268De2fACB0119f'],
      network: Network.ETH_SEPOLIA,
    }
  );
	console.log(
    'Alchemy Notify address activity notification created, go to https://dashboard.alchemy.com/notify to see details of your custom hook.'
  ,addressActivityWebhook);
}
module.exports = {createAddressActivityNotification}
// createAddressActivityNotification();

// notification received from Alchemy from the webhook. Let the clients know.
// function notificationReceived(req) {
//   console.log("notification received!");
//   io.emit('notification', JSON.stringify(req.body[0].from));
// }

// // add an address to a notification in Alchemy
// async function addAddress(new_address) {
//   console.log("adding address " + new_address);
//   const body = { webhook_id: "wh_cj9z7ingudojkqog", addresses_to_add: "0x117230682974d73f2DB5C21F0268De2fACB0119f", addresses_to_remove: [] };
//   try {
//     fetch('https://dashboard.alchemyapi.io/api/update-webhook-addresses', {
//       method: 'PATCH',
//       body: JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json' ,
        
//       },
//       headers: { 'X-Alchemy-Token': "9dPTpEoXlDUxJXGb6uPVL9oCugJFt7Bv"}
//     })
//       .then(res => res.json())
//       .then(json => console.log("Successfully added address:", json))
//       .catch(err => console.log("Error! Unable to add address:", err));
//   }
//   catch (err) {
//     console.error(err);
//   }
// }

// ////////////////////////////////////////