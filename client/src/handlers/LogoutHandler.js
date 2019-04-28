import urls from '../consts/urls';

const LogoutHandler = (onFetched, onError)=>{

    fetch(urls.logout, {
        method:"POST",
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                onFetched()
                
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور");

            }else{

                onError("خطای شبکه و اتصال به سرور");
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

export default LogoutHandler;