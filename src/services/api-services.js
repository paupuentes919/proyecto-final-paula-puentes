import axios from 'axios';

const apiURL = process.env.VUE_APP_API_URL;

const api = {  
    // --------------------------- USUARIOS ---------------------------
    crearUsuario: async (usuario) => {
        try {
            let resultado = await axios.post(apiURL + '/users', usuario);
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    traerUsuarios: async() => {
        try {
            let resultado = await axios.get(apiURL + '/users');
            return resultado.data;
        } catch (error) {console.log(error)}
    }, 
    // --------------------------- PRODUCTOS ---------------------------
    traerProductos: async() => {
        try {
            let resultado = await axios.get(apiURL + '/products');
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    eliminarProductos: async(id) => {
        try {
            let resultado = await axios.delete(apiURL + '/products/' + id);
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    actualizarProductos: async(id, updateData) => {
        try {
            let resultado = await axios.put(apiURL + '/products/' + id, updateData);
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    guardarNuevoProducto: async(product) => {
        try {
            let resultado = await axios.post(apiURL + '/products', product);
            return resultado.data;
        } catch (error) {console.log(error)}
    },
    // --------------------------- COMPRAS ---------------------------
    guardarOrdenDeCompra: async (userID, orden) => {
        let precioTotalAcc = orden.reduce((acc, product) => acc + product.total, 0);
        let ordenCreada = {...orden, precioTotalAcc};
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