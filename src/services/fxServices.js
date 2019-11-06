import axios from 'axios';
import systemConfig from '../config/system';

class productsService {


    getAllRates = () => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/latest.json', {
                params: {
                  app_id: systemConfig.appID,
                  symbols: 'USD,GBP,EUR'  
                }
            }).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.data);
            });
        });
    };

    /* ---------------------------------------------- */
    /* The Following Methods are for a single Rate */
    /* ---------------------------------------------- */

}

const instance = new productsService();

export default instance;