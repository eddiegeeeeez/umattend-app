import './configs/dotenv.config';
import app from './app';
import './cron/cleanupExpiredTokens';
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Environment: ${ENV}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
