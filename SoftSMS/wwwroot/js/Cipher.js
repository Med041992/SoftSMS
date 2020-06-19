//Funciones encargada de iniciar la encripcion
var rsakeyTPCOL;    
function fnInitKey(){
    setMaxDigits(131);
    rsakeyTPCOL = new RSAKeyPair(ExpRSATpCol, "", ModRSATpCol);
}





	    
