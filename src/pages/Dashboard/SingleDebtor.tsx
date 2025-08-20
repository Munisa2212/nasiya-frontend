import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import Heading from "../../components/Heading"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { MoreDottedIcon } from "../../assets/icons"
import { useState } from "react"
import Text from "../../components/Text"
import { NumberFormatter } from "../../hooks/numberFormatter"
import { formatDate } from "../../hooks/dateFormatter"
import { useCookies } from "react-cookie"

const SingleDebtor = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [more, setMore] = useState(false)
    const [cookie] = useCookies(['token'])
    const [sureDelete, setSureDelete] = useState(false)


    function getPercentage(part: number, whole: number): number {
        return (part / whole) * 100;
    }

    function debtorDelete(){
      instance.delete(`/debtor/${id}`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(() => navigate(-1))
    }

    function handleModels(){
      setMore(false)
      setSureDelete(true)
    }

    const {data} = useQuery({
        queryKey: ['get-singleDebtor'],
        queryFn: () => instance.get(`/debtor/${id}`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })

    const total_debt = data?.credits.reduce((acc: any, item: any) => acc + item.remaining_amount, 0);
  return (
    <div className="containers flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
                <Button
                type="default"
                size="large"
                icon={<ArrowLeftOutlined />}
                className="text-[25px]"
                onClick={() => navigate(-1)}
                />
                <Heading children={data?.name} tag="h1" />
            </div>
            <Button onClick={() => setMore(true)} icon={<MoreDottedIcon />} style={{border: "none"}}/>
      </div>

      <div className="h-[84px] rounded-[20px] bg-[#BBD2FC] p-[18px]">
        <Text children="Umumiy nasiya:" classList="!text-[12px]"/>
        <Heading children={`${NumberFormatter(total_debt)} so'm`} tag="h1" />
      </div>

      <div>
        <Heading children="Faol nasiyalar" tag="h2" classList="!font-semibold"/>
        {data?.credits.map((item: any) => (
          <div key={item.id} className="flex gap-6 flex-col w-full bg-[#F6F6F6] p-[16px] rounded-[16px] my-4" onClick={() => navigate(`/debtors/${id}/credit/${item.id}`)}>
            <div className="flex justify-between items-center">
                <Text children={formatDate(item.start_date)}/>
                <Text children={`${NumberFormatter(item.total_amount)} so'm`} classList="!text-[#3478F7]"/>
            </div>
            <div className="mb-[16px]">
                <Text children={`Keyingi to'lov: ${formatDate(item.start_date)}`} classList="!font-normal !text-[12px]"/>
                <Heading children={`${NumberFormatter(item.remaining_amount)} so'm`} tag="h1" classList="!text-[#735CD8] !font-semibold"/>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(item.remaining_amount, item.total_amount)}%` }}
                ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[70px] right-[20px]">
        <Button onClick={() => location.pathname = `/credit/${id}/create`} type="primary" className="!w-[140px] !h-[48px] !rounded-[10px] !text-[16px] !p-[14px]" icon={<PlusOutlined /> }>Qo'shish</Button> 
      </div>


      <Modal
        open={more}
        onCancel={() => setMore(false)}
        footer={null}
        style={{ width: 50 }}
      >
        <Button children="Tahrirlash" onClick={() => navigate("edit")}/>
        <div className="h-[1px] w-full bg-[#ECECEC] m-2"></div>
        <Button children="O'chirish" onClick={handleModels} />
      </Modal>

      <Modal
        open={sureDelete}
        title="Aniq o'chirmoqchimisiz"
        okText="Ha"
        cancelText="Yo'q"
        onOk={() => {
          debtorDelete();
          setSureDelete(false);
        }}
        onCancel={() => setSureDelete(false)}
      />
      
    </div>
  )
}

export default SingleDebtor