import Lottie from "../../components/lottie";
import EmailSentAnimation from "../../assets/email_sent.json";
import {Button} from "@mantine/core"
import { useNavigate } from "react-router-dom";

function EmailSent() {
    const navigate=useNavigate();
    return <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      <div className="max-w-[500px]  flex flex-col items-center">
      <div className="w-[200px]">
      <Lottie animationData={EmailSentAnimation} loop />
      </div>
        <span className="text-sm text-gray-600">
            We have sent you an email with instructions to reset your password
        </span>
     
      </div>
      <Button className="mt-4" variant="subtle" onClick={()=>navigate("/auth")}>
            Back to login
        </Button>
    </div>
}

export default EmailSent;