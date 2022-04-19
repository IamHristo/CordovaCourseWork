function testFunction() {
    ons.notification.alert("Clicked");
}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);


}

function getPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 10,
        destinationType: Camera.DestinationType.DATA_URL
    });
}


function onSuccess(imageURI) {
    $('#myImage').attr('src', 'data:image/jpeg;base64,' + imageURI);
    $('#myImage').css('display', 'block');
    $('#myImage').show();
}

function onFail(message) {
    alert('Failed because: ' + message);
}

document.addEventListener('show', function(event) {
    ons.ready(function() {
        if (event.target.matches('#battery')) {
            //ons.notification.alert("You are on battery tab.");

            window.addEventListener("batteryStatus", showBatteryStatus, false);

            function showBatteryStatus(status) {
                if (status.level < 20) {
                    ons.notification.toast("Заряд: " + status.level + " Включено зарядно: " + status.isPlugged, { timeout: 1000, animation: 'fall' });
                }
                document.getElementById("batteryStatus").value = status.level;
            }
        }
    });
});