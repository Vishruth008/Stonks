# Stock Trading Simulator

## Overview

Welcome to the Stock Trading Simulator, a cutting-edge web application crafted to offer an engaging and educational experience in stock market investing. With a virtual budget of $100,000, users can navigate the complexities of stock trading using real-time market data. This simulator is an ideal tool for beginners and seasoned investors looking to refine their strategies without the risk of financial loss.

## Key Features

- **Dynamic Stock Charts**: Utilize our advanced, interactive charts to monitor stock performance, trends, and historical data, aiding in strategic decision-making.
- **Portfolio Management**: Efficiently track and manage your investments. Get insights into your portfolio's performance, asset distribution, and more.
- **Real-Time Market Data**: Experience trading with live stock market data, reflecting the pulse of the financial markets.
- **Secure User Authentication**: Enjoy peace of mind with our robust security measures, ensuring your portfolio and personal data remain protected.

## Technology Stack

- **Frontend**: Developed using ReactJS coupled with Material UI, our interface is not only visually appealing but also highly responsive. We utilize React Routing and Hooks for seamless state management.
- **Backend**: The server-side is powered by NodeJS and ExpressJS, handling API requests, user authentication, and efficient data processing.
- **Database**: MongoDB is employed for its flexibility and efficiency in storing user profiles, stock data, and transaction histories.

## Getting Started

### Prerequisites

- Ensure NodeJS is installed on your system. Download it from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository:
    ```
    git clone [repository-url]
    cd [repository-name]
    ```

2. Install server packages:
    ```
    npm install
    ```

3. Install client packages:
    ```
    npm run install-client
    ```
4. Create .env File in backend/config:
   ```
    MONGO_URI=<YOUR_MONGO_DB_API>
    JWT_SECRET=<YOUR_GENERATED_JWT_KEY>
    TIINGO_API_KEY=<YOUR-TIINGO-API-KEY>
    STOCK_API_KEY=<YOUR-FINHUB-API-KEY>
   ```

### Running the Application

1. Start the server:
    ```
    cd backend
    npm run start
    ```

2. In a new terminal, start the client:
    ```
    cd client
    npm run start
    ```

The application should launch in your browser at `http://localhost:3000`. If it doesn't open automatically, navigate to the URL manually.

## Usage

After signing in, the dashboard offers a plethora of tools and features:

- **Stock Charts**: Analyze stock performance and conduct market research.
- **Portfolio Management**: Review and adjust your investments, balancing risk and return.
- **Trade Simulation**: Engage in buying and selling stocks within your budget, getting a feel for market dynamics.

## Advanced Features

- **Market Analysis Tools**: Dive deeper into market trends with our advanced analysis tools, including technical indicators and market news.
- **Investment Strategy Testing**: Test and refine your investment strategies using historical data and market simulations.
- **Community Engagement**: Share insights and learn from other users through our community forum.

  ## Contributors
    - Vishruth Telugu Venugopal
    - Ujwal Chandrashekar
    - Rajeev Ramesh
    - Rakshith Rajkumar

## Support

For support, questions, or feedback, please contact via email or LinkedIn.
