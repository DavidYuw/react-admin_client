
import ajax from './ajax'

const BASE = 'http://localhost:5000'

//Login request
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, "POST")


//Add user request
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, "POST")