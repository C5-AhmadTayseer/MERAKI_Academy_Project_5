import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

// const dispatch = useDispatch();

// This values are the props in the UI
// const amount = "2";
const currency = "USD";
const style = {
  layout: "horizontal",
  tagline: "false",
};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  const { subTotal } = useSelector((state) => {
    return {
      subTotal: state.cart.subTotal,
    };
  });

  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[subTotal, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: subTotal,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            })
            .then((orderId) => {
              // Your code here after create the order
              console.log(data);

              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

export default function Payment() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        // options={{
        //     "client-id": "AW3d7emklURf4rIFvBmQ14R_oT523r5PjxbsraFbK5vhDVvWE6imlOkzkIY9WrfTNF9EBVrwGuWTxsQM",
        //     components: "buttons",
        //     currency: "USD"
        // }}
        options={{
          "client-id":
            "AUGXriRIYNCsYdoXMJrXu5EwNO5FWg7E-NSHbM5ZvplLNrjq7FdkwCsxT5gw-Wwc9ZfMPHOs0u-cOVah",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
