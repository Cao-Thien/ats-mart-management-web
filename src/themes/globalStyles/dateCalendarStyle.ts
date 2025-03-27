const dateCalendar = `
  .MuiPickersCalendarHeader-root {
    justify-content: center;
    .MuiPickersCalendarHeader-labelContainer {
      color: #1853A4;
      margin: 0;
      z-index: 2;
      button {
        display: none;
      }
    }

    .MuiPickersArrowSwitcher-root {
      position: absolute;
      justify-content: space-between;
      width: 100%;
      z-index: 1;
      button {
        color: #1853A4;
      }
    }
  }
`;

export default dateCalendar;
