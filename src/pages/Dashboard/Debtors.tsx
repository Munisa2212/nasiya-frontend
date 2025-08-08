import React from "react"
import CustomSearch from "../../components/Search"
import {  FilterIcon } from "../../assets/icons"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import Heading from "../../components/Heading"
import Text from "../../components/Text"
import { Button } from "antd"
import { UserAddOutlined } from "@ant-design/icons"

const Debtors = () => {
  const [search, setSearch] = React.useState('')
  const [cookie] = useCookies(['token'])
  const {data} = useQuery({
    queryKey: ['get-debtors'],
    queryFn: () => instance.get('/debtor', {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
    refetchOnMount: false
  })

  function total_debt(data: any){
    const total = data.reduce((acc: any, item: any) => acc + item.remaining_amount, 0);
    return total || 0
  }

  return (
    <div className="containers ">
      <div className="flex items-center justify-between mb-[30px]">
        <CustomSearch value={search} onChange={setSearch}/>
        <FilterIcon/>
      </div>

      <div>
        {data?.data?.map((item: any) => (
          <div key={item.id} className="flex gap-2 flex-col w-full bg-[#F6F6F6] p-[16px] rounded-[16px]">
            <div className="mb-[16px]">
              <Heading children={item?.name} tag="h2"/>
              <Text children={item?.debtor_phone?.[0]?.phone || ''} classList="text-[#A3A3A3] !text-[14px]" />
            </div>
            <div>
              <Text children={"Jami nasiya:"} classList="text-[#A3A3A3] !text-[12px]" />
              <Heading children={total_debt(item.credits) != 0 ? `-${total_debt(item.credits)} so'm` : "0 so'm"} classList={total_debt(item.credits) != 0 ? "text-[#F94D4D]" : ""} tag="h1"/>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[70px] right-[20px]">
        <Button onClick={() => location.pathname = '/debtors/create'} type="primary" className="!w-[140px] !h-[48px] !rounded-[10px] !text-[16px] !p-[14px]" icon={<UserAddOutlined /> }>Qo'shish</Button> 
      </div>
    </div>
  )
}

export default Debtors