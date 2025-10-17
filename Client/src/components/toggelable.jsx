import {useState,forwardRef,useImperativeHandle} from 'react'

const Toggelable=forwardRef((props,refs)=>{
     const [visible,setVisible]=useState(false)
     const hidewhenvisible={display:visible?'none':''}
     const showwhenvisible={display:visible?'':'none'}

     const toggle=()=>{
        setVisible(!visible)
     }
     useImperativeHandle(refs,()=>{
        return {
         toggle
      }
     })
   
   
    return(
      <div>
       <div style={hidewhenvisible}>
          <button onClick={toggle}>{props.buttonLabel}</button>
       </div>
       <div style={showwhenvisible}>
          {props.children}
          <button onClick={toggle}>Cancel</button>
       </div>
       </div>
    )
}
)
export default Toggelable