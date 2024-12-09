import API_CONFIG from './config.js';

class RequestService {
    static async makeRequest(endpoint, method = 'GET', data = null) {
        try {
            const url = `${API_CONFIG.BASE_URL}${endpoint}`;
            
            const options = {
                method,
                headers: {
                    'Content-Type': method === 'GET' 
                        ? 'application/json' 
                        : 'application/x-www-form-urlencoded',
                }
            };

            if (method === 'POST' && data) {
                options.body = new URLSearchParams(data);
            } else if (method === 'GET' && data) {
                const params = new URLSearchParams(data);
                const urlWithParams = `${url}?${params}`;
                return await fetch(urlWithParams, options).then(this.handleResponse);
            }

            return await fetch(url, options).then(this.handleResponse);
        } catch (error) {
            console.error('Request failed:', error);
            throw new Error('Network error or service unavailable');
        }
    }

    static async handleResponse(response) {
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }
        return response.json();
    }
}

export default RequestService;