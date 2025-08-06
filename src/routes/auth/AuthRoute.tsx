import { Route, Routes } from "react-router-dom"
import { Path } from "../../hooks/Path"
import { Suspense } from "react"
import PageLoading from "../../components/PageLoading"
import Login from "../../pages/Auth/Login"
import LoginHome from "../../pages/Auth/Home"

const AuthRoute = () => {
  return (
    <Routes>
        <Route path={Path.main} element={<LoginHome/>} />
        <Route path={Path.login} element={<Suspense fallback={<PageLoading/>}><Login/></Suspense>} />
    </Routes>
  )
}

export default AuthRoute