import { useState } from "react";
import { Radio } from "antd";
import { Button } from "antd";

const CalendarToolbar = (props) => {
  const [viewState, setViewState] = useState("month");

  function addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  }

  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  const goToDayView = () => {
    props.onView("day");
    setViewState("day");
  };
  const goToWeekView = () => {
    props.onView("week");
    setViewState("week");
  };
  const goToMonthView = () => {
    props.onView("month");
    setViewState("month");
  };
  const goToAgendaView = () => {
    props.onView("agenda");
    setViewState("agenda");
  };

  const goToBack = () => {
    if (viewState === "month") {
      props.onNavigate("prev", addMonths(props.date, -1));
    } else if (viewState === "week") {
      props.onNavigate("prev", addWeeks(props.date, -1));
    } else if (viewState === "day") {
      props.onNavigate("prev", addDays(props.date, -1));
    } else if (viewState === "agenda") {
      props.onNavigate("next", addMonths(props.date, -1));
    }
  };

  const goToNext = () => {
    if (viewState === "month") {
      props.onNavigate("next", addMonths(props.date, +1));
    } else if (viewState === "week") {
      props.onNavigate("next", addWeeks(props.date, +1));
    } else if (viewState === "day") {
      props.onNavigate("next", addDays(props.date, +1));
    } else if (viewState === "agenda") {
      props.onNavigate("next", addMonths(props.date, +1));
    }
  };

  const goToToday = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    props.onNavigate("current");
  };

  return (
    <>
      {/* Mobile Screens */}
      <div className="grid lg:hidden grid grid-cols-1 mb-5">
        <div className="flex justify-center items-center">
          <label className="font-semibold">{props.label}</label>
        </div>
        <div>
          <div className="flex justify-center items-center pt-3">
            <Radio.Group
              value={viewState}
              optionType="button"
              buttonStyle="outline"
            >
              <Radio.Button value="month" onClick={goToMonthView}>
                Month
              </Radio.Button>
              <Radio.Button value="week" onClick={goToWeekView}>
                Week
              </Radio.Button>
              <Radio.Button value="day" onClick={goToDayView}>
                Day
              </Radio.Button>
              <Radio.Button value="agenda" onClick={goToAgendaView}>
                Agenda
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="flex justify-center items-center pt-3">
            <Radio.Group value={{}} optionType="button" buttonStyle="outline">
              <Radio.Button value="month" onClick={goToBack}>
                &#8249;
              </Radio.Button>
              <Radio.Button value="week" onClick={goToToday}>
                Today
              </Radio.Button>
              <Radio.Button value="day" onClick={goToNext}>
                &#8250;
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>

      {/* Medium Screens and Larger */}
      <div className="hidden lg:grid grid-cols-3 mb-5">
        <div className="flex justify-center items-center">
          <Radio.Group value={{}} optionType="button" buttonStyle="outline">
            <Radio.Button value="month" onClick={goToBack}>
              &#8249;
            </Radio.Button>
            <Radio.Button value="week" onClick={goToToday}>
              Today
            </Radio.Button>
            <Radio.Button value="day" onClick={goToNext}>
              &#8250;
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex justify-center items-center">
          <label className="font-semibold">{props.label}</label>
        </div>
        <div className="flex justify-center items-center">
          <Radio.Group
            value={viewState}
            optionType="button"
            buttonStyle="outline"
          >
            <Radio.Button value="month" onClick={goToMonthView}>
              Month
            </Radio.Button>
            <Radio.Button value="week" onClick={goToWeekView}>
              Week
            </Radio.Button>
            <Radio.Button value="day" onClick={goToDayView}>
              Day
            </Radio.Button>
            <Radio.Button value="agenda" onClick={goToAgendaView}>
              Agenda
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default CalendarToolbar;
