import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import axios from "axios";
import { Collapse } from "antd";
import { PageHeader, Button, Select, Modal, Transfer } from "antd";
import { useSession } from "next-auth/react";
import ChampionPortrait from "../components/championpool/ChampionPortrait";
import TeamService from "../services/Team.service";
import ChampionPoolService from "../services/ChampionPool.service";

const NoDataComponent = () => {
  return <p className="text-gray-400 text-xs">No data</p>;
};

const { Panel } = Collapse;
const { Option } = Select;

const ChampionPool = () => {
  const { data: session } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState(session.selectedTeamId);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [champions, setChampions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProficiencyLevel, setSelectedProficiencyLevel] =
    useState("Mastery");
  const [masteryProficiencyChampions, setMasteryProficiencyChampions] =
    useState([]);
  const [advancedProficiencyChampions, setAdvancedProficiencyChampions] =
    useState([]);
  const [
    intermediateProficiencyChampions,
    setIntermediateProficiencyChampions,
  ] = useState([]);
  const [beginnerProficiencyChampions, setBeginnerProficiencyChampions] =
    useState([]);

  const [sourceKeys, setSourceKeys] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // Consider fetching proficiency options from backend
  const proficiencyOptions = [
    "Mastery",
    "Advanced",
    "Intermediate",
    "Beginner",
  ];

  const getUsers = async () => {
    const res = await TeamService.getAllUsersByTeamId(selectedTeamId);
    setUsers(res.data);

    if (res.data.length > 0) {
      setSelectedUser(
        JSON.stringify((({ id, name }) => ({ id, name }))(res.data[0]))
      );
    }
  };

  const getSelectedUserChampionPool = async () => {
    const res = await ChampionPoolService.getChampionPoolByUserId(
      session.user.id
    );

    let tempBeginnerProficiencyChampions = [];
    let tempIntermediateProficiencyChampions = [];
    let tempAdvancedProficiencyChampions = [];
    let tempMasteryProficiencyChampions = [];
    res.data.forEach((element) => {
      if (element.proficiencyLevel === "Beginner") {
        tempBeginnerProficiencyChampions.push(element);
      } else if (element.proficiencyLevel === "Intermediate") {
        tempIntermediateProficiencyChampions.push(element);
      } else if (element.proficiencyLevel === "Advanced") {
        tempAdvancedProficiencyChampions.push(element);
      } else if (element.proficiencyLevel === "Mastery") {
        tempMasteryProficiencyChampions.push(element);
      }
    });

    setBeginnerProficiencyChampions(tempBeginnerProficiencyChampions);
    setIntermediateProficiencyChampions(tempIntermediateProficiencyChampions);
    setAdvancedProficiencyChampions(tempAdvancedProficiencyChampions);
    setMasteryProficiencyChampions(tempMasteryProficiencyChampions);
  };

  const getChampions = async () => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/11.20.1/data/en_US/champion.json"
      )
      .then((res) => {
        if (res.data.data) {
          setChampions(res.data.data);
        }
      });
  };

  useEffect(() => {
    getUsers();
    getSelectedUserChampionPool();
    getChampions();
  }, []);

  useEffect(() => {
    setTransferComponentData();
  }, [champions, selectedProficiencyLevel]);

  const setTransferComponentData = () => {
    var championData = [];
    for (var champion in champions) {
      championData.push({
        ...champions[champion],
        key: champions[champion].id,
      });
    }

    let proficiencyChampions = [];
    if (selectedProficiencyLevel === "Beginner") {
      proficiencyChampions = beginnerProficiencyChampions;
    } else if (selectedProficiencyLevel === "Intermediate") {
      proficiencyChampions = intermediateProficiencyChampions;
    } else if (selectedProficiencyLevel === "Advanced") {
      proficiencyChampions = advancedProficiencyChampions;
    } else if (selectedProficiencyLevel === "Mastery") {
      proficiencyChampions = masteryProficiencyChampions;
    }

    championData = championData
      .filter((element) => {
        return !proficiencyChampions
          .filter((a) => a.proficiencyLevel !== selectedProficiencyLevel)
          .map((a) => a.championId)
          .includes(element.id);
      })
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    setSourceKeys(championData);

    const targetKeys = [];
    for (var obj in proficiencyChampions) {
      targetKeys.push(proficiencyChampions[obj].championId);
    }
    setTargetKeys(targetKeys);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProficiencyLevel("Mastery");
  };

  const handleSave = async () => {
    for (let i = 0; i < targetKeys.length; i++) {
      const data = {
        championId: targetKeys[i],
        proficiencyLevel: selectedProficiencyLevel,
        userId: session.user.id,
      };

      const res = await ChampionPoolService.create(data);
      console.log(res);
    }
  };

  const handleProficiencyChange = (value) => {
    setSelectedProficiencyLevel(value);
  };

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // Handles selected champions in modal
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onTransferChange = (nextTargetKeys, direction, moveKeys) => {
    for (let i = 0; i < nextTargetKeys.length; i++) {}
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Dashboard>
      <PageHeader
        title="Champion Pool"
        extra={[
          <Select
            value={selectedUser}
            key="selectUser"
            style={{ width: 120 }}
            onChange={handleUserChange}
          >
            {users.map((user) => {
              return (
                <Option
                  key={user.id}
                  value={JSON.stringify(
                    (({ id, name }) => ({ id, name }))(user)
                  )}
                >
                  {user.name}
                </Option>
              );
            })}
          </Select>,
          <Button key="1" type="primary" onClick={showModal}>
            Edit
          </Button>,
        ]}
      />
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
        <Panel header="Mastery" key="1" className="bg-green-50">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1">
            {masteryProficiencyChampions.length > 0 ? (
              masteryProficiencyChampions.map((item) => {
                return (
                  <ChampionPortrait
                    key={item.championId}
                    championId={item.championId}
                  />
                );
              })
            ) : (
              <NoDataComponent />
            )}
          </div>
        </Panel>
        <Panel header="Advanced" key="2" className="bg-blue-50">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1">
            {advancedProficiencyChampions.length > 0 ? (
              advancedProficiencyChampions.map((item) => {
                return (
                  <ChampionPortrait
                    key={item.championId}
                    championId={item.championId}
                  />
                );
              })
            ) : (
              <NoDataComponent />
            )}
          </div>
        </Panel>
        <Panel header="Intermediate" key="3" className="bg-yellow-50">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1">
            {intermediateProficiencyChampions.length > 0 ? (
              intermediateProficiencyChampions.map((item) => {
                return (
                  <ChampionPortrait
                    key={item.championId}
                    championId={item.championId}
                  />
                );
              })
            ) : (
              <NoDataComponent />
            )}
          </div>
        </Panel>
        <Panel header="Beginner" key="4" className="bg-red-50">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1">
            {beginnerProficiencyChampions.length > 0 ? (
              beginnerProficiencyChampions.map((item) => {
                return (
                  <ChampionPortrait
                    key={item.championId}
                    championId={item.championId}
                  />
                );
              })
            ) : (
              <NoDataComponent />
            )}
          </div>
        </Panel>
      </Collapse>
      <Modal
        title={
          selectedUser
            ? JSON.parse(selectedUser).name + ": Edit Champion Pool"
            : ""
        }
        bodyStyle={{ paddingTop: 0 }}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="flex justify-end my-5">
          <Select
            value={selectedProficiencyLevel}
            key="selectProficiencyLevel"
            style={{
              width: 120,
            }}
            onChange={handleProficiencyChange}
          >
            {proficiencyOptions.map((option) => {
              return (
                <Option key={option} value={option}>
                  {option}
                </Option>
              );
            })}
          </Select>
        </div>
        <Transfer
          dataSource={sourceKeys}
          titles={["Source", selectedProficiencyLevel]}
          listStyle={{ width: "100%", height: "50vh" }}
          showSearch
          showSelectAll={false}
          selectedKeys={selectedKeys}
          onSelectChange={onSelectChange}
          targetKeys={targetKeys}
          onChange={onTransferChange}
          render={(item) => item.name}
        />
      </Modal>
    </Dashboard>
  );
};

ChampionPool.auth = true;
export default ChampionPool;
