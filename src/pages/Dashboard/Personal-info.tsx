import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Image } from "antd"
import { useNavigate } from "react-router-dom"
import Heading from "../../components/Heading"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import Text from "../../components/Text"

const PersonalInfo = () => {
    const navigate = useNavigate()
    const [cookie] = useCookies(["token"])
    const {data} = useQuery({
        queryKey: ['get-me'],
        queryFn: () => instance.get(`/seller/me`, {headers: {"Authorization": `Bearer ${cookie.token}` }}).then(res => res.data),
        refetchOnMount: false
    })

    console.log(data)
  return (
    <div className="containers">
        <div className="flex text-center gap-14 items-center mb-[32px]">
            <Button
            type="default"
            size="large"
            icon={<ArrowLeftOutlined />}
            className="text-[25px]"
            onClick={() => navigate("/settings")}
            />
            <Heading children="Shaxsiy ma’lumotlar" tag="h1" />
        </div>

        <div className="flex flex-col gap-[24px] ">
            <div className="mx-auto ">
                <Image src={data?.data?.image ? data?.data?.image : "https://i.pinimg.com/736x/db/3a/62/db3a623acc8396fb285ec899ad01cd10.jpg"} alt="avatar" className="w-[100px] h-[100px] rounded-full" width={100} height={100}/>
            </div>
            <div>
                <Text children={"Ismi familiya"} classList="!font-semibold !text-[16px]"/>
                <div className="p-[14px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px]">
                    <Text children={data?.data?.name}/>
                </div>
            </div>
            <div>
                <Text children={"Telefon raqam"} classList="!font-semibold !text-[16px]"/>
                <div className="p-[14px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px]">
                    <Text children={data?.data?.phone ? data?.data?.phone : "No phone number"}/>
                </div>
            </div>
            <div>
                <Text children={"Elektron pochta"} classList="!font-semibold !text-[16px]"/>
                <div className="p-[14px] bg-[#F6F6F6] border-[1px] border-[#ECECEC] rounded-[8px]">
                    <Text children={data?.data?.phone ? data?.data?.email : "No email"}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PersonalInfo