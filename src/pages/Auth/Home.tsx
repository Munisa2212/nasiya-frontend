import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Path } from "../../hooks/Path"

const LoginHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(Path.login)
    }, [])
  return ""
}

export default LoginHome