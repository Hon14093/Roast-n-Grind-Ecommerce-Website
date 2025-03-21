const express = require('express');
const app = express();
const paymentRouter = require('./routes/paymentRoutes'); // Import router

const port = process.env.PORT || 5000;

// Middleware toàn cục
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware giả lập xác thực (toàn cục)
app.use((req, res, next) => {
  req.user = { account_id: 'some-account-id' }; // Thay bằng ID thực
  next();
});

// Gắn router
app.use('/', paymentRouter); // Các route trong paymentRouter sẽ bắt đầu từ /

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});