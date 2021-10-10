import React, { FC } from "react";
import styled, { css } from "styled-components";
import moment, { Moment } from "moment";

interface RowInCellProps {
  justifyContent: string;
  paddingRight?: number;
}

interface CalendarGripProps {
  startDay: Moment;
  currentTime: Moment;
  totalDays: number;
  events: any[];
}

interface CellWrapperProps {
  isWeekend?: boolean;
  isHeader?: boolean;
  isSelectedMonth?: boolean;
}

interface GridWrapperProps {
  isHeader?: boolean;
}

const ShowDayWrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled("ul")`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

const EventItemWrapper = styled("button")`
  position: relative;
  left: -14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
`;

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
  color: ${(props) => (props.isSelectedMonth ? "#DDDDDD" : "#555759")};
`;

const RowInCell = styled.div<RowInCellProps>`
  display: flex;
  flex-direction: column;
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

const CalendarGrid: FC<CalendarGripProps> = ({
  startDay,
  currentTime,
  totalDays,
  events,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const weekendMap = [...Array(7)];
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isWeekend = (day: Moment) => day.day() === 6 || day.day() === 0;
  const isCurrentDay = (day: Moment) => moment().isSame(day, "day");
  const isSelectedMonth = (day: Moment): boolean =>
    currentTime.isSame(day, "month");
  return (
    <>
      <GridWrapper isHeader={true}>
        {weekendMap.map((_, index) => (
          <CellWrapper isHeader={true} isSelectedMonth>
            <RowInCell justifyContent={"flex-end"} paddingRight={1}>
              {moment()
                .day(index + 1)
                .format("ddd")}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysMap.map((dayItem, index) => (
          <CellWrapper
            key={dayItem.unix()}
            isWeekend={isWeekend(dayItem)}
            isSelectedMonth={isSelectedMonth(dayItem)}
          >
            <RowInCell justifyContent={"flex-end"}>
              <ShowDayWrapper>
                <DayWrapper>
                  {isCurrentDay(dayItem) ? (
                      <CurrentDay>{dayItem.format("D")}</CurrentDay>
                  ) : (
                      dayItem.format("D")
                  )}
                </DayWrapper>
              </ShowDayWrapper>
              <EventListWrapper>
                {events
                  .filter(
                    (event) =>
                      event.date >= dayItem.format("X") &&
                      event.date <= dayItem.clone().endOf("day").format("X")
                  )
                  .map((event) => (
                    <li key={event.id}>
                      <EventItemWrapper>{event.title}</EventItemWrapper>
                    </li>
                  ))}
              </EventListWrapper>
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  );
};
export { CalendarGrid };
