import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"
import Heading from "../../components/Heading"
import { useNavigate } from "react-router-dom"
import { Button } from "antd"
import Text from "../../components/Text"
import CustomCalendar from "../../components/Calendar"
import React from "react"
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import { useUzbekMonth, useUzbekMonthName } from "../../hooks/getMonth"


const CalendarPage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [cookies] = useCookies(['token']);
  

    const { data } = useQuery({
      queryKey: ['get-payment', selectedDate.format('YYYY-MM-DD')],
      queryFn: () =>
        instance
          .get(`/payment/payment_day/${selectedDate.format('YYYY-MM-DD')}`, {
            headers: { Authorization: `Bearer ${cookies.token}` },
          })
          .then((res) => res.data),
      enabled: !!selectedDate && !!cookies.token, 
      refetchOnMount: false,
    });
    const total = data?.month_debt.reduce((acc: any, item: any) => acc + item.expected_amount, 0);
    console.log(data?.data?.debtorName, "Name")
  return (
    <div className="containers flex flex-col gap-[30px]">
      <div className="flex text-center gap-25 items-center">
        <Button type="default" size="large" icon={<ArrowLeftOutlined />} className="text-[25px]" onClick={ () => navigate(-1) }/>
        <Heading children="Kalendar" tag="h1"/>
      </div>
      <div>
        <div className="flex items-center justify-between mb-[16px]">
          <Text children={useUzbekMonthName(selectedDate)}/>
          <div className="flex gap-4 items-center">
            <Button type="default" size="large" icon={<LeftOutlined className="w-[40px] h-[40px] bg-[#F5F5F5] justify-center rounded-[12px] border-[1px] border-slate-200"/>} className="text-[25px]" onClick={() => setSelectedDate(prev => prev.subtract(1, 'month')) }/>
            <Button type="default" size="large" icon={<RightOutlined className="w-[40px] h-[40px] bg-[#F5F5F5] justify-center rounded-[12px] border-[1px] border-slate-200"/>} className="text-[25px]" onClick={() => setSelectedDate(prev => prev.add(1, 'month')) }/>
          </div>
        </div>
        <div className="flex items-center justify-between mb-[20px]">
          <Text children={"Oylik jami"}/>
          <Heading tag="h2" classList="!text-[18px]" children={`${total || 0} so'm`}/>
        </div>
        <CustomCalendar data={data} onChange={setSelectedDate} value={selectedDate}/>
        <div className=" bg-[#F6F6F6] h-full mt-[28px] rounded-t-[16px] p-[16px]">
          <Heading tag="h2" classList="!text-[18px] mb-[20px]" children={`${(selectedDate as any)?.$D} ${useUzbekMonth(selectedDate)} kuni to‘lov kutilmoqda`}/>
          {data?.data.map((item: any) => (
            <div className="flex mb-[12px] bg-white p-[15px] rounded-[16px] flex-col">
              <Text children={item.credit.product_name}/>
              <Text classList="!text-[14px] !font-normal" children={`UZS ${item.expected_amount} so'm`}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage