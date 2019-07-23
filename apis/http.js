
function HTTP(obj, config) {
	let defaultConfig = {
		isRes: false,
		loading: false
	}
	config = { ...defaultConfig,
		...config
	}
	// 如果需要显示loading,mask防止点击穿透
	config.loading && uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject) => {
		let options = {
			url: "",
			method: "GET",
			data: {},
			dataType: "json",
			header: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=UTF-8",
				"Authorization":uni.getStorageSync('Authorization')
			},
			success: (res) => {
				config.loading && uni.hideLoading();
				// 状态码为200 
				if (res.statusCode == 200) {
					let data = res.data;
					//自动校验用户是否登录过期
					if (data.code == "-2") {
						// 重新登录
						let backurl = encodeURI("/pages/tabBar/user");
						uni.redirectTo({
							url:'/pages/login/login?back='+backurl 
						})
						return;
					}
					// 返回 data:[]
					else if (data.code == "1") {
							resolve(data || true)
					}  else {
						// uni.showToast({
						// 	title: data.message,
						// 	icon: "none",
						// 	duration: 2000
						// })
						reject(data.message);
					}
				} else {
					reject("HTTP:状态码异常！");
				}
			},fail: (err) => {
				console.log(err);
				uni.hideLoading();
				uni.showToast({
					title: "网络异常，请稍后再试!",
					icon: "none",
				})
				reject("网络异常，请稍后再试!");
			},
			complete: () => {}
		}

		options = { 
			...options,
			...obj
		};
		uni.request(options);
// 		const Authorization = uni.getStorageSync('Authorization');
// 		if (Authorization) options["header"]["Authorization"] = Authorization;
// 		if (options.header.Authorization && options.method) {
			// uni.request(options);
// 		} else {
// 			
// 			uni.showToast({
// 				title: 'HTTP：缺失参数',
// 				icon: "none",
// 				duration: 2000
// 			})
// 		}
	})
}

export default {
	GET(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "GET"
		}, config);
	},
	POST(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "POST"
		}, config);
	}
}
