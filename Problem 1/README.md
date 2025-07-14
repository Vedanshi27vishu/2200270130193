# Stock Price API

Quick Express API for stock price calculations.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create `.env` file:

   ```
   REACT_APP_API_URL=http://localhost:9000
   PORT=9000

   ```

3. Start server:
   ```
   npm server
   ```

## Endpoints

- `GET /stocks/:ticker?minutes=m&aggregation=average` - Get average stock price
- `GET /stockcorrelation?minutes=m&ticker={T1}&ticker={T2}` - Get correlation


   ## Screenshots

   ### Average Stock Price
   ![Stock Price](output/Average%20stock%20price.png)

   ### Correlation 
   ![Correlation Page](output/Correlation.png)
