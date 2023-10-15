/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "./useUser";
import useCookie from "./useCookie";
import config from "@/utils/config";
import axios from "axios";
import { AuthResponse, GauthType, LoginType, RegisterType } from "@/types/auth";

const API_URL = config.BACKEND_URL;

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();

  const { getCookie } = useCookie();

  const refresh = () => {
    let existingUser: string | undefined = undefined;
    const getFromCookie = async () => (existingUser = getCookie("user"));
    getFromCookie();

    if (existingUser) {
      try {
        addUser(JSON.parse(existingUser));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const gauth = async (creds: GauthType) => {
    if (creds && creds?.credential) {
      return axios
        .post(`${API_URL}auth/google-auth`, creds)
        .then((res) => {
          if (res.data?.data && res.data.data?.token) addUser(res.data.data);
          return res.data as AuthResponse;
        })
        .catch((err) => {
          if (err && err?.response && err.response?.data)
            return { ...err.response.data, success: false } as AuthResponse;
          else return err as AuthResponse;
        });
    } else
      return {
        message: "Failed to complete authentication",
        success: false,
      } as AuthResponse;
  };

  const register = async (creds: RegisterType) => {
    return await axios
      .post(`${API_URL}auth/register`, creds)
      .then((res) => {
        if (res.data?.data && res.data.data?.token) addUser(res.data.data);
        return res.data as AuthResponse;
      })
      .catch((err) => {
        if (err && err?.response && err.response?.data)
          return { ...err.response.data, success: false } as AuthResponse;
        else return err as AuthResponse;
      });
  };

  const login = async (creds: LoginType) => {
    return await axios
      .post(`${API_URL}auth/login`, creds)
      .then((res) => {
        if (res.data?.data && res.data.data?.token) addUser(res.data.data);
        return res.data as AuthResponse;
      })
      .catch((err) => {
        if (err && err?.response && err.response?.data)
          return { ...err.response.data, success: false } as AuthResponse;
        else return err as AuthResponse;
      });
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, register, logout, gauth };
};
