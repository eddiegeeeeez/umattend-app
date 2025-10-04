import axios from 'axios';

/**
 * Get city, region, and country from IP address
 * @param {string} ip - IP address to lookup
 * @returns {Promise<Object>} Location data with city, region, country
 */

interface LocationTypes {
  ip: string;
  city: string;
  region: string;
  country: string;
}

export const getLocationByIp = async (ip: string): Promise<LocationTypes> => {
  try {
    const cleanIp = ip.replace('::ffff:', '');
    if (cleanIp === '127.0.0.1' || cleanIp === '::1') {
      return {
        ip: cleanIp,
        city: 'Local',
        region: 'Local',
        country: 'Local',
      };
    }

    const response = await axios.get(`http://ip-api.com/json/${cleanIp}`, {
      timeout: 5000,
    });

    if (response.data.status === 'fail') {
      throw new Error(response.data.message);
    }

    return {
      ip: cleanIp,
      city: response.data.city ?? 'Unknown',
      region: response.data.regionName ?? 'Unknown',
      country: response.data.country ?? 'Unknown',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('IP location lookup failed:', error.message);
    }
    return {
      ip: ip,
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
    };
  }
};
