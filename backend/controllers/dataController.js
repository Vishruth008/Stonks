const Axios = require("axios");
const data = require("../config/stocksData");

// Get metadata for a specific stock ticker from Tiingo
exports.getStockMetaData = async (req, res) => {
  try {
    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}?token=${process.env.TIINGO_API_KEY}`;
    const response = await Axios.get(url);

    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};

// Get information for a specific stock ticker
exports.getStockInfo = (req, res) => {
  let info;
  data.stockData.forEach((stock) => {
    if (stock.ticker.toLowerCase() === req.params.ticker.toLowerCase()) {
      info = stock;
    }
  });

  if (info) {
    return res.status(200).json({
      status: "success",
      data: info,
    });
  } else {
    return res.status(200).json({
      status: "fail",
    });
  }
};

// Get historical data for a specific stock ticker
exports.getStockHistoricData = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}/prices?startDate=${year}-${month}-${day}&token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);
    const data = response.data;

    const pastMonth = [];

    for (let i = 0; i < 25; i++) {
      pastMonth.push({
        date: data[data.length - 1 - i].date,
        adjClose: data[data.length - 1 - i].adjClose,
      });
    }

    const sixMonthAverages = [];
    let latestMonth = new Date(data[data.length - 1].date).getMonth();
    let index = data.length - 1;

    for (let i = 0; i < 6; i++) {
      let monthAverage = data[index].adjClose;
      let dataPoints = 1;
      index -= 1;
      while (new Date(data[index].date).getMonth() === latestMonth) {
        monthAverage += data[index].adjClose;
        dataPoints += 1;
        index -= 1;
      }

      sixMonthAverages.push({
        value: Math.round((monthAverage / dataPoints + Number.EPSILON) * 100) / 100,
        month: latestMonth,
      });
      latestMonth = new Date(data[index].date).getMonth();
    }

    const pastTwoYears = [];
    for (let i = data.length - 1; i >= 0; i -= 5) {
      pastTwoYears.push({
        date: data[i].date,
        adjClose: Math.round((data[i].adjClose + Number.EPSILON) * 100) / 100,
      });
    }

    sixMonthAverages.reverse();
    pastMonth.reverse();
    pastTwoYears.reverse();

    return res.status(200).json({
      status: "success",
      pastDay: {
        date: data[data.length - 1].date,
        adjClose: data[data.length - 1].adjClose,
        adjOpen: data[data.length - 1].adjOpen,
        adjHigh: data[data.length - 1].adjHigh,
        adjLow: data[data.length - 1].adjLow,
      },
      pastMonth,
      pastTwoYears,
      sixMonthAverages,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "fail",
    });
  }
};

// Generate a random stock ticker and fetch its data
const getRandomTicker = () => {
  const randomIndex = Math.floor(
    Math.random() * Math.floor(data.stockData.length)
  );
  return {
    ticker: data.stockData[randomIndex].ticker,
    name: data.stockData[randomIndex].name,
  };
};

// Get data for a random stock ticker for the past 3 years
exports.getRandomStockData = async (req, res) => {
  try {
    const stock = getRandomTicker();

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const url = `https://api.tiingo.com/tiingo/daily/${stock.ticker}/prices?startDate=${year}-${month}-${day}&token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);

    const data = [];
    for (let i = response.data.length - 1; i >= 0; i -= 5) {
      data.push({
        date: response.data[i].date,
        adjClose: Math.round((response.data[i].adjClose + Number.EPSILON) * 100) / 100,
      });
    }

    data.reverse();

    return res.status(200).json({
      status: "success",
      ticker: stock.ticker,
      name: stock.name,
      data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};
