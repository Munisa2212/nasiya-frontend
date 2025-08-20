import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import Heading from "../../components/Heading"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import Text from "../../components/Text"
import { useUzbekMonthName, uzbekMonths } from "../../hooks/getMonth"

const NotificationPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [cookies] = useCookies(["token"])

    const {data} = useQuery({
        queryKey: ['get-debtor'],
        queryFn: () => instance.get(`/debtor/${id}`, {headers: {"Authorization": `Bearer ${cookies.token}` }}).then(res => res.data),
        refetchOnMount: false
    })

    const {data: notification} = useQuery({
        queryKey: ['get-notification'],
        queryFn: () => instance.get(`/notification/debtor/${id}`, {headers: {"Authorization": `Bearer ${cookies.token}` }}).then(res => res.data),
        refetchOnMount: false
    })

  return (
    <div className="containers">
        <div className="flex text-center gap-20 items-center mb-[32px]">
            <Button
            type="default"
            size="large"
            icon={<ArrowLeftOutlined />}
            className="text-[25px]"
            onClick={() => navigate(-1)}
            />
            <Heading children={data?.name} tag="h1" />
        </div>
        <div className="flex flex-col gap-5">
            {notification?.map((item: any) => {
                return(
                    <div>
                        <div className=" flex items-center justify-center">
                            <Text children={`${item?.sent_at.split("-")[2].split("T")[0]} ${uzbekMonths[Number(item?.sent_at.split("-")[1])]}`} classList="!font-light !text-[14px]"/>
                        </div>
                        <div className="flex flex-col bg-[#F5F5F5] w-[305px] items-end ml-[54px] p-[16px] rounded-[16px]">
                            <Text children={item?.message} classList="!font-light"/>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default NotificationPage