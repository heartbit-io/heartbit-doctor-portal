"use client";
import { useEffect } from "react";
import { store } from "./";
import { Provider } from "react-redux";
import { auth } from "`@/firebase`";
import { api } from "`@/apis`";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        if (token) {
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
