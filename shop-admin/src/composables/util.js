import {ElNotification, ElMessageBox} from 'element-plus'
import nprogress from 'nprogress'

//消息提示
export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = false,
  duration = 2000,
) {
  ElNotification({
    message: message,
    type,
    dangerouslyUseHTMLString,
    duration,
  })
}

export function confirm(
  message,
  title = '提示',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning',
) {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
      message,
      title,
      {
        confirmButtonText,
        cancelButtonText,
        type
      }).then(() => {
      resolve(true)
    }).catch(() => {
      reject(false)
    })
  })
}

export function showModal(
  message,
  title = '提示',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning',
) {
  return ElMessageBox.confirm(
    message,
    title,
    {
      confirmButtonText,
      cancelButtonText,
      type
    })
  // .then(() => {
  //   resolve(true)
  // }).catch(() => {
  //   reject(false)
  // })
}


// //成功提示
// export const success = (msg) => {
//   ElNotification.success({
//     title: '成功',
//     message: msg
//   })
// }
//
// //失败提示
// export const error = (msg) => {
//   ElNotification.error({
//     title: '失败',
//     message: msg
//   })
// }
//
// //警告提示
// export const warning = (msg) => {
//   ElNotification.warning({
//     title: '警告',
//     message: msg
//   })
// }

export function showFullLoading(){
  nprogress.start()
}

export function hideFullLoading(){
  nprogress.done()
}
