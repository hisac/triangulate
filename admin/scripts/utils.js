///////////////////////////////////////////////////////////////////////////////
//
// Utility functions for the admin page
// 
///////////////////////////////////////////////////////////////////////////////
"use strict";

/****************************************************************************
*
* Function that takes a data object full of hawk data, and returns 2 CSV
* formatted strings--one for each session, and one containing sessionID and
* mark data.
*
* -- Session List --
* 
* SessionID, HawkID, MarkListID, CenterLatitude, CenterLongitude, Diameter
*
* -- Mark List --
*
* MarkListID, DateTaken, Latitude, Longitude, SignalStrength, Azimuth
****************************************************************************/
exports.getCSV = function(data) {
  var sessions = "SessionID, HawkID, pointID, CenterLatitude, CenterLongitude, Diameter\n",
      marks = "pointID, DateTaken, Latitude, Longitude, SignalStrength, Azimuth\n";

  Object.keys(data).forEach(function(key) {
    var session = data[key];

    sessions += session.sessionID + "," +
                session.hawkID    + "," +
                session.sessionID;

    if (session.triCenter) {
      sessions += "," + session.triCenter.lat +
                  "," + session.triCenter.lng +
                  "," + session.triDiameter;
    }

    sessions += "\n";

    // add this session's marks to the CSV string
    if (session.marks) {
      Object.keys(session.marks).forEach(function(mkey) {
        var mark = session.marks[mkey];
        var date = new Date(mark.date).toString().replace(",", "");

        marks += session.sessionID + "," +
                 date              + "," +
                 mark.lat          + "," +
                 mark.lng          + "," +
                 mark.sig          + "," +
                 mark.az           + "\n";
      });
    }

  });


  return { sessions : sessions, marks : marks };
}