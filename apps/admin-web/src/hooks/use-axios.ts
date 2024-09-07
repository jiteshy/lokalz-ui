"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "@/lib/axios-client";

export const useAxios = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return axios;
};
