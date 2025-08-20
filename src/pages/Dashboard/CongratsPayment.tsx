import { Button } from "antd"
import { CongratsPaymentIcon } from "../../assets/icons"
import Heading from "../../components/Heading"
import Text from "../../components/Text"

const CongratsPayment = () => {
  return (
    <div className="containers">
        <div className="flex flex-col items-center mt-[180px] gap-4">
            <CongratsPaymentIcon/>
            <Heading children="Ajoyib!" tag="h1" classList="!text-[#3478F7] !text-[22px] !font-semibold"/>
            <Text children="Muvaffaqiyatli so‘ndirildi" classList="!text-[16px] !font-normal"/>
        </div>
        <Button type="primary" size="large" className="w-full mt-[150px]" onClick={ () => location.pathname = "/" }>Dashboardga qaytish</Button>
    </div>
  )
}

export default CongratsPayment