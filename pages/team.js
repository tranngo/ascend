import { PageHeader, Button } from "antd";
import Dashboard from "../components/dashboard/Dashboard";
import UserCard from "../components/team/UserCard";

const Teams = [
  {
    name: "JoeJacko",
    role: "Coach",
    discord: "JoeJacko#8400",
  },
  {
    name: "DjangoAD",
    role: "Top",
    discord: "Trxn#8320",
  },
  {
    name: "Deamon",
    role: "Jungle",
    discord: "BusinessKindred#6119",
  },
  {
    name: "Meteoryte",
    role: "Middle",
    discord: "Eddie#2028",
  },
  {
    name: "USC Inferno",
    role: "ADC",
    discord: "Daimyan Angulo#9356",
  },
  {
    name: "Lynne",
    role: "Support",
    discord: "Lynne#0007",
  },
  {
    name: "WujuSenshi",
    role: "Substitute",
    discord: "WujuSenshi#9092",
  },
];

const Team = () => {
  return (
    <Dashboard>
      <PageHeader
        title="Team"
        subTitle="Team Schedule"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">OP.GG</Button>,
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Teams.map((user) => {
          return <UserCard key={user.name} user={user} />;
        })}
      </div>
    </Dashboard>
  );
};

Team.auth = true;
export default Team;
