import urls from '../consts/urls';

const InfoHandler = (onFetched, onError)=>{

    fetch(urls.getInfo, {
        method:"POST",
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> onFetched(res))
                .catch(err=>{ alert(err); onFetched(res) });
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور");

            }else{

                res.json().then(res=> onError(res.error))
                .catch(err=>{ onError("خطای شبکه و اتصال به سرور") });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

export default InfoHandler;