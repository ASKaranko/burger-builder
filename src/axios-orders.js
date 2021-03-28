import axios from "axios";

const instance = axios.create({
	baseURL: 'https://react-burger-builder-55ec7-default-rtdb.firebaseio.com/',
});

export default instance;