function testFunction() {
    ons.notification.alert("Clicked");
}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);
    console.log(device.model);
    console.log(device.platform);
    console.log(device.uuid);
    console.log(device.version);
    console.log(device.manufacturer);

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

document.addEventListener('init', function(event) {
    ons.ready(function() {
        //ons.notification.toast("Test: ", { timeout: 1000, animation: 'fall' });

    });
});

document.addEventListener('show', function(event) {
    ons.ready(function() {
        var page = event.target;
        if (page.matches('#batteryPage')) {
            //ons.notification.alert("You are on battery tab.");

            window.addEventListener("batteryStatus", showBatteryStatus, false);

            function showBatteryStatus(status) {
                if (status.level < 20) {
                    ons.notification.toast("Заряд: " + status.level + " Включено зарядно: " + status.isPlugged, { timeout: 1000, animation: 'fall' });
                }
                document.getElementById("batteryStatus").value = status.level;
            }
        }
        if (page.matches('#settingsPage')) {
            //ons.notification.alert("You are on settings tab.");
            document.getElementById("deviceManufacturer").textContent = "Устройство: " + device.manufacturer;
            document.getElementById("deviceModel").textContent = "Модел: " + device.model;
            document.getElementById("platform").textContent = "Платформа: " + device.platform;
            document.getElementById("platformVersion").textContent = "Версия: " + device.version;

        }
    });
});