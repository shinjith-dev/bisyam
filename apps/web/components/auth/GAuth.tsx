import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useToast } from "../../hooks/useToast";
import { GauthType } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

function GAuth() {
  const { createToast } = useToast();
  const { gauth } = useAuth();
  const router = useRouter();

  const handleAuthentication = async (creds: GauthType) => {
    const response = await gauth(creds);

    if (response.success) {
      createToast({
        type: "success",
        message: `Logged in as ${response.data?.user.email}`,
      });

      setTimeout(() => {
        router.push("/");
      }, 500);
    } else
      createToast({
        type: "error",
        message: "Failed to login using Google",
      });

    console.log(response);
  };

  useGoogleOneTapLogin({
    onSuccess: handleAuthentication,
    onError: () => {
      createToast({
        type: "error",
        message: "Failed to login",
      });
    },
  });

  return (
    <GoogleLogin
      onSuccess={handleAuthentication}
      auto_select
      type="icon"
      theme="filled_black"
      size="medium"
      shape="circle"
      onError={() => {
        createToast({
          type: "error",
          message: "Failed to login",
        });
      }}
    />
  );
}

export default GAuth;
