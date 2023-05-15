"use client";
import { useEffect } from "react";
import { store } from "./";
import { Provider } from "react-redux";
import { auth } from "`@/firebase`";
import { useRouter } from "next/navigation";
import { api } from "`@/apis`";
import { getUser } from "`@/apis/userApi`";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (!user) {
        router.push("sign-in");
      }
      // auth.signOut();

      if (user?.email) {
        const token = await user?.getIdToken();
        if (token) {
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        getUser(user?.email)
          .then(async (res) => {
            console.log("??????????????", res);
            if (res.data.role === "doctor" || res.data.role === "admin") {
              router.push("take-question");
            } else {
              router.push(`sign-in`);
            }
          })
          .catch(() => {
            router.push("sign-in");
          });
      }
    });
    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
