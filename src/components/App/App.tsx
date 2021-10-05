import React, { useState } from "react";
import "../App/App.css";
import moment from "moment";
import { CalendarGrid } from "../CalendarGrid";
import { Title } from "../Title";
import { DateSelector } from "../DateSelector";
import styled from "styled-components";

const ShadowWrapper = styled("div")`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");
  const prevMonthSelect = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));
  const todayMonthSelect = () => setToday(moment());
  const nextMonthSelect = () =>
    setToday((prev) => prev.clone().add(1, "month"));

  return (
    <ShadowWrapper>
      <Title />
      <DateSelector
        currentTime={today}
        prevMonthSelect={prevMonthSelect}
        todayMonthSelect={todayMonthSelect}
        nextMonthSelect={nextMonthSelect}
      />
      <CalendarGrid startDay={startDay} />
    </ShadowWrapper>
  );
}

export default App;
