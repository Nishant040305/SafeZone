import Sidebar from "../components/Sidebar/Sidebar";
import DisplayReports from "../components/Home/DisplayReports";
const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <DisplayReports />
    </div>
  );
};

export default Homepage;
