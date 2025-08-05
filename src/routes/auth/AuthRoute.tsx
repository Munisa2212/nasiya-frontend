import { Route, Routes } from "react-router-dom"
import { Path } from "../../hooks/Path"
import LoginPage from "../../components/LoginPage"
import { Suspense } from "react"
import PageLoading from "../../components/PageLoading"
import Login from "../../pages/Auth/Login"

const AuthRoute = () => {
  return (
    <Routes>
        <Route path={Path.main} element={<LoginPage/>} />
        <Route path={Path.login} element={<Suspense fallback={<PageLoading/>}><Login/></Suspense>} />
    </Routes>
  )
}

export default AuthRoute