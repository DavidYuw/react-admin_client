
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

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + "/manage/product/list", { pageNum, pageSize }, "GET")

//搜索产品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName
}, "GET")

//根据分类ID获取分类
export const reqCategoryById = (categoryId) => ajax(BASE + "/manage/category/info", { categoryId }, "GET")

//更新商品状态 对商品进行上架/下架处理
export const reqUpdateStatus = (productId, status) => ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST")


//删除图片
export const reqDeleteImg = (name) => ajax(BASE + "/manage/img/delete", { name }, "POST")

//添加商品
// export const reqAddProduct = (product) => ajax(BASE + "/manage/product/add", product, "POST")
//修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + "/manage/product/update", product, "POST")

// 添加或修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + "/manage/product/" + (product._id ? 'update' : 'add'), product, "POST")

//获取所有角色列表
export const reqRoles = () => ajax(BASE + "/manage/role/list")

//添加角色
export const reqAddRole = (roleName) => ajax(BASE + "/manage/role/add", { roleName }, "POST")
