import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../../provider/DashboardLayout"
import { Path } from "../../hooks/Path"
import Home from "../../pages/Dashboard/Home"
import CalendarPage from "../../pages/Dashboard/CalendarPage"
import Debtors from "../../pages/Dashboard/Debtors"
import DebtorCreate from "../../pages/Dashboard/DebtorCreate"

const Dashboard = () => {
  return (
    <DashboardLayout>
        <Routes>
            <Route path={Path.main} element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/debtors" element={<Debtors/>} />
            <Route path="/debtors/create" element={<DebtorCreate/>} />
        </Routes>
    </DashboardLayout>
  )
}

export default Dashboard