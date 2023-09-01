"use client";
import { useEffect } from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { auth } from "`@/firebase`";
import { api } from "`@/apis`";
// import { loadIntercom } from "next-intercom";
import { isSignInWithEmailLink } from "firebase/auth";
import { getUserData } from "`@/store/slices/userSlice`";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const interval = setInterval(
      () => auth.currentUser?.getIdToken(true),
      1000 * 60 * 59
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        if (token) {
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          if (user.email) {
            store.dispatch(getUserData(user.email));
            // loadIntercom({
            //   appId: "v55v85ev",
            //   name: user.email,
            // });
          }
        }
      } else if (
        !isSignInWithEmailLink(auth, window.location.href) &&
        window.location.pathname !== "/sign-in"
      ) {
        window.location.replace("/sign-in");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
