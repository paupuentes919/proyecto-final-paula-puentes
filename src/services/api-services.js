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
    },
    guardarOrdenDeCompra: async (userID, orden) => {
        let total = orden.reduce((acc, product) => acc + product.total, 0);
        let ordenCreada = {...orden, total};
        try {
            let resultado = await axios.post(apiURL + '/users/' + userID + '/orders', ordenCreada);
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    traerOrdenesCompras: async (userID) => {
        try {
            let resultado = await axios.get(apiURL + '/users/' + userID + '/orders');
            return resultado.data;
        } catch (error) {console.log(error)}
    }
}
export default api