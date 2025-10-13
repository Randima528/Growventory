import Sidebar from "../components/Sidebar"


const Dashboard = () => {
  return (
    <div className="app-layout">
      <Sidebar activeItem="dashboard" />
      <div className="main-content">Dashboard content add here!</div>
    </div>
  )
}

export default Dashboard
