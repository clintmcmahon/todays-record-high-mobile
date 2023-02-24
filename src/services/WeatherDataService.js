const dataUrl = "https://data.rcc-acis.org/StnData";
const metaUrl = "https://data.rcc-acis.org/StnMeta";

export const getRecords = async (selectedStation, startDate, endDate) => {
  const recordsQuery = {
    sid: selectedStation,
    elems: [
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "pcpn",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "snow",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
    ],
    sDate: "por",
    eDate: "por",
    meta: ["name", "state", "valid_daterange", "sids"],
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(recordsQuery),
  });
  const json = await response.json();

  const records = {
    highTemp: json.smry[0][0][0],
    highDate: json.smry[0][0][1] ? new Date(json.smry[0][0][1]) : "",
    highTempPeriodOfRecord: json.meta.valid_daterange[0],
    lowTemp: json.smry[1][0][0],
    lowDate: json.smry[1][0][1] ? new Date(json.smry[1][0][1]) : "",
    lowTempPeriodOfRecord: json.meta.valid_daterange[1],
    precip: json.smry[2][0][0],
    precipDate: json.smry[2][0][1] ? new Date(json.smry[2][0][1]) : "",
    precipPeriodOfRecord: json.meta.valid_daterange[2],
    snow: json.smry[3][0][0],
    snowDate: json.smry[3][0][1] ? new Date(json.smry[3][0][1]) : "",
    snowPeriodOfRecord: json.meta.valid_daterange[3],
  };

  return records;
};

export const getNormals = async (selectedStation, startDate, endDate) => {
  const normalsQuery = {
    sid: selectedStation,
    sDate: startDate,
    eDate: endDate,
    elems: [
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        normal: "1",
        prec: 0,
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        normal: "1",
        prec: 0,
      },
    ],
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(normalsQuery),
  });

  const json = await response.json();

  return {
    date: json.data[0][0],
    high: json.data[0][1],
    low: json.data[0][2],
  };
};

export const getRecordHighsAndLows = async (selectedStation, shortDate) => {
  const query = {
    sid: selectedStation,
    sdate: "1870-01-01",
    edate: "2023-12-31",
    elems: [
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
          n: 5,
        },
        smry_only: 1,
        groupby: ["year", shortDate, shortDate],
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
          n: 5,
        },
        smry_only: 1,
        groupby: ["year", shortDate, shortDate],
      },
    ],
    meta: ["name", "state", "valid_daterange"],
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(query),
  });

  const data = await response.json();

  let highsData = data.smry[0][0].map((item) => {
    var newDate = new Date(item[1]);
    return { temp: item[0], date: newDate.getFullYear() };
  });

  const highs = {
    labels: highsData.map((record) => record.date),
    datasets: [
      {
        label: "High Temperature",
        data: highsData.map((record) => record.temp),
        backgroundColor: "rgba(231, 8, 8, 0.8)",
      },
    ],
  };

  let lowsData = data.smry[1][0].map((item) => {
    var newDate = new Date(item[1]);
    return { temp: item[0], date: newDate.getFullYear() };
  });

  const lows = {
    labels: lowsData.map((record) => record.date),
    datasets: [
      {
        label: "Low Temperature",
        data: lowsData.map((record) => record.temp),
        backgroundColor: "rgba(8, 17, 231, 0.8)",
      },
    ],
  };

  return { highs, lows };
};

export const getDailyHistory = async (selectedStation, startDate, endDate) => {
  const dailyHistoryQuery = {
    sid: selectedStation,
    elems: [
      {
        name: "maxt",
        interval: [1, 0, 0],
        duration: 1,
      },
      {
        name: "mint",
        interval: [1, 0, 0],
        duration: 1,
      },
      {
        name: "pcpn",
        interval: [1, 0, 0],
        duration: 1,
      },
      {
        name: "snow",
        interval: [1, 0, 0],
        duration: 1,
      },
      {
        name: "snwd",
        interval: [1, 0, 0],
        duration: 1,
      },
    ],
    sDate: startDate,
    eDate: endDate,
    meta: ["name", "state", "valid_daterange", "sids"],
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(dailyHistoryQuery),
  });
  const json = await response.json();

  const dailyHistory = json.data.map((item) => {
    return {
      date: new Date(item[0]).getFullYear(),
      high: item[1],
      low: item[2],
      precip: item[3],
      snow: item[4],
    };
  });

  return dailyHistory.sort((a, b) => b.date - a.date);
};
