import { Route, Routes } from "react-router-dom"
import DashboardLayout from "../../provider/DashboardLayout"
import { Path } from "../../hooks/Path"
import Home from "../../pages/Dashboard/Home"
import CalendarPage from "../../pages/Dashboard/CalendarPage"
import Debtors from "../../pages/Dashboard/Debtors"
import DebtorCreate from "../../pages/Dashboard/DebtorCreatePage"
import SingleDebtor from "../../pages/Dashboard/SingleDebtor"
import CreditCreate from "../../pages/Dashboard/CreditCreate"
import SingleCredit from "../../pages/Dashboard/SingleCredit"
import PaymentType from "../../pages/Dashboard/PaymentType"
import CongratsPayment from "../../pages/Dashboard/CongratsPayment"
import Reports from "../../pages/Dashboard/Reports"
import Settings from "../../pages/Dashboard/Settings"
import NotificationPage from "../../pages/Dashboard/NotificationPage"
import PaymentPage from "../../pages/Dashboard/PaymentPage"
import PersonalInfo from "../../pages/Dashboard/Personal-info"

const Dashboard = () => {
  return (
    <DashboardLayout>
        <Routes>
            <Route path={Path.main} element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/debtors" element={<Debtors/>} />
            <Route path="/debtors/create" element={<DebtorCreate/>} />
            <Route path="/debtors/:id" element={<SingleDebtor/>} />
            <Route path="credit/:id/create" element={<CreditCreate/>} />
            <Route path="debtors/:id/credit/:id" element={<SingleCredit/>} />
            <Route path="debtors/:id/credit/:id/payment-type" element={<PaymentType/>} />
            <Route path="debtors/:id/credit/:id/payment-type/congrats" element={<CongratsPayment/>} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/reports/:id/notification" element={<NotificationPage/>}/>
            <Route path="/reports/:id/payment" element={<PaymentPage/>}/>
            <Route path="/debtors/:id/edit" element={<DebtorCreate/>} />
            <Route path="/settings/personal-info" element={<PersonalInfo />} />

        </Routes>
    </DashboardLayout>
  )
}

export default Dashboard