export { parseTime, formatTime } from '_u/date'

/**
 * 用户头像的占位图标
 *
 */
export function filterUserLazyImg(value) {
  return {
    src: value,
    error: '/img/head.png',
    loading: '/img/loading.gif'
  }
}