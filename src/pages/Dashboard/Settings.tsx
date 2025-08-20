import { useNavigate } from "react-router-dom"
import { RightArrowIcon } from "../../assets/icons"
import Heading from "../../components/Heading"
import Text from "../../components/Text"
import { useCookies } from "react-cookie"
import { Modal } from "antd"
import { useState } from "react"

const Settings = () => {
  const navigate = useNavigate()
  const [_cookie, _setCookie, removeCookie] = useCookies(["token"])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOut = () => {
    removeCookie("token", { path: "/" })
    window.location.href = "/login"    
  }
  
  return (
    <div className="containers">
      <div className="flex flex-col gap-[16px]">
        <div>
          <Heading children="Sozlamalar" tag="h1" />
          <div className="w-full h-[1px] bg-[#ECECEC] my-4"></div>
        </div>

        <div>
          <Text children={"Asosiy"} classList="!text-[#3478F7] !text-[16px] !font-medium !mb-2" />
          <ul>
            <li className="flex justify-between items-center" onClick={() => navigate("personal-info")}>
              <Text children={"Shaxsiy ma’lumotlar"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center" onClick={() => navigate("personal-info")}>
              <Text children={"Xavfsizlik"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
          </ul>
        </div>

        <div>
          <Text children={"Boshqa"} classList="!text-[#3478F7] !text-[16px] !font-medium !mb-2" />
          <ul>
            <li className="flex justify-between items-center" onClick={() => navigate("help")}>
              <Text children={"Yordam"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center">
              <Text children={"Taklif va shikoyatlar"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center">
              <Text children={"Dastur haqida"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center">
              <Text children={"Ommaviy oferta"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center">
              <Text children={"Maxfiylik siyosati"}/>
              <RightArrowIcon/>
            </li>
            <li className="w-full h-[1px] bg-[#ECECEC] my-4"></li>
            <li className="flex justify-between items-center" onClick={() => setIsModalOpen(true)}>
              <Text children={"Chiqish"} classList="!text-[#F94D4D]"/>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        style={{ width: 50 }}
      >
        <div className="flex flex-col gap-[16px]">
          <Text children={"Chiqishni tasdiqlaysizmi?"} classList="!text-[#000000] !text-[16px] !font-medium !mb-2" />
          <div>
            <button className="w-full h-[44px] bg-[#3478F7] rounded-[8px] flex justify-center items-center" onClick={handleLogOut}>
              <Text children={"Ha"} classList="!text-[#FFFFFF] !text-[16px] !font-medium" />
            </button>
            <button className="w-full h-[44px] bg-[#FFFFFF] border-[1px] border-[#ECECEC] rounded-[8px] flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
              <Text children={"Yo'q"} classList="!text-[#000000] !text-[16px] !font-medium" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Settings