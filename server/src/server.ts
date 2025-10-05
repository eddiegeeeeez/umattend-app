import './configs/dotenv.config';
import app from './app';
import './cron/cleanupExpiredTokens';
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
