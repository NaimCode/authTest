/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@mantine/form";
import { validator } from "../hooks/useAuth";
import { PasswordInput, Button } from "@mantine/core";
import useAuthStore from "../store/auth";
import { useParams, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

function ResetPasswordPage() {
    const token = useParams().token
    const onResetPassword = useAuthStore(store => store.resetPassword)
const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm<{
        password: string;
        confirmPassword: string;
        token?: string
    }>({
        initialValues: {
            password: "",
            confirmPassword: "",
            token
        },
        validate: {
            password: validator.password,
            confirmPassword: validator.confirmPassword as any,
        },
    });
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <form
                onSubmit={form.onSubmit((v) => {
                    setIsLoading(true)
                    onResetPassword({
                        password: v.password,
                        token: v.token
                    }).then(() => {
                        notifications.show({
                            title: "Password reset",
                            message: "Your password has been reset successfully"
                        })
                        navigate("/auth")
                    }).catch((err) => {
                        notifications.show({
                            title: "Error",
                            message: err.response.data,
                            color: "red"
                        })
                    }
                    ).finally(() => setIsLoading(false))
                })}
                className="flex flex-col items-center gap-3 w-[400px]"
            >
                <span className="text-2xl font-semibold">Reset Password</span>
                <span className="text-sm text-gray-600">Please enter your new password</span>
                <PasswordInput
                    label={"New password"}
                    withAsterisk
                    variant="filled"
                    className="w-full"
                    {...form.getInputProps("password")}
                />
                <PasswordInput
                    label={"Confirm password"}
                    withAsterisk
                    variant="filled"
                    className="w-full"
                    {...form.getInputProps("confirmPassword")}
                />
                <div className="w-full py-4">
                    <Button loading={isLoading} type="submit" className="w-full">
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ResetPasswordPage;
