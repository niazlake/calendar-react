import React, { FC } from "react";
import styled from "styled-components";
import { Moment } from "moment";

interface DateSelectorProps {
  currentTime: Moment;

  nextMonthSelect(): void;

  todayMonthSelect(): void;

  prevMonthSelect(): void;
}

const DateContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
`;

const CurrentMonthText = styled("span")`
  font-size: 32px;
  margin-right: 8px;
`;
const CurrentYearText = styled(CurrentMonthText)`
  font-weight: bold;
`;

const ButtonWrapper = styled("button")`
  border: unset;
  background-color: #565759;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;
  color: #e6e6e6;
`;

const TodayButton = styled(ButtonWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
`;

const DateSelector: FC<DateSelectorProps> = ({
  currentTime,
  prevMonthSelect,
  todayMonthSelect,
  nextMonthSelect,
}) => (
  <DateContainer>
    <div>
      <CurrentMonthText>
        {currentTime.format("MMMM")}
      </CurrentMonthText>
      <CurrentYearText>{currentTime.format("YYYY")}</CurrentYearText>
    </div>
    <div>
      <ButtonWrapper onClick={prevMonthSelect}>&lt;</ButtonWrapper>
      <TodayButton onClick={todayMonthSelect}>today</TodayButton>
      <ButtonWrapper onClick={nextMonthSelect}>&gt;</ButtonWrapper>
    </div>
  </DateContainer>
);

export { DateSelector };
