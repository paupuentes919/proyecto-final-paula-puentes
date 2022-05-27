import axios from 'axios';

const apiURL = process.env.VUE_APP_API_URL;

const api = {
    traerProductos: async() => {
        try {
            let resultado = await axios.get(apiURL + '/products');
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    traerUsuarios: async() => {
        try {
            let resultado = await axios.get(apiURL + '/users');
            return resultado.data;
        } catch (error) {console.log(error)}
    }, 
    crearUsuario: async (usuario) => {
        try {
            let resultado = await axios.post(apiURL + '/users', usuario);
            return resultado.data;
        } catch (error) {console.log(error)}
    }
}
export default api