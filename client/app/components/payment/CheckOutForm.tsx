"use client";
import React, { FC, useState, useEffect } from "react";
import { useCreateOrderMutation } from "../../../redux/features/orders/orderApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { styles } from "../../styles/style";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ setOpen, data, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);

      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className={`text-[red] font-Poppins pt-2`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
