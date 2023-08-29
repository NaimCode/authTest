/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuthStore, { User } from "../store/auth";
import { Skeleton, Avatar, Button, Space } from "@mantine/core"

import { notifications } from '@mantine/notifications';
import {modals} from "@mantine/modals"

function ProfilePage() {
    const me = useAuthStore(store => store.me)
    const logout=useAuthStore(store=>store.logout)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        me().then((user) => {
            if (user) setUser(user)
        }).finally(() => setLoading(false))
    }, [])

    const onLogout=()=>modals.openConfirmModal({
        title:"Logout",
        centered:true,
      color:"red",
        children:"You are about to logout, please confirm you decision",
        labels:{
            confirm:"Confirm",
            cancel:"Cancel"
        },
        onConfirm:()=>logout().then(()=>notifications.show({
            title:"Logout",
            message:"You logged out successfully"
        })).catch(()=>notifications.show({
            title:"Error",
            message:"Failed to logout",
            color:"red"
        }))
    })

    return <div className="h-screen w-screen flex flex-col items-center justify-center gap-3">
        <div className="w-[400px]">
            <Skeleton visible={isLoading || user === null}>
                <div className="flex flex-col items-center">
                    <Avatar size={50} />
                    <h1>
                        {user?.name}
                    </h1>
                    <span className="text-xs text-gray-400">
                        {user?.email}
                    </span>
                    <Space h={20} />
                    <Button onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            </Skeleton>
        </div>
    </div>
}

export default ProfilePage;