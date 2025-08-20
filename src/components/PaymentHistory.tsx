// import { useQuery } from "@tanstack/react-query"
// import { useCookies } from "react-cookie"
// import { instance } from "../hooks/instance"
// import Heading from "./Heading"
// import Text from "./Text"
// import { NumberFormatter } from "../hooks/numberFormatter"


// const PaymentHistory = () => {
//     const [cookie] = useCookies(["token"])
    
//     const {data} = useQuery({
//         queryKey: ['get-payments-history'],
//         queryFn: () => instance.get(`/payment/debtor`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
//         refetchOnMount: false
//     })


//   return (
//     <div className="containers !mt-5 flex flex-col gap-3">
//         {data?.map((item: any) => {
//             return(
//                 <div className="border-b-[1px] border-b-[#ECECEC] py-4 flex justify-between items-center">
//                     <div>
//                         <Heading children={item?.debtor?.name} tag="h2"/>
//                         <Text children={item?.debtor?.address} classList="!font-normal !text-[14px]" />
//                     </div>
//                     <div>
//                         <Text children={`${NumberFormatter(item?.paid_amount)} so'm`}/>
//                     </div>
//                 </div>
//             )
//         })}
//     </div>
//   )
// }

// export default PaymentHistory


import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { instance } from "../hooks/instance"
import Heading from "./Heading"
import Text from "./Text"
import { NumberFormatter } from "../hooks/numberFormatter"

const PaymentHistory = () => {
  const [cookie] = useCookies(["token"])
  
  const { data } = useQuery({
    queryKey: ['get-payments-history'],
    queryFn: () => instance
      .get(`/payment/debtor`, { headers: { Authorization: `Bearer ${cookie.token}` } })
      .then(res => res.data),
    refetchOnMount: false
  })

  const grouped = data?.reduce((acc: any, item: any) => {
    const date = new Date(item.due_date).toISOString().split("T")[0]
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped || {}).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  return (
    <div className="containers !mt-5">
      {sortedDates.map(date => (
        <div key={date} className="mb-4">
          <Text children={date} classList="!text-[12px] !text-center !mb-2 !text-[#3478F7]" />
          {grouped[date].map((item: any) => (
            <div className="border-b-[1px] border-b-[#ECECEC] py-4 flex justify-between items-center">
                <div key={item.id} className="pl-4">
                    <Heading children={item?.debtor?.name} tag="h2" />
                    <Text children={item?.debtor?.address} classList="!font-normal !text-[14px]" />
                </div>
                <div>
                    <Text children={`${NumberFormatter(item.paid_amount)} so'm`} classList="!font-semibold !text-[14px]" />
                </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PaymentHistory
