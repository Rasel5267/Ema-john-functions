const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")('sk_test_51Hr9YiKAFI4LzsmtSpk60RG648dt38i0pkcm1y8UThNaLaURahkTYBSpQr3IODzr8cyduBbo2T1NSARPZKimsUzW00trTqQX9r');

const app = express();
app.use(cors({origin: true}));
app.use(express.json());


app.post("/payments-intent", async (req, res) => {
    const total = req.query.total;
    console.log('payment receive total: ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })

})


app.get('/', (req, res) => res.status(200).send('first firebase database'))

exports.api = functions.https.onRequest(app);

