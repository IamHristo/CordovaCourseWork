function testFunction() {
    ons.notification.alert("Clicked");
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