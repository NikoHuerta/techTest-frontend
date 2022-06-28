import axios, { AxiosError } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

type ServerError = { message: string };

export const fetchAxios = async (endpoint: string, body: any ='', method: string, params: string='', authToken='') => {
    
    const url = `${ baseUrl }/${ endpoint }`;
    let headers;

    (authToken) ? headers = {'Content-type': 'application/json', 'x-api-key': authToken} : headers = { 'Content-type': 'application/json' }

    try {
        return await axios({
            method,
            headers,
            params,
            url,
            data: JSON.stringify( body ),
        });
    } catch(err){

        if(axios.isAxiosError(err)){
            const serverError = err as AxiosError<ServerError>;
            return {
               hasError: true,
               message: serverError.response?.data.message!
            }
         }
    }
}