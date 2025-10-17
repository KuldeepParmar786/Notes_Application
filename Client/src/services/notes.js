import axios from "axios";
const Baseurl = "/api/notes";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(Baseurl, newObject, config);
  return response.data;
};

const getall = async (userId) => {
  const response = await axios.get(Baseurl,{
    params:{userId}
  });
  return response.data;
};

const setNew = async (newObj) => {
  const response = await axios.post(Baseurl, newObj);
  return response.data;
};

const update = async (id, NewNote) => {
  const response = await axios.put(`${Baseurl}/${id}`, NewNote);
  return response.data;
};

const remove = async(id)=>{
    await axios.delete(`${Baseurl}/${id}`)
}

export default { getall, create, update, setToken,remove};
