import { motion } from "framer-motion";
import { useLogin } from "../../hooks/useAuth";
import {TextInput, PasswordInput, Button} from "@mantine/core";
import { NavLink } from "react-router-dom";

function LoginPage() {
    const { form, onSubmit } = useLogin();
    return (
        <motion.form
          onSubmit={onSubmit}
          className="w-full space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            // className="w-full"
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <div className="w-full py-4">
            <Button  type="submit" className="w-full">
              Login
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <NavLink to="../registration" className="text-blue-500 hover:underline">
              Register
            </NavLink>
          </p>
        </motion.form>
      );
}

export default LoginPage;