
export default{
    //1.指令绑定到元素上回立刻执行bind函数，只执行一次
    //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
    //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    bind:function(el,binding){
      console.log(el)
      const dragDom = el.querySelector('.interDrag')
      const dialogHeaderEl = el.querySelector('.interHeader') 
      dialogHeaderEl.style.cssText += ';cursor:move;'//获取原有行内元素属性
      dragDom.style.cssText += ';top:0px;'
      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const getStyle = (function() {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
      })()
      //当鼠标在弹出框头部按下
      dialogHeaderEl.onmousedown = (e) => {

        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
  
        //拖动元素的宽高
        const dragDomWidth = dragDom.offsetWidth 
        const dragDomHeight = dragDom.offsetHeight
        
        //屏幕的宽高
        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight
  
        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
  
        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
  
        // 获取到的值带px 正则匹配替换
        let styL = getStyle(dragDom, 'left')
        let styT = getStyle(dragDom, 'top')
  
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
        } else {
          styL = +styL.replace(/\px/g, '')
          styT = +styT.replace(/\px/g, '')
        }
  
        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY
  
          // 边界处理
          if (-(left) > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }
  
          if (-(top) > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }
  
          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
  
          // emit onDrag event
          // vnode.child.$emit('dragDialog')
        }
  
        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
   
}



