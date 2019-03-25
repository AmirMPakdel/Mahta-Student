import urls from '../consts/urls';

const AddStudentHandler = (json, onFetched, onError)=>{

    fetch(urls.addStudent, {
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
                .catch(err=>{ onError(res) });
            }
        }).catch(err=>{

            onError("خطای شبکه و اتصال به سرور");
        });
}

export default AddStudentHandler;