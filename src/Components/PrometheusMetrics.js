import express from 'express';
import promMid from 'express-prometheus-middleware';
const app = express();

const PORT = 9091;
app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.get('/hello', (req, res) => {
    console.log('GET /hello');
    const { name = 'Anon' } = req.query;
    res.json({ message: `Hello, ${name}!` });
  });
  
  app.listen(PORT, () => {
    console.log(`Example api is listening on http://localhost:${PORT}`);
  });