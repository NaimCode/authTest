import { motion } from "framer-motion";
import {TextInput, PasswordInput, Button} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";

function RegisterPage() {
    const { form, onSubmit } = useRegister();
  return (
    <motion.form
      onSubmit={onSubmit}
      className="w-full space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Sarah Doe"
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        placeholder="Password"
        label="Password"
        withAsterisk
        {...form.getInputProps("password")}
      />
      <PasswordInput
        placeholder="Password"
        label="Confirm Password"
        withAsterisk
        {...form.getInputProps("confirmPassword")}
      />
      {/* <Checkbox
          mt="md"
          label="I agree to terms and conditions"
          {...form.getInputProps('termsAndCondition', { type: 'checkbox' })}
          
        /> */}
      <div className="w-full py-4">
        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
      <p>
        Already have an account?{" "}
        <NavLink to="../login" className="text-blue-500 hover:underline">
          Login
        </NavLink>
      </p>
    </motion.form>
  );
}

export default RegisterPage;