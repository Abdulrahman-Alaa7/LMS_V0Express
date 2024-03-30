"use client";
import React, { FC, useState, useEffect } from "react";
import { useGetCourseDetailsQuery } from "../../../../redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentMutation,
  useGetStripePublishablekeyQuery,
} from "../../../../redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;

      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  const dataCourse = data?.course;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={``}>
          {stripePromise && (
            <CourseDetails
              data={dataCourse}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setOpen={setOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
