import urls from '../consts/urls';

const InfoHandler = async (onFetched, onError)=>{

    // let registeration = await navigator.serviceWorker.getRegistration('/service-worker-custom.js');

    const registeration = await navigator.serviceWorker.register('/service-worker-custom.js', {
        scope: '/'
    });

    // navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    //     serviceWorkerRegistration.pushManager
    //         .subscribe({
    //             userVisibleOnly: true ,
    //             applicationServerKey: urlBase64ToUint8Array(urls.publicKey)
    //         })
    //         .then(function(subscription) {
    //
    //             // The subscription was successful
    //
    //             console.log('success');
    //
    //             // return sendSubscriptionToServer(subscription);
    //         })
    //         .catch(function(e) {
    //             if (Notification.permission === 'denied') {
    //                 // The user denied the notification permission which
    //                 // means we failed to subscribe and the user will need
    //                 // to manually change the notification permission to
    //                 // subscribe to push messages
    //                 // window.Demo.debug.log('Permission for Notifications was denied');
    //                 console.log('Permission for Notifications was denied');
    //
    //             } else {
    //                 // A problem occurred with the subscription, this can
    //                 // often be down to an issue or lack of the gcm_sender_id
    //                 // and / or gcm_user_visible_only
    //                 // window.Demo.debug.log('Unable to subscribe to push.', e);
    //                 console.log('Unable to subscribe to push.');
    //
    //             }
    //         });
    // });


    const subscription = await registeration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(urls.publicKey)
    });

    // console.log(registeration.pushManager.permissionState());

    if (!registeration.pushManager) {
        console.log('push unsupported')
    }


    fetch(urls.getInfo, {
        method:"POST",
        body: JSON.stringify({subscription: subscription}),
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
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default InfoHandler;