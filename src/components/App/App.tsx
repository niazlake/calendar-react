import React from "react";
import "../App/App.css";
import moment from "moment";
import { CalendarGrid } from "../CalendarGrid";
import { Header } from "../Header";
import { Monitor } from "../Monitor";

function App() {
  window.moment = moment;
  moment.updateLocale("en", { week: { dow: 1 } });
  const startDay = moment().startOf("month").startOf("week");
  return (
    <div className="App">
      <Header />
      <Monitor />
      <CalendarGrid startDay={startDay} />
    </div>
  );
}

export default App;
