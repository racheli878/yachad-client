import './App.css'
import Header from './components/header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
<>
<h1>app page</h1>
{/* <Header/> */}
<Outlet/>
    </>
  )
}

export default App
