import axios from 'axios' 
const url='http://localhost:3000/api'
export default class api{
    constructor(){}
    static async signup({ userName, email, password }) {
          return await axios.post(`${url}/user`, { userName, email, password });
      }
    static async login({ userName, password }) {
          return await axios.get(`${url}/user/login?userName=${userName}`,{headers:{
            password
          }});
      }
      static async validateToken(token){
        return await axios.get(`${url}/user/validate-token`,{headers:{
          token
        }})
      }
      
}