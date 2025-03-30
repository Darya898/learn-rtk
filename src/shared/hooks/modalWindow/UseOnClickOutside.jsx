import {useEffect} from "react";

const UseOnClickOutside=(clickOutside,ref)=>{
    useEffect(() => {
        function checkClick(event){
            if(event.target!=ref.current){
                clickOutside();
            }
        }
        document.addEventListener('mousedown',checkClick);
        return ()=>{
            document.removeEventListener('mousedown',checkClick)
        }
    }, []);
    return ;

}
export default UseOnClickOutside;