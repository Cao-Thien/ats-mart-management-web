const scrollBar = `
  // Global scrollbar
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar

  // The entire scrollbar
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    scrollbar-gutter: stable;
    background-color: rgba(0, 26, 64, 0.08);
    //margin-bottom: -0.4rem !important;
    //padding-bottom: 0.4rem !important;
    //margin-right: -0.4rem !important;
    //padding-right: 0.4rem !important;
    //position: absolute;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 26, 64, 0.08);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 26, 64, 0.16);
    border-radius: 0.4rem;
  }

  //// The track (progress bar) of the scrollbar
  //::-webkit-scrollbar-track {
  //  box-shadow: inset 0 0 0.125rem rgba(0, 0, 0, 0.3);
  //}
  //
  //// The draggable scrolling handle
  //::-webkit-scrollbar-thumb {
  //  background-color: darkgrey;
  //  outline: 1px solid slategrey;
  //}

  .Scrollbar-hideX::-webkit-scrollbar {
    width: 0;
  }

  //.Scrollbar-x::-webkit-scrollbar {
  //  height: 0.125rem;
  //}


  .MuiDateCalendar-root: {
    background-color: red;
    .MuiPickersCalendarHeader-root: {
      .MuiPickersCalendarHeader-labelContainer: {},
    },
    .MuiPickersArrowSwitcher-root: {
      position: 'absolute',
    },
  },
`;

export default scrollBar;
