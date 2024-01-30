import axios from 'axios';
import { token, baseUrl } from './blogs';

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

