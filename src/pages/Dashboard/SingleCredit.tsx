import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import Heading from "../../components/Heading"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import Text from "../../components/Text"
import {  formatDate2, getTimeFromDate } from "../../hooks/dateFormatter"
import { CalendarIcon } from "../../assets/icons"
import { NumberFormatter } from "../../hooks/numberFormatter"

const SingleCredit = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [cookie] = useCookies(['token'])

    const {data} = useQuery({
        queryKey: ['get-singleCredit'],
        queryFn: () => instance.get(`/credit/${id}`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })
  return (
    <div className="containers !mb-10">
        <div className="flex text-center gap-17 items-center mb-[32px]">
            <Button
            type="default"
            size="large"
            icon={<ArrowLeftOutlined />}
            className="text-[25px]"
            onClick={() => navigate(-1)}
            />
            <Heading children="Batafsil" tag="h1" />
        </div>

        <div className="flex flex-col gap-[24px]">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-[8px]">
                    <Text children="Sana" />
                    <div className="flex items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between w-[240px] rounded-[8px] h-[44px]">
                        <Text children={formatDate2(data?.start_date)} />
                        <CalendarIcon/>
                    </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                    <Text children="Vaqt" />
                    <div className="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px] h-[44px]">
                        <Text children={getTimeFromDate(data?.start_date)} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <Text children="Muddat" />
                <div className="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px] h-[44px] ">
                    <Text children={`${data?.duration} oy`} classList="!text-[18px] font-normal "/>
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <Text children="Summa miqdori" />
                <div className="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px] h-[44px]">
                    <Text children={`${NumberFormatter(data?.total_amount)} so'm`} classList="!text-[18px] font-normal "/>
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <Text children="Eslatma" />
                {data?.note ? <Text children={data?.note} classList="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px]"/> : <Text children="Eslatma mavjud emas" classList="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px]"/>}
            </div>

            <div className="flex flex-col gap-[8px]">
                <Text children="Rasmlar"/>
                {data?.credit_image.map((item: any, index: number) => 
                    <div className="items-center bg-[#F6F6F6] border-[1px] border-[#ECECEC] p-[14px] justify-between rounded-[8px] w-[170px]">
                        <img key={index} src={item.image} className="w-[200px] h-[200px] object-cover rounded-[8px]" alt="" />
                    </div>
                )}
            </div>

            <Button children="Nasiyani so‘ndirish" className="!bg-[#3478F7] !text-white !h-[50px] !rounded-[10px]" onClick={() => navigate("payment-type")}/>
        </div>
    </div>
  )
}

export default SingleCredit