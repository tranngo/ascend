import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";

const StepOne = ({ nextStep }) => {
  const validateForm = () => {};

  return (
    <Form layout="vertical" autoComplete="off">
      <Form.Item style={{ marginBottom: 0 }}>
        <div className="flex flex-row justify-between">
          <Form.Item style={{ width: "calc(50% - 8px)" }}>
            <Input placeholder="First Name *" />
          </Form.Item>
          <Form.Item style={{ width: "calc(50% - 8px)" }}>
            <Input placeholder="Last Name *" />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item>
        <Input placeholder="Summoner Name *" />
      </Form.Item>

      <Form.Item className="float-right">
        <Button type="primary" onClick={nextStep}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

const StepTwo = ({ previousStep, nextStep }) => {
  return (
    <Form layout="vertical" autoComplete="off">
      <Form.Item>
        <Input placeholder="Phone number" />
      </Form.Item>

      <Form.Item>
        <Input placeholder="Discord" />
      </Form.Item>

      <Form.Item className="float-right">
        <Button type="default" className="mr-2" onClick={previousStep}>
          Previous
        </Button>
        <Button type="primary" onClick={nextStep}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

const StepThree = ({ previousStep, nextStep }) => {
  const [choice, setChoice] = useState("create");
  const options = [
    { label: "Create", value: "create" },
    { label: "Join", value: "join" },
  ];

  return (
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
          <Input placeholder="Team Name *" />
        </Form.Item>
      )}
      {choice === "join" && (
        <Form.Item>
          <Input placeholder="Invite Code *" />
        </Form.Item>
      )}

      <Form.Item className="float-right">
        <Button type="default" className="mr-2" onClick={previousStep}>
          Previous
        </Button>
        <Button type="primary" onClick={nextStep}>
          Finish
        </Button>
      </Form.Item>
    </Form>
  );
};

const WelcomePage = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [summonerName, setSummonerName] = useState("");

  const stepDescription = [
    "Entering the information below will let your teammates know who you are.",
    "Provide your teammates with your contact information in case they need to reach you.",
    "To use our platform, you must either create or join a team. Don't worry, this step is easy!",
  ];

  const displayMessage = (msg) => {
    message.info(msg);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const checkValidPhone = (phone) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      phone
    );
  };

  useEffect(() => {
    // check if user is on team, if so redirect to home using router.push
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-normal">Welcome</h1>
      <div
        className="rounded border border-gray-300 w-308 p-20"
        style={{ backgroundColor: "#F6F8FA" }}
      >
        <p className="font-medium p-0 m-0">Let's get you set up.</p>
        <p className="text-gray-500 mt-2 mb-5">{stepDescription[step - 1]}</p>
        {step === 1 && <StepOne nextStep={nextStep} />}
        {step === 2 && (
          <StepTwo previousStep={previousStep} nextStep={nextStep} />
        )}
        {step === 3 && (
          <StepThree previousStep={previousStep} nextStep={nextStep} />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
