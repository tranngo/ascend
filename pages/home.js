import Dashboard from "../components/dashboard/Dashboard";
import WelcomeBanner from "../components/WelcomeBanner";

const Home = () => {
  return (
    <Dashboard>
      <WelcomeBanner />
    </Dashboard>
  );
};

Home.auth = true;
export default Home;
