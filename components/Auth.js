import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import WelcomePage from "./welcome/WelcomePage";

const Auth = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const hasUser = !!session?.user;

  useEffect(() => {
    if (status !== "loading" && !hasUser) {
      router.push("/login");
    } else if (hasUser && session.user.teams.length === 0) {
      router.push("/welcome");
    } else {
      router.push("/home");
    }
  }, [status, hasUser]);

  if (hasUser) {
    if (session.user.teams.length === 0) {
      return <WelcomePage />;
    } else {
      return children;
    }
  }

  return <></>;
};

export default Auth;
