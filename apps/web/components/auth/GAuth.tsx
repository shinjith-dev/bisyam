import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useToast } from "../../hooks/useToast";
import { GauthType } from "@/types/auth";

function GAuth() {
  const { createToast } = useToast();

  const handleAuthentication = async (creds: GauthType) => {
    console.log(creds);
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
