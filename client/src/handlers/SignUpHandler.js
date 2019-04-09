import urls from '../consts/urls';

const SignUpFirstStep = (json, onFetched, onError)=>{

    fetch(urls.signup1, {
        method:"POST",
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                onFetched();
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور")

            }else{

                res.json().then(res=> onError(res.error))
                .catch(err=>{ onError("خطای شبکه و اتصال به سرور") });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

const SignUpLastStep = (json, onFetched, onError)=>{

    fetch(urls.signup2, {
        method:"POST",
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
        .then(res =>{

            if(res.status === 200){
                
                res.json().then(res=> onFetched(res))
                .catch(err=>{ onFetched(res) });
            
            }else if(res.status === 500){

                onError("خطای حاصل از نقص سرور")

            }else{

                res.json().then(res=> onError(res.error))
                .catch(err=>{ onError("خطای شبکه و اتصال به سرور") });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}
export {SignUpFirstStep, SignUpLastStep};