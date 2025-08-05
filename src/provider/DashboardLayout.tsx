import type { ReactNode } from "react"
import Menu from "../modules/Menu"

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="h-[100vh] relative">
      {children}
      <Menu/>
    </div>
  )
}

export default DashboardLayout
