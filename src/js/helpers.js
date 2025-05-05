import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

/**
 * Returns a Promise that rejects after a specified time.
 * Prevents hanging requests.
 */
const timeout = s =>
  new Promise((_, reject) =>
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000)
  );

/**
 * Generic AJAX helper for both GET and POST requests.
 * @param {string} url - The endpoint to fetch.
 * @param {Object} [uploadData] - Optional data to POST.
 * @returns {Promise<Object>} - Parsed JSON response.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchOptions = uploadData
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        }
      : undefined;

    const response = await Promise.race([
      fetch(url, fetchOptions),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
