import Heading from "../../components/Heading"
import logo from "../../assets/images/logo.svg"
import LoginPage from "../../components/LoginPage";
import Text from "../../components/Text";

const Login = () => {

  return (
    <div className="containers relative !pt-[90px] h-[100vh]">
        <img className="logo-icon mb-[32px]" src={logo} alt="Logo" width={40} height={40} />
        <Heading tag="h1" classList="!mb-[12px]">Dasturga kirish</Heading>
        <Text>Iltimos, tizimga kirish uchun login va parolingizni kiriting.</Text>
        <LoginPage />
        <Text classList="absolute bottom-0 !font-normal !pb-[10px]">Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun <span className="text-[#3478F7]">do'kon administratori</span>  bilan bog'laning.</Text>
    </div>
  )
}

export default Login