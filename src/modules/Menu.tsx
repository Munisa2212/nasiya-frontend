
import { NavLink } from "react-router-dom"
import { DebtorsIcon, MainIcon, ReportIcon, SettingsIcon } from "../assets/icons"

const Menu = () => {
  return (
    <div className="w-full h-[58px] border-t-[1px] border-t-[#EDEDED] flex justify-evenly items-center fixed bottom-0 bg-white z-index-50">
      <NavLink to="/"><MainIcon />Asosiy</NavLink>
      <NavLink to="/debtors"><DebtorsIcon/>Mijozlar</NavLink>
      <NavLink to="/reports"><ReportIcon/>Hisobot</NavLink>
      <NavLink to="/settings"><SettingsIcon/>Sozlama</NavLink>
    </div>
  )
}

export default Menu