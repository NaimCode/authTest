import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
function AuthPage() {
    return <div className="bg-[url('/pattern.svg')] w-screen h-screen  relative overflow-hidden">
        <div className="absolute w-full flex justify-center items-center flex-col gap-5 h-full z-30">
            {/* <LogoBrand /> */}
            <div className="flex justify-center items-center flex-col">
                <span className="text-xl font-bold">Authentification</span>
                <span className="text-gray-500">
                    Fill in the fields below to continue
                </span>
            </div>
            <motion.div
                style={{
                    backgroundColor: "white",
                }}
                className="rounded-3xl w-[450px] shadow-xl flex flex-col gap-4 items-center my-4 p-10 text-sm"
            >

                <AnimatePresence>
                    <Outlet />
                </AnimatePresence>
            </motion.div>
            <div className="text-sm gap-2 flex">
                <span>Copyright @Naim 2023 </span>│
                <a className="text-blue-500 hover:underline cursor-pointer">
                    Privacy Policy
                </a>
            </div>
        </div>

    </div>
}

export default AuthPage;