"use client";
import { useEffect, useState } from "react";

export default function useCurrency() {
  const [price, setPrice] = useState("₹2,999");
  const [shipping, setShipping] = useState("Free Delivery in India");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code === "IN") {
          setPrice("₹2,499");
          setShipping("Free Delivery in India");
        } else if (data.continent_code === "EU") {
          setPrice("€29.99");
          setShipping(`Ships to ${data.country_name}`);
        } else {
          setPrice("$34.99");
          setShipping(`Ships to ${data.country_name}`);
        }
      })
      .catch(() => {
        // Adblocker fallback
      });
  }, []);

  return { price, shipping };
}
