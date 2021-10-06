import React, { FC } from "react";
import styled, { css } from "styled-components";
import moment, { Moment } from "moment";

interface RowInCellProps {
  justifyContent: string;
  paddingRight?: number;
}

interface CalendarGripProps {
  startDay: Moment;
}

interface CellWrapperProps {
  isWeekend?: boolean;
  isHeader?: boolean;
}

interface GridWrapperProps {
  isHeader?: boolean;
}

const GridWrapper = styled.div<GridWrapperProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1e1f21" : "#4D4D4D")};
  ${(props) =>
    props.isHeader &&
    css`
      border-bottom: 1px solid #4d4c4d;
    `}
`;

const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
  background-color: ${(props) => (props.isWeekend ? "#27282A" : "#1e1f21")};
  color: #dddddd;
`;

const RowInCell = styled.div<RowInCellProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  ${(props) =>
    props.paddingRight &&
    css`
      padding-right: ${props.paddingRight * 8}px;
    `}
`;

const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentDay = styled("div")`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarGrid: FC<CalendarGripProps> = ({ startDay }) => {
  const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isWeekend = (day: Moment) => day.day() === 6 || day.day() === 0;
  const isCurrentDay = (day: Moment) => moment().isSame(day, "day");
  return (
    <>
      <GridWrapper isHeader={true}>
        {[...Array(7)].map((_, index) => (
          <RowInCell justifyContent={"flex-end"} paddingRight={1}>
            <CellWrapper isHeader={true}>
              {moment()
                .day(index + 1)
                .format("ddd")}
            </CellWrapper>
          </RowInCell>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysMap.map((dayItem, index) => (
          <CellWrapper key={dayItem.unix()} isWeekend={isWeekend(dayItem)}>
            <RowInCell justifyContent={"flex-end"}>
              <DayWrapper>
                {isCurrentDay(dayItem) ? (
                  <CurrentDay>{dayItem.format("D")}</CurrentDay>
                ) : (
                  dayItem.format("D")
                )}
              </DayWrapper>
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  );
};
export { CalendarGrid };
