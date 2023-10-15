import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputBase,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { LoginType } from "@/types/auth";

interface Props {
  formik: FormikProps<LoginType>;
  loading: boolean;
}

function LoginForm({ formik, loading }: Props) {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 1.5,
        mt: 2,
        width: "min(90%,470px)",
        color: "#fafafa",
      }}
      onSubmit={formik.handleSubmit}
    >
      <FormControl fullWidth>
        <Typography variant="body2" component="label" htmlFor="username">
          Username
        </Typography>
        <InputBase
          id="username"
          name="username"
          size="small"
          sx={{ mt: 0.5, bgcolor: "rgba(255,255,255,0.1)", color: "#fafafa" }}
          fullWidth
          autoFocus
          disabled={loading}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
        />
        <FormHelperText sx={{ color: "#F19999" }}>
          {formik.touched.username && formik.errors.username}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <Typography variant="body2" component="label" htmlFor="password">
          Password
        </Typography>
        <InputBase
          type="password"
          id="password"
          name="password"
          size="small"
          sx={{ mt: 0.5, bgcolor: "rgba(255,255,255,0.1)", color: "#fafafa" }}
          fullWidth
          disabled={loading}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <FormHelperText sx={{ color: "#F19999" }}>
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ borderRadius: 16 }}
          disabled={loading}
          disableElevation
          endIcon={loading ? <CircularProgress size={14} /> : undefined}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
