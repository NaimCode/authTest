import { TextInput, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { validator } from "../hooks/useAuth";
import useAuthStore from "../store/auth";
import { useState } from "react";
function ForgetPasswordDialog({callback}:{
    callback?:()=>void
}) {
    const onForgetPassword = useAuthStore(store => store.forgetPassword)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<{ email: string }>({
        initialValues: {
            email: ""
        },
        validate: {
            email: validator.email
        }
    })
    return <form onSubmit={form.onSubmit((value) => {
        setIsLoading(true)
        onForgetPassword(value).then(callback).catch((err) => {
            form.setFieldError("email", err.response.data)
        }).finally(() => setIsLoading(false))
    })}>
        <p className="text-xs text-gray-600">
            Please enter your email address below and we will send you information to change your password
        </p>
        <TextInput withAsterisk label="Email" placeholder="your@gmail.com" {...form.getInputProps("email")} />
        <div className="flex flex-row gap-3 justify-end items-center pt-5">
            <Button onClick={() => modals.closeAll()} variant="default">
                Cancel
            </Button>
            <Button loading={isLoading} type="submit">
                Send
            </Button>
        </div>
    </form>
}

export default ForgetPasswordDialog;