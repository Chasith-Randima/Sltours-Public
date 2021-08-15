import axios from axios;
import { showAlert } from "./alert"
import Stripe from "stripe";
//const stripe = Stripe("");

export const boolTour = async tourId => {

    try{
    const session = await axios(
        `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    await Stripe.redirectToCheckout({
        sessionId:session.data.session.id
    });
}catch(err){

    console.log(err);
    showAlert("error",err);

};
};