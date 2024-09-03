import axios from 'axios';

const BASE_URL = 'http://192.168.0.217:3009/api/objetos';

export const getObjetos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/listarObjetos`);
    return response.data.map(objeto => ({
      id: objeto._id,
      nombre: objeto.nombre,
      descripcion: objeto.descripcion,
      estado: objeto.estado,
      categoria: objeto.categoria,
      urlImagen: objeto.urlImagen,
    }));
  } catch (error) {
    console.error('Error fetching objetos:', error);
    return [];
  }
};
