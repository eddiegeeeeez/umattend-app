import { useState, useCallback } from 'react';
import axios from 'axios';

interface ExchangeResult {
  accessToken?: string;
  refreshToken?: string;
  serverMessage?: string;
}

const useExchangeCode = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const exchangeCode = useCallback(async (codeType: 'auth_code' | 'error_code', codeValue: string): Promise<ExchangeResult> => {
    if (!codeValue) return {};

    setIsAuthenticating(true);
    setServerMessage(null);
    setIsError(false);

    try {
      const res = await axios.post('/api/v1/auth/exchange', { [codeType]: codeValue });

      if (codeType === 'error_code') {
        const message = res.data?.message || 'An error occurred during authentication.';

        setIsError(true);
        return { serverMessage: message };
      }

      const access = res.data?.data?.access_token ?? null;
      const refresh = res.data?.data?.refresh_token ?? null;

      setAccessToken(access);
      setRefreshToken(refresh);

      return { accessToken: access, refreshToken: refresh };
    } catch (err: unknown) {
      setIsError(true);

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setServerMessage(message);
      }

      return {};
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  return {
    isAuthenticating,
    accessToken,
    refreshToken,
    isError,
    serverMessage,
    exchangeCode
  };
};

export default useExchangeCode;
