
self.addEventListener('push', event => {

    const data = event.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'https://about.canva.com/wp-content/uploads/sites/3/2016/08/Band-Logo.png'
    });
});