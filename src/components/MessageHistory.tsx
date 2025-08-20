import { useQuery } from "@tanstack/react-query"
import { instance } from "../hooks/instance"
import { useCookies } from "react-cookie"
import Text from "./Text"
import { useNavigate } from "react-router-dom"

const MessageHistory = () => {
    const [cookie] = useCookies(["token"])
    const navigate = useNavigate()

    const {data} = useQuery({
        queryKey: ['get-message-history'],
        queryFn: () => instance.get(`/debtor`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })

  return (
    <div className="containers !mt-5">
        {data?.data?.map((item: any) => {
            return(
                <div className="border-b-[1px] border-b-[#ECECEC] py-4" onClick={() => navigate(`${item.id}/notification`)}>
                    <Text children={item?.name} classList="!font-bold !text-[18px]" />
                    <Text children={item?.debtor_phone?.[0]?.phone} classList="!font-normal !text-[14px]"/>
                </div>
            )
        })}
    </div>
  )
}

export default MessageHistory