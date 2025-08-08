import { Button, Form, Input } from "antd"
import Heading from "../../components/Heading"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Path } from "../../hooks/Path"
import React from "react"
import UploadImage from "../../components/Image"

const DebtorCreate = () => {
    const navigate = useNavigate()
    const [buttonClick, setButtonClick] = React.useState(false)

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
  return (
    <div className="containers">
        <div className="flex text-center gap-17 items-center mb-[32px]">
            <Button type="default" size="large" icon={<ArrowLeftOutlined />} className="text-[25px]" onClick={ () => navigate(Path.debtor) }/>
            <Heading children="Mijoz yaratish" tag="h1"/>
        </div>
        <Form className="flex flex-col gap-8" onFinish={(values) => onFinish(values)}>
            <div>
                <label htmlFor="name">Ismi</label>
                <Input id="name" className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Ismini kiriting"/>
            </div>
            <div>
                <label htmlFor="phone">Telefon raqami</label>
                <Input id="phone" className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Telefon raqami"/>
            </div>
            <div>
                <label htmlFor="address">Yashash manzili</label>
                <Input id="address" className="h-[44px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Yashash manzilini kiriting"/>
            </div> 
            {!buttonClick && <Button type="default" size="large" onClick={() => setButtonClick(prev => !prev)}>Eslatma qo'shish</Button>}
            {buttonClick && <div>
                <label htmlFor="address">Eslatma</label>
                <Input id="address" className="h-[104px] !bg-[#F6F6F6] !rounded-[8px]" placeholder="Eslatmani kiriting"/>
            </div>}
            <div>
                <UploadImage/>
            </div>
            <Button type="primary" size="large" htmlType="submit" className="!mb-[40px]">Saqlash</Button>
        </Form>
    </div>
  )
}

export default DebtorCreate