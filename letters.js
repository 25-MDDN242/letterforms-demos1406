const alphabet = {
  "default": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "A": {
    "offsetX": 0,
    "offsetY": 0,
    "numStations": 6,
    "layout": 1, // 1: circle, 2: line, 3: top curve, 4: bottom curve, 5: closed loop
    "size": 100,
    "customStationX": 55,
    "customStationY": 45,
    "customConnectionX": 50,
    "customConnectionY": 0,
    "lineColour": "#ef3423"
  },
  "B": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 9,
    "layout": 1,
    "size": 100,
    "customStationX": -45,
    "customStationY": -140,
    "customConnectionX": -45,
    "customConnectionY": -10,
    "lineColour": "#1f4492"
  },
  "C": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#ffd206"
  },
  "D": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 9,
    "layout": 1,
    "size": 100,
    "customStationX": 50,
    "customStationY": -140,
    "customConnectionX": 50,
    "customConnectionY": 0,
    "lineColour": "#048a35"
  },
  "E": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 7,
    "layout": 1,
    "size": 100,
    "customStationX": -15,
    "customStationY": -5,
    "customConnectionX": 35,
    "customConnectionY": -40,
    "lineColour": "#0fa1d4"
  },
  "F": {
    "offsetX": 0,
    "offsetY": -82,
    "customStationX": 50,
    "customStationY": -50,
    "numStations": 5,
    "size": 125,
    "layout": 3,
    "lineAngle": 90,
    "lineColour": "#ef3423"
  },
  "G": {
    "offsetX": 0,
    "offsetY": 0,
    "numStations": 8,
    "layout": 1,              
    "size": 100,
    "customStationX": 0,
    "customStationY": 115,
    "customConnectionX": 50,
    "customConnectionY": 90,
    "lineColour": "#048a35"
  },
  "H": {
    "offsetX": -30,
    "offsetY": -130,
    "customStationX": 70,
    "customStationY": 175,
    "numStations": 6,
    "size": 175,
    "layout": 2,
    "lineAngle": 90,
    "lineColour": "#F29DB2"
  },
  "I": {
    "offsetX": 0,
    "offsetY": -58,
    "numStations": 5,
    "size": 100,
    "customStationX": 0,
    "customStationY": -50,
    "layout": 2,
    "lineAngle": 90,
    "lineColour": "#0fa1d4"
  },
  "J": {
    "offsetX": 0,
    "offsetY": -40,
    "customStationX": -50,
    "customStationY": 155,
    "numStations": 4,
    "size": 125,
    "layout": 4,
    "lineAngle": 90,
    "lineColour": "#1f4492"
  },
  "K": {
    "offsetX": -30,
    "offsetY": -130,
    "customStationX": 70,
    "customStationY": 0,
    "numStations": 6,
    "size": 175,
    "layout": 2,
    "lineAngle": 90,
    "customConnectionX": 0,
    "customConnectionY": 80,
    "lineColour": "#ffd206"
  },
  "L": {
    "offsetX": 0,
    "offsetY": -130,
    "numStations": 6,
    "size": 175,
    "layout": 2,
    "lineAngle": 90,
    "lineColour": "#ef3423"
  },
  "M": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "N": {
    "offsetX": -45,
    "offsetY": -55,
    "customStationX": 75,
    "customStationY": 100,
    "numStations": 4,
    "size": 100,
    "layout": 3,
    "lineAngle": 90,
    "lineColour": "#ef3423"
  },
  "O": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "P": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 8,
    "layout": 1,
    "size": 100,
    "customStationX": -45,
    "customStationY": 140,
    "customConnectionX": -45,
    "customConnectionY": -10,
    "lineColour": "#1f4492"
  },
  "Q": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 7,
    "layout": 1,
    "size": 100,
    "customStationX": 50,
    "customStationY": 140,
    "customConnectionX": 50,
    "customConnectionY": 0,
    "lineColour": "#0fa1d4"
  },
  "R": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "S": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "T": {
    "offsetX": -10,
    "offsetY": -130,
    "numStations": 5,
    "size": 175,
    "customStationX": 50,
    "customStationY": 85,
    "customConnectionX": 50,
    "customConnectionY": 85,
    "customConnectionX2": 0,
    "customConnectionY2": 85,
    "layout": 2,
    "lineAngle": 90,
    "lineColour": "#1f4492"
  },
  "U": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "V": {
    "offsetX": -45,
    "offsetY": -50,
    "numStations": 4,
    "size": 100,
    "layout": 2,
    "customStationX": 85,
    "customStationY": 0,
    "customConnectionX": 85,
    "customConnectionY": 0,
    "customConnectionX2": 45,
    "customConnectionY2": 90,
    "lineAngle": 65,
    "lineColour": "#ef3423"
  },
  "W": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "X": {
    "offsetX": -45,
    "offsetY": -50,
    "numStations": 5,
    "size": 125,
    "layout": 2,
    "customStationX": 85,
    "customStationY": 0,
    "customConnectionX": 85,
    "customConnectionY": 0,
    "customConnectionX2": 45,
    "customConnectionY2": 45,
    "lineAngle": 45,
    "lineColour": "#0fa1d4"
  },
  "Y": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "Z": {
    "offsetX": 25,
    "offsetY": -50,
    "numStations": 4,
    "size": 100,
    "layout": 2,
    "customStationX": -55,
    "customStationY": 0,
    "customConnectionX": -55,
    "customConnectionY": 0,
    "customConnectionX2": 0,
    "customConnectionY2": 0,
    "lineAngle": 115,
    "lineColour": "#ef3423"
  },
  "0": {
    "offsetX": 0,
    "offsetY": -50,
    "numStations": 7,
    "layout": 1,
    "size": 100,
    "lineColour": "#ffd206"
  },
  "1": {
    "offsetX": 0,
    "offsetY": -125,
    "customStationX": -35,
    "customStationY": 10,
    "customConnectionX": -35,
    "customConnectionY": 10,
    "customConnectionX2": 0,
    "customConnectionY2": 0,
    "numStations": 5,
    "size": 150,
    "layout": 2,
    "lineAngle": 90,
    "lineColour": "#F29DB2"
  },
  "2": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 50,
    "lineColour": "#F29DB2"
  },
  "3": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "4": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "5": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "6": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "7": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "8": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  },
  "9": {
    "offsetX": 0,
    "offsetY": -5,
    "numStations": 5,
    "layout": 1,
    "size": 100,
    "lineColour": "#F29DB2"
  }

}