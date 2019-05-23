
let _notice = new Map()
export default class Event {
	static UPDATA_TOKEN_STATIC = 'UPDATA_TOKEN' // 订单列表更新
	// static UPDATA_TOKEN_STATIC = 'UPDATA_ORDER' // 订单列表更新
	/**
	 * 添加注册通知对象方法
	 */
	static addNoticeFun(name, action, that) {
		let hasNotice = this.hasNoticeFun(name)
		if (hasNotice) {
			return false
		}
		this.setNoticeFun(name, that[action])
	}
	/**
	 * 是否有该注册的方法
	 */
	static hasNoticeFun(name) {
		return _notice.has(name)
	}
	/**
	 * 获取注册的方法
	 */
	static getNoticeFun(name) {
		return _notice.get(name)
	}
	/**
	 * 写入注册的方法
	 */
	static setNoticeFun(name, action) {
		console.log(action)
		_notice.set(name, action)
		console.log(_notice, '写入注册的方法')
	}
	/**
	 * 删除注册的方法
	 */
	static removeNoticeFun(name) {
		_notice.delete(name)
	}
	/**
	 * 通知注册的方法
	 */
	static noticeFun(name, inof) {
		let hasNotice = this.hasNoticeFun(name)
		if (!hasNotice) {
			console.warn('您还没有注册该注册通知方法！')
			return false
		}
		let action = this.getNoticeFun(name)
		action(inof)
	}
}