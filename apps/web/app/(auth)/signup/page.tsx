"use client";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import SignUpForm from "@/components/auth/SignupForm";
import social from "@/assets/images/social.jpg";
import GAuth from "@/components/auth/GAuth";
import { RegisterType } from "@/types/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GAUTH_CLIENT_ID } from "@/utils/conig";

const initialValues = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .matches(
      /^(?=.{4,20}$)(?![.])[a-z0-9._]+$/,
      "username can only contain the letters (a-z), (0-9), (.), and (_), cannot begin with a (.), and must be between 4 and 20 characters long!",
    )
    .required("Username is required!"),
  name: yup.string().trim().required("Name is required!"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address!")
    .required("Email is required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      "passwords must be between 8 and 20 characters long, with at least one letter, one number, and one special character!",
    )
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});

function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formValue: RegisterType) => {
    const { username, name, email, password } = formValue;
    setLoading(true);

    console.log(formValue);
  };

  const formik: FormikProps<RegisterType> = useFormik<RegisterType>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: "primary.100", position: "relative", height: "100vh" }}
      disableGutters
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "35vw",
            m: 5,
            zIndex: 20,
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              letterSpacing={1.5}
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 700,
                letterSpacing: 1.5,
                textDecoration: "none",
              }}
            >
              bisyam
              <Box sx={{ color: "secondary.light" }}>.</Box>
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            position: "relative",
            zIndex: 20,
            flexDirection: "column",
            gap: 1,
            color: "#fafafa",
            width: "min(90%,30rem)",
            m: 5,
          }}
        >
          <Typography variant="h2" fontWeight={700}>
            Create An Account
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "#0047ab", textDecoration: "none" }}
            >
              Login
            </Link>
          </Typography>

          <SignUpForm formik={formik} loading={loading} />

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
              mb: 1,
              width: "90%",
              alignItems: "center",
            }}
          >
            <Divider sx={{ flexGrow: 1, bgcolor: "primary.main" }} />
            <Typography variant="body2" color="#fafafa">
              or Log In using
            </Typography>
            <Divider sx={{ flexGrow: 1, bgcolor: "primary.main" }} />
          </Box>

          <GoogleOAuthProvider clientId={GAUTH_CLIENT_ID}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "90%" }}
            >
              <GAuth />
            </Box>
          </GoogleOAuthProvider>
        </Box>
      </Container>

      <Box
        sx={{
          position: "absolute",
          width: "100vw",
          top: 0,
          left: 0,
          height: "100vh  ",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
          <Image
            alt="bisyam-login"
            src={social}
            fill
            style={{ objectFit: "cover", objectPosition: "right top" }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            background:
              "linear-gradient(75deg, #0D0B14 45%, rgba(0,212,255,0) 100%)",
          }}
        />
      </Box>
    </Container>
  );
}

export default SignUp;
