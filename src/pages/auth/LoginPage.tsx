import { motion } from "framer-motion";
import { useLogin } from "../../hooks/useAuth";
import {TextInput, PasswordInput, Button} from "@mantine/core";
import { NavLink } from "react-router-dom";

function LoginPage() {
    const { onSubmit,emailProps,passwordProps,isLoading } = useLogin();
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
            {...emailProps}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...passwordProps}
          />
          <div className="w-full py-4">
            <Button loading={isLoading} type="submit" className="w-full">
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