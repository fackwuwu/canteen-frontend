import { Axios } from "../App"

let debug = true;

export const MenuService = {
    getAllMenu : async (params) => {
        try {
            const response = await Axios.get('/menu/', { params });
            if(debug)
                console.log("axios data", response);
            return response.data;
        }catch(err){
            if(debug)
                console.log("axios error", err.response);
            throw err;
        }
    }

}