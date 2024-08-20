"use client";

import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState();

  function success(pos: any) {
    console.log(pos);
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            });
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};
