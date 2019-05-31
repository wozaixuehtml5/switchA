exports.switchA = {
  init(op){
    let {
      id
      ,visitedColor
      ,activeColor
      ,onChange
      ,data
    } = {
      ...{
      id:'root',
      activeColor:'#1D80D1',
      visitedColor:'#8C8C8C',
      data:'value',
      onChange:()=>{}
    },...op}
    let ul = window.document.querySelector(`#${id}`);
    console.log(ul,op)
    let preIterators = function(ele){
      if(ele){
        let pre = ele.previousElementSibling;
        pre && (pre.children[0].style.color=visitedColor);
        pre && preIterators(pre);
      }
    };
    let getValue = function(obj,attr){
      if(attr.constructor === String){
        try{
          return obj.attributes[attr].value;
        }catch(e){
          return null;
        }
      }
      if(attr.constructor === Array){
        return attr.map((v)=>
        obj.attributes[v]?obj.attributes[v].value:null)
      }
      // if(attr.constructor === Object){
      //   return attr.map((v,i)=>
      //   ({[i]:obj.attributes[v]?obj.attributes[v].value:null}))
      // }
      return null;
    };
    let nextIterators = function(ele){
      if(ele){
        let next = ele.nextElementSibling;
        next && (next.children[0].style.color=visitedColor);
        next && nextIterators(next);
      }
    };
    if(ul){
      ul.onclick=function(e){
        if(e.target.tagName=='A'){
          e.target.style.color = activeColor;
          let pr = e.target.parentNode;
          preIterators(pr);
          nextIterators(pr);
        }
        if(e.target.tagName=='LI'){
          let chi = e.target.children[0];
          chi.style.color = activeColor;
          preIterators(e.target);
          nextIterators(e.target);
        }
        onChange(getValue(e.target,data),e);
      };
    }
  }
}