import axios from 'axios';
import systemConfig from '../config/system';

class productsService {


    getAllRates = (base) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/latest', {
                params: {
                  base,
                  timestamp: new Date().getTime()
                //   symbols: 'USD,GBP,EUR'  
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