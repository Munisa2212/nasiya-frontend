import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Checkbox, Input, Modal } from "antd"
import Heading from "../../components/Heading"
import { useNavigate, useParams } from "react-router-dom"
import Text from "../../components/Text"
import { RightArrowIcon } from "../../assets/icons"
import { use, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import { NumberFormatter } from "../../hooks/numberFormatter"
import {  useUzbekMonthName, uzbekMonths } from "../../hooks/getMonth"
import dayjs, { Dayjs } from "dayjs";

const PaymentType = () => {
    const navigate = useNavigate()
    const [oneMonth, setOneMonth] = useState(false)
    const [anyMonth, setAnyMonth] = useState(false)
    const [chooseMonth, setChooseMonth] = useState(false)
    const [cookie] = useCookies(['token'])
    const {id} = useParams()
    const [value, setValue] = useState(0);
    const [checkedItems, setCheckedItems] = useState<any[]>([]);

    const {data} = useQuery({
        queryKey: ['get-nextDebt'],
        queryFn: () => instance.get(`/credit/credit_schedule/${id}`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })
    const dates = data?.map((item: any) => item.due_date)

    function handleMonthPayment(date: string, amount: number){
        instance.post(`/payment`, {credit_id: +id, data: [date], amount: amount}, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(() => navigate("congrats"))
    }

    function handleAnyMonthPayment(date: string[], amount: number){
        instance.post(`/payment`, {credit_id: +id, data: date, amount: amount}, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(() => navigate("congrats"))
    }

    function handleCheckboxChange(item: any, checked: boolean) {
        if (checked) {
            setCheckedItems(prev => [...prev, item]);
        } else {
            setCheckedItems(prev => prev.filter(i => i.due_date !== item.due_date));
        }
    }

    function handleChooseMonthPayment(){
        const amount = checkedItems.reduce((acc: number, item: any) => acc + item.expected_amount, 0);
        const data = checkedItems.map((item: any) => item.due_date)
        instance.post(`/payment`, {credit_id: +id, data: data, amount: amount}, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(() => navigate("congrats"))
    }

    console.log(checkedItems)
  return (
    <div className="containers">
        <div className="flex text-center gap-14 items-center mb-[32px]">
            <Button
            type="default"
            size="large"
            icon={<ArrowLeftOutlined />}
            className="text-[25px]"
            onClick={() => navigate(-1)}
            />
            <Heading children="Nasiyani so‘ndirish" tag="h1" />
        </div>

        <div className="flex flex-col gap-[24px]">
            <Text children="To‘lov" classList="!font-semibold !text-[18px]"/>
            <ul>
                <li className="flex items-center justify-between py-[16px] border-b-[1px] border-[#EEEEEE] !font-normal !text-[14px]" onClick={() => setOneMonth(true)}> 
                    <Text children="1 oyga so‘ndirish"/>
                    <RightArrowIcon/>
                </li>
                <li className="flex items-center justify-between py-[16px] border-b-[1px] border-[#EEEEEE] !font-normal !text-[14px]" onClick={() => setAnyMonth(true)}> 
                    <Text children="Har qanday miqdorda so‘ndirish"/>
                    <RightArrowIcon/>
                </li>
                <li className="flex items-center justify-between py-[16px] border-b-[1px] border-[#EEEEEE] !font-normal !text-[14px]" onClick={() => setChooseMonth(true)}> 
                    <Text children="To‘lov muddatini tanlash"/>
                    <RightArrowIcon/>
                </li>
            </ul>
        </div>

        <Modal open={oneMonth} onCancel={() => setOneMonth(false)} footer={null}>
            <div className="flex flex-col gap-[32px]">
                <Heading children="1 oy uchun so‘ndirish" tag="h2"/>
                <div className="p-[16px] bg-[#DDE9FE] rounded-[16px]">
                    <Text children={`${NumberFormatter(data?.[0]?.expected_amount)} so‘m`} classList="!text-[#3478F7]"/>
                    <Text children={`${uzbekMonths[data?.[0]?.due_date?.split("-")[1] - 1]} oyi uchun so‘ndiriladi`}/>
                </div>
                <Button className="!bg-[#3478F7] !text-white" onClick={() => handleMonthPayment(data?.[0]?.due_date, data?.[0]?.expected_amount)}>1 oylik uchun so‘ndirish</Button>
            </div>
        </Modal>

        <Modal open={anyMonth} onCancel={() => setAnyMonth(false)} footer={null}>
            <div className="flex flex-col gap-[32px]">
                <Heading children="Har qanday miqdorda so‘ndirish" tag="h2"/>
                <div>
                    <Text children="Miqdorni kiriting" classList="!text-[13px]"/>
                    <Input placeholder="To‘lov miqdori" className="!bg-[#F6F6F6]" value={value} onChange={(e) => setValue(+e.target.value)}/>
                </div>
                <Button className="!bg-[#3478F7] !text-white"  onClick={() => handleAnyMonthPayment(dates, value)}>Har qanday miqdorda so‘ndirish</Button>
            </div>
        </Modal>

        <Modal open={chooseMonth} onCancel={() => setChooseMonth(false)} footer={null}>
            <div className="flex flex-col gap-[22px]">
                <Heading children="To‘lov muddatini tanlang" tag="h2"/>
                <div className="flex flex-col gap-[22px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <Text children="So‘ndirish:"/>

                        </div>
                        <Text children="Hammasini tanlang" classList="!text-[#3478F7]"/>
                    </div>
                    <div>
                        {data?.map((item: any) => (
                            <div className="flex items-center justify-between p-[16px] border-y-[1px] border-y-[#ECECEC]">
                                <Text children={useUzbekMonthName(dayjs(item.due_date))}/>
                                <div className="flex gap-[10px]">
                                    <Text children={`${NumberFormatter(item.expected_amount - item.paid_amount)} so‘m`}/>
                                    <Checkbox 
                                    checked={checkedItems.some(i => i.due_date === item.due_date)}
                                    onChange={e => handleCheckboxChange(item, e.target.checked)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="!bg-[#3478F7] !text-white"  onClick={handleChooseMonthPayment}>So‘ndirish</Button>
                </div>
            </div>
        </Modal>

    </div>
  )
}

export default PaymentType