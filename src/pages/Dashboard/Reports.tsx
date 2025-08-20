import { Button } from "antd"
import { EditIcon } from "../../assets/icons"
import Heading from "../../components/Heading"
import { useState } from "react"
import MessageHistory from "../../components/MessageHistory"
import PaymentHistory from "../../components/PaymentHistory"

const Reports = () => {
  const [message, setMessage] = useState(true)
  const [payment, setPayment] = useState(false)

  return (
    <div className="containers">
      <div>
        <div className="flex justify-between items-center">
          <Heading children="Hisobot" tag="h1" classList="!font-semibold"/>
          <EditIcon/>
        </div>
        <div className="w-full h-[1px] bg-[#ECECEC] my-4"></div>
      </div>
      <div className="flex !mx-auto">
        <Button type="default" size="large" className={`${message ? "!text-[#3478F7] !border-[#3478F7]" : ""} w-[168px] rounded-[6px]`} onClick={() => (setPayment(false), setMessage(true))}>Xabarlar tarixi</Button>
        <Button type="default" size="large" className={`${payment ? "!text-[#3478F7] !border-[#3478F7]" : ""} w-[168px] rounded-[6px]`} onClick={() => (setMessage(false), setPayment(true))}>To‘lovlar tarixi</Button>
      </div>

      <div>
        {message && <MessageHistory/>}
        {payment && <PaymentHistory/>}
      </div>
    </div>
  )
}

export default Reports