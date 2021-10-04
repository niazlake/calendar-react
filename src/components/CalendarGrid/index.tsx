import React, { FC } from "react";
import styled from "styled-components";
import { Moment } from "moment";

interface RowProps {
  justifyContent: string;
}

interface CalendarGripProps {
  startDay: Moment;
}

interface CellWrapperProps {
  isWeekend: boolean;
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-columns: repeat(6, 1f);
  grid-gap: 1px;
  background-color: #484848;
`;

const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: 80px;
  background-color: ${(props) => (props.isWeekend ? "#27282A" : "#1e1f21")};
  color: #fff;
`;

const RowInCell = styled.div<RowProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarGrid: FC<CalendarGripProps> = ({ startDay }) => {
  const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isWeekend = (day: Moment) => day.day() === 6 || day.day() === 0;
  return (
    <GridWrapper>
      {daysMap.map((dayItem, index) => (
        <CellWrapper key={index} isWeekend={isWeekend(dayItem)}>
          <RowInCell justifyContent={"flex-end"}>
            <DayWrapper>{dayItem.format("D")}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};
export { CalendarGrid };
