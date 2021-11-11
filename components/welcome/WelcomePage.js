import { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TeamService from "../../services/Team.service";
import { refreshSession } from "../../utils/session";

const WelcomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [choice, setChoice] = useState("create");
  const [teamName, setTeamName] = useState("");
  const options = [
    { label: "Create", value: "create" },
    { label: "Join", value: "join" },
  ];

  const onSubmit = async () => {
    if (choice === "create") {
      const data = {
        name: teamName,
        userId: session.user.id,
      };

      await TeamService.create(data);

      router.push("/home");

      refreshSession();
    } else if (choice === "join") {
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-normal">Welcome</h1>
      <div
        className="rounded border border-gray-300 w-308 p-20"
        style={{ backgroundColor: "#F6F8FA" }}
      >
        <p className="font-medium p-0 m-0">Let's get you set up.</p>
        <p className="text-gray-500 mt-2 mb-5">
          To get started using Ascend, you need to either create or join a team.
          Don't worry, this step is easy! 🚀
        </p>
        <Form layout="vertical" autoComplete="off">
          <Form.Item>
            <Radio.Group
              value={choice}
              onChange={(e) => {
                setChoice(e.target.value);
              }}
              options={options}
              optionType="button"
            />
          </Form.Item>

          {choice === "create" && (
            <Form.Item>
              <Input
                value={teamName}
                placeholder="Team Name"
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Item>
          )}
          {choice === "join" && (
            <Form.Item>
              <Input placeholder="Invite Code" />
            </Form.Item>
          )}
          <Form.Item className="float-right">
            <Button type="primary" onClick={onSubmit}>
              Finish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WelcomePage;
