<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		onBackPress:function(){
			console.log('返回');
		}
	}
	global.isLogin = function(){
	 try{
	  var suid  = uni.getStorageSync('authToken');
	  var srand = uni.getStorageSync('srand');
	 }catch(e){
	  //TODO handle the exception
	 }
	 if(suid == '' || srand == ''){
	  return false;
	 }else{
	  return [suid, srand];
	 }
	}
	//需要登录的页面判断
// 	var res = global.isLogin();
//   if(!res){
//    uni.showModal({
//     title:'请登录',
//     content:"请登录",
//     success:function(){
//      uni.navigateTo({
//       url:"/pages/login"
//      });
//     }
//    })
//   }
</script>

<style lang="scss">
	body {
		background:#f9f9f9;
		font-family: PingFang SC Medium,-apple-system-font,Helvetica Neue,Helvetica,sans-serif;
	}
</style>
