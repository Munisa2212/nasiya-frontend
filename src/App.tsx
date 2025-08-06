
import { useCookies } from "react-cookie"
import Dashboard from "./routes/dashboard/Dashboard"
import AuthRoute from "./routes/auth/AuthRoute"

function App() {
  const [cookies] = useCookies(['token'])
  // return <Dashboard/>
  return cookies.token ? <Dashboard/> : <AuthRoute/>
}

export default App
