const campoRequerido = (valor)=>{
    if(valor.trim()===''){
        return false;
    }else{
        return true;
    }
}

export {campoRequerido};