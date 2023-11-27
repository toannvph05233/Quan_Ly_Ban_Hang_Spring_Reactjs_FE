import axios from "axios";
const VAITRO_BASE_URL = "http://localhost:8080/api/vai-tro";

const VaiTroService = {
  getALlVaiTro: () => {
    return axios.get(VAITRO_BASE_URL);
  }
};
export default VaiTroService;
