import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import axios from "axios";
import { Collapse } from "antd";
import { PageHeader, Button, Select, Modal, Transfer } from "antd";
import ChampionPortrait from "../components/championpool/ChampionPortrait";

var data = [
  { id: 0, championId: "MonkeyKing", proficiencyId: 0, userId: 0 },
  { id: 1, championId: "Aatrox", proficiencyId: 3, userId: 0 },
  { id: 2, championId: "Sivir", proficiencyId: 1, userId: 0 },
];

const NoDataComponent = () => {
  return <p className="text-gray-400 text-xs">No data</p>;
};

const { Panel } = Collapse;
const { Option } = Select;

const ChampionPool = () => {
  const [champions, setChampions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [masteryProficiencyChampions, setMasteryProficiencyChampions] =
    useState([{ id: 1, championId: "Aatrox", proficiencyId: 4, userId: 0 }]);
  const [advancedProficiencyChampions, setAdvancedProficiencyChampions] =
    useState([]);
  const [
    intermediateProficiencyChampions,
    setIntermediateProficiencyChampions,
  ] = useState([{ id: 2, championId: "Sivir", proficiencyId: 2, userId: 0 }]);
  const [beginnerProficiencyChampions, setBeginnerProficiencyChampions] =
    useState([
      { id: 0, championId: "MonkeyKing", proficiencyId: 1, userId: 0 },
    ]);

  const [selectedProficiency, setSelectedProficiency] = useState(4);
  const [sourceKeys, setSourceKeys] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // Consider fetching proficiency options from backend
  const proficiencyOptions = [
    { label: "Mastery", value: 4 },
    { label: "Advanced", value: 3 },
    { label: "Intermediate", value: 2 },
    { label: "Beginner", value: 1 },
  ];

  const proficiencyEnums = {
    4: "Mastery",
    3: "Advanced",
    2: "Intermediate",
    1: "Beginner",
  };

  useEffect(() => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/11.20.1/data/en_US/champion.json"
      )
      .then((res) => {
        if (res.data.data) {
          setChampions(res.data.data);

          console.log(res.data.data);

          var championData = [];
          for (var champion in res.data.data) {
            championData.push({
              ...res.data.data[champion],
              key: res.data.data[champion].id,
            });
          }

          championData = championData
            .filter((element) => {
              return !data
                .filter((a) => a.proficiencyId !== 3)
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
          for (var obj in data) {
            targetKeys.push(data[obj].championId);
          }
          setTargetKeys(targetKeys);
        }
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleProficiencyChange(value) {
    setSelectedProficiency(value);
  }

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onTransferChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Dashboard>
      <PageHeader
        title="Champion Pool"
        extra={[
          <Select
            defaultValue="DjangoAD"
            key="10"
            style={{ width: 120 }}
            // onChange={handleChange}
          >
            <Option key="6" value="DjangoAD">
              DjangoAD
            </Option>
            <Option key="2" value="Deamon">
              Deamon
            </Option>
            <Option key="3" value="Meteoryte">
              Meteoryte
            </Option>
            <Option key="4" value="Inferno">
              USC Inferno
            </Option>
            <Option key="5" value="Lynne">
              Lynne
            </Option>
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
        title="DjangoAD: Edit Champion Pool"
        bodyStyle={{ paddingTop: 0 }}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="flex justify-end my-5">
          <Select
            defaultValue="Mastery"
            style={{
              width: 120,
            }}
            onChange={handleProficiencyChange}
          >
            {proficiencyOptions.map((option) => {
              return (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
        </div>
        <Transfer
          dataSource={sourceKeys}
          titles={["Source", proficiencyEnums[selectedProficiency]]}
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
