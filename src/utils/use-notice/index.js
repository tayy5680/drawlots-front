import { h } from 'vue'
import { ElMessage } from 'element-plus'

/**
 * @param {Object} optionObj 傳入的物件
 * @param {string} optionObj.message 顯示的訊息內容
 * @param {string} optionObj.type 訊息種類 info: 一般, success: 成功, error: 失敗, gpg: 帶有gpg logo樣式
 * @param {string} optionObj.allowDuplicate 允許重複出現
 */
export const useNotice = ({ message = '', type = 'info', allowDuplicate = false }) => {
  // 統計當下顯示數量
  const allTargetClass = 'el-message'
  const allTarget = document.getElementsByClassName(allTargetClass).length
  // 此處間距照感覺排的 沒有考慮內容換行時的狀況
  // todo 目前直接在css寫固定top，未來更新移除後才開始計算此筆秒數
  const offset = document.body.clientHeight - 125 - (allTarget * 130)
  const defaultOption = {
    type: type === 'gpg' ? 'info' : type,
    duration: 3000,
    offset,
    message: h('div', { class: 'new-content' }, [
      h('i', { class: `new-content__icon new-content__icon--${type}` }, ''),
      h('span', { class: 'new-content__text' }, message),
    ]),
  }

  // 尋找當下是否有重複的內容存在 若沒有才顯示
  // 並且type: gpg計為info
  const targetClass = `el-message el-message--${type}`
  const targetHTMLCollection = document.getElementsByClassName(targetClass)
  let isDuplicated = false
  for (const item of targetHTMLCollection) {
    if (item.innerText === message) isDuplicated = true
  }
  if (allowDuplicate || !isDuplicated) return ElMessage(defaultOption)
}
