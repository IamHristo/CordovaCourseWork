function testFunction() {
    ons.notification.alert("Clicked");
}



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(cordova.file);
    console.log(navigator.camera);
    console.log(device.model);
    console.log(device.platform);
    console.log(device.uuid);
    console.log(device.version);
    console.log(device.manufacturer);

    window.addEventListener('filePluginIsReady', function() { console.log('File plugin is ready'); }, false);

    document.getElementById("createFile").addEventListener("click", createFile);
    document.getElementById("writeFile").addEventListener("click", writeFile);
    document.getElementById("readFile").addEventListener("click", readFile);
    document.getElementById("removeFile").addEventListener("click", removeFile);
}



function writeFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', { create: true }, function(fileEntry) {

            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    alert('Write completed.');
                };

                fileWriter.onerror = function(e) {
                    alert('Write failed: ' + e.toString());
                };
                var text = document.getElementById("textareaWrite").value;
                console.log(text);
                var blob = new Blob([text], { type: 'text/plain' });
                fileWriter.write(blob);
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

function readFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', {}, function(fileEntry) {

            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    var txtArea = document.getElementById('textareaRead');
                    txtArea.value = this.result;
                };
                reader.readAsText(file);
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

function removeFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', { create: false }, function(fileEntry) {

            fileEntry.remove(function() {
                alert('File removed.');
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

function createFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', { create: true, exclusive: true }, function(fileEntry) {
            alert('File creation successfull!')
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }

}


function onErrorLoadFs(message) {
    alert('Failed because: ' + message);
}

function getPicture() {
    navigator.camera.getPicture(succeededCameraCallback, failedCameraCallback, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,
        cameraDirection: Camera.Direction.FRONT,
    });
}

function succeededCameraCallback(imageData) {
    $('#myImage').attr('src', 'data:image/jpeg;base64,' + imageData);
    $('#myImage').css('display', 'block');
    $('#myImage').show();
}

function failedCameraCallback(message) {
    alert(message);
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