
import ajax from './ajax'

//development config 
const BASE = 'http://localhost:3000'


//production config 
// const BASE = 'http://localhost:5000'

//Login request
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, "POST")


//Add user request
// export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, "POST")


// get category 
export const reqCategory = (parentId) => ajax(BASE + "/manage/category/list", { parentId })

//add category 
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST")

//update category
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST")