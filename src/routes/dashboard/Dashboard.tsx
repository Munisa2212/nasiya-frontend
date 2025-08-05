import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../../provider/DashboardLayout"
import { Path } from "../../hooks/Path"
import Home from "../../pages/Dashboard/Home"

const Dashboard = () => {
  return (
    <DashboardLayout>
        <Routes>
            <Route path={Path.main} element={<Home />} />
        </Routes>
    </DashboardLayout>
  )
}

export default Dashboard