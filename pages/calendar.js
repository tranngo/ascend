import { useState } from "react";
import {
  PageHeader,
  Button,
  Modal,
  Row,
  Col,
  Input,
  DatePicker,
  Checkbox,
} from "antd";
import Dashboard from "../components/dashboard/Dashboard";
import { Calendar as RBCCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import TeamEventService from "../services/TeamEvent.service";

const Events = [
  {
    title: "UCLA Scrim",
    start: new Date(2021, 8, 22),
    end: new Date(2021, 8, 22),
    allDay: false,
  },
];

export async function getServerSideProps() {
  const res = await TeamEventService.getAll();
  let calendarEvents = res.data;
  return {
    props: {
      calendarEvents: calendarEvents,
    },
  };
}

const Calendar = ({ calendarEvents }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState(calendarEvents);

  // Create Calendar Form
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);

  const showModal = () => {
    setIsCreateEventModalOpen(true);
  };

  const handleCreate = async () => {
    const data = {
      title: eventTitle,
      start: startDate.toDate(),
      end: endDate.toDate(),
      allDay: isAllDay,
    };

    await TeamEventService.create(data);
  };

  const handleCancel = () => {
    setEventTitle("");
    setStartDate(null);
    setEndDate(null);
    setIsAllDay(false);
    setIsCreateEventModalOpen(false);
  };

  const calendarFormats = {
    dayHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, "LL", culture),

    agendaDateFormat: (date, culture, localizer) =>
      localizer.format(date, "ddd[,] MMM Do", culture),
  };

  return (
    <Dashboard>
      <PageHeader
        title="Calendar"
        subTitle="Team Schedule"
        extra={[
          // <Button key="3">Operation</Button>,
          // <Button key="2">Operation</Button>,
          <Button key="1" type="primary" onClick={showModal}>
            Create Event
          </Button>,
        ]}
      />
      <RBCCalendar
        localizer={localizer}
        events={events}
        formats={calendarFormats}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh", fontFamily: "Inter" }}
        components={{
          toolbar: CalendarToolbar,
          day: { header: CalendarHeader },
          week: { header: CalendarHeader },
          month: { header: CalendarHeader },
        }}
      />
      <Modal
        title="Create Event"
        visible={isCreateEventModalOpen}
        okText="Create"
        onOk={handleCreate}
        onCancel={handleCancel}
      >
        <Row className="mb-8">
          <Col span={24}>
            <Input
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => {
                setEventTitle(e.target.value);
              }}
              className="w-full"
            />
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            {isAllDay ? (
              <DatePicker
                placeholder="Start Date"
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                disabledDate={(d) => !d || d.isAfter(endDate, "day")}
                format="MMM Do YYYY"
                minuteStep={10}
                className="w-full"
              />
            ) : (
              <DatePicker
                placeholder="Start Date"
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                disabledDate={(d) => !d || d.isAfter(endDate)}
                showTime={{
                  use12Hours: true,
                  format: "hh:mm a",
                  defaultValue: moment("00:00", "HH:mm"),
                }}
                format="MMM Do YYYY, hh:mm a"
                minuteStep={10}
                className="w-full"
              />
            )}
          </Col>
          <Col span={2} className="text-center">
            <span className="leading-32">to</span>
          </Col>
          <Col span={11}>
            {isAllDay ? (
              <DatePicker
                placeholder="End Date"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                disabledDate={(d) => !d || d.isBefore(startDate, "day")}
                format="MMM Do YYYY"
                minuteStep={10}
                className="w-full"
              />
            ) : (
              <DatePicker
                placeholder="End Date"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                disabledDate={(d) => !d || d.isBefore(startDate)}
                showTime={{
                  use12Hours: true,
                  format: "hh:mm a",
                  defaultValue: moment("00:00", "HH:mm"),
                }}
                format="MMM Do YYYY, hh:mm a"
                minuteStep={10}
                className="w-full"
              />
            )}
          </Col>
          <Col span={24}>
            <Checkbox
              checked={isAllDay}
              onChange={(e) => {
                setIsAllDay(e.target.checked);
              }}
            >
              All day
            </Checkbox>
          </Col>
        </Row>
      </Modal>
    </Dashboard>
  );
};

Calendar.auth = true;
export default Calendar;
