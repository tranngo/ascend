import { useEffect, useState } from "react";
import { PageHeader, Button } from "antd";
import { useSession } from "next-auth/react";
import Dashboard from "../components/dashboard/Dashboard";
import UserCard from "../components/team/UserCard";
import TeamService from "../services/Team.service";

const Team = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(session.selectedTeamId);

  const getUsers = async () => {
    const res = await TeamService.getAllUsersByTeamId(selectedTeamId);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Dashboard>
      <PageHeader
        title="Team"
        extra={[
          <Button key="3">Invite</Button>,
          // <Button key="2">OP.GG</Button>,
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </Dashboard>
  );
};

Team.auth = true;
export default Team;
