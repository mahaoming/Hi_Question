export const showLoginModal = ()=>{
    uni.showModal({
        title: '提示',
        content: '请先进行用户登录',
        success (res) {
          if (res.confirm) {
            uni.redirectTo({
              url: '/pages/home/index'
            })
          }
        }
      })
}