import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"
import Heading from "../../components/Heading"
import Text from "../../components/Text"

const PaymentPage = () => {
    const [cookie] = useCookies(["token"])

    const {data} = useQuery({
        queryKey: ['get-payments-history'],
        queryFn: () => instance.get(`/payment/debtor`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })



  return (
    <div className="containers">
        {data?.map((item: any) => {
            console.log(item)
            return(
                <div>
                    <div>
                        <Heading children={item?.debotor?.name} tag="h2"/>
                        <Text children={item?.debotor?.debtor_phone?.[0]?.phone} classList="!font-normal !text-[14px]" />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default PaymentPage