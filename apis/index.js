import http from "./http.js";
const baseUrl = 'https://dy.gantangerbus.com/dy'; 



//存储登录微信code
export const getBanners = (data) => http.GET(`${baseUrl}/server/b/banners`, data);

//存储登录微信code
export const postWxLogin = (data) => http.POST('https://dy.gantangerbus.com/da/auth/wxLogin', data,{
	loading:false
});

// 储存用户信息
export const postWxUserInfo = (data) => http.POST('https://dy.gantangerbus.com/da/auth/wxUserInfo', data);

// 储存用户手机号
export const postWxBindPhone = (data) => http.POST('https://dy.gantangerbus.com/da/auth/wxBindPhone', data);

// 拼团列表
export const postGroupProducts = (data) => http.POST(`${baseUrl}/server/p/group/products`, data);

// 订单评论
export const postNoImgCommentOn = (data) => http.POST(`${baseUrl}/server/o/noImgCommentOn`, data);

// 订单详情
export const postOrderDetail = (data) => http.POST(`${baseUrl}/server/o/orderDetail`, data);

// 订单支付
export const postWxpay = (data) => http.POST(`${baseUrl}/server/pay/wxpay`, data);

// 订单计算
export const postCalOrderPrice = (data) => http.POST(`${baseUrl}/server/pay/calOrderPrice`, data);

// 优惠券列表
export const postUsableCoupons = (data) => http.POST(`${baseUrl}/server/co/usableCoupons`, data);

// 清空购物车
export const clearShopCar = (data) => http.POST(`${baseUrl}/server/sc/delete/all`, data);

// 门店详情
export const postStore = (data) => http.POST(`${baseUrl}/server/s/storeById`, data);

// 商品列表
export const postProducts = (data) => http.POST(`${baseUrl}/server/p/product`, data);

// 拼团用户列表
export const postGroupBuyUsers = (data) => http.POST(`${baseUrl}/server/g/group/buy/users`, data);

// 评论列表
export const postComments = (data) => http.POST(`${baseUrl}/server/c/comments`, data);

// 好评度
export const postDegree = (data) => http.POST(`${baseUrl}/server/c/praise/degree`, data);

// 搜索商品
export const postSearchProducts= (data) => http.POST(`${baseUrl}/server/p/search/products`, data);

// 附近门店
export const postSelectStores= (data) => http.POST(`${baseUrl}/server/s/select/stores`, data);

// 获取购物车信息
export const postCars= (data) => http.POST(`${baseUrl}/server/sc/find/cart`, data);

// 加入购物车
export const postAddCars= (data) => http.POST(`${baseUrl}/server/sc/add/product`, data);

// 减去购物车
export const postSubCars= (data) => http.POST(`${baseUrl}/server/sc/sub/product`, data);

// 购物车计算
export const postSumCars = (data) => http.POST(`${baseUrl}/server/p/calProductsPrice`, data);

// 商品分类
export const postProductType=(data) => http.POST(`${baseUrl}/server/t/types`, data);

// 热卖商品
export const postHotProduct=(data) => http.POST(`${baseUrl}/server/p/hot/products`, data);

// 门店列表
export const postStoreList=(data) => http.POST(`${baseUrl}/server/s/vicinity/stores`, data);

// 我的订单
export const postMyOrders=(data) => http.POST(`${baseUrl}/server/o/myOrders`, data);

// 我的会员
export const postMyMember=(data) => http.POST(`${baseUrl}/server/m/myMember`, data);

// 我的会员
export const postMyCoupons=(data) => http.POST(`${baseUrl}/server/co/myCoupons`, data);

//会员列表
export const postMembers=(data) => http.POST(`${baseUrl}/server/m/members`, data);


//购买会员
export const postBuyMember=(data) => http.POST(`${baseUrl}/server/m/buyMember`, data);























