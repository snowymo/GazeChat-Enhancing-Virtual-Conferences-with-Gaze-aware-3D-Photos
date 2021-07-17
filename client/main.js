// import { webgl_resource_load } from './webgl_video.js';

window.onload = function () {
    var vizOptions = {
        8444: "none", 8445: "frame", 8446: "webgl", 8447: "none",
        8600: "none", 8601: "profile", 8602: "photo3d",
    }
    var vizOptions = ["none", "photo3d", "profile", "webgl"];//"frame"
    var eyePortMapping = { "eye.3dvar.com": 8443, "eye0.3dvar.com": 8444, "eye1.3dvar.com": 8445, "eye2.3dvar.com": 8446, "eye3.3dvar.com": 8447, "chat0.3dvar.com": 8600, "chat1.3dvar.com": 8601, "chat2.3dvar.com": 8602 };
    if (window.location.host.includes("3dvar")) {
        window.vizOption = vizOptions[eyePortMapping[window.location.host]];
    } else {
        window.vizOption = vizOptions[window.location.port];
    }
    // using videoStream from webrtc for webgazer to init
    function startWebgazer() {
        console.log("window.vizOption", window.vizOption, "window.profileReady", window.profileReady);
        if (window.vizOption == "profile" && !window.profileReady) {
            setTimeout(startWebgazer, 500);
            return;
        }
        //start the webgazer tracker
        console.log("webgazer.setRegression('ridge')");
        // if(window.localStreamReady){
        webgazer.setRegression('ridge') /* currently must set regression and tracker */
            //.setTracker('clmtrackr')
            .setGazeListener(function (data, clock) {
                //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
                //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
            })
            .begin()
            .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
        // }
        // else{
        //     setTimeout(startWebgazer, 100);
        // }
    }
    // setTimeout(startWebgazer, 100);
    if (window.vizOption != "photo3d") {
        window.webgl_resource_load();
    }
    startWebgazer();

    //Set up the webgazer video feedback.
    var setup = function () {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';

        // // get screen size in inch
        // var dpi_x = document.getElementById('dpi').offsetWidth;
        // // var dpi_y = document.getElementById('dpi').offsetHeight;
        // window.inch_width = screen.width / dpi_x;
        // // var height = screen.height / dpi_y;
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady, 100);
    // reset the frame and arrow
    function resetVideoClass() {
        if (window.peerConnections) {
            for (var eachPeer in window.peerConnections) {
                if (document.getElementById("remoteVideo_" + eachPeer))
                    document.getElementById("remoteVideo_" + eachPeer).setAttribute('class', 'videoContainer');
                var gazedFrameImg = document.getElementById("remoteVideo_gazed_" + eachPeer);
                if (gazedFrameImg)
                    gazedFrameImg.style.display = 'none';
                // stop shaking
                // if (window.vizOption == "webgl") {
                //     if (window.webglScene.meshes["remoteVideo_" + eachPeer])
                //         window.webglScene.meshes["remoteVideo_" + eachPeer].stopShaking();
                // }
            }
            if (window.location.hostname.includes("3dvar")) {
                var canvas = document.getElementById("plotting_canvas");
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, window.innerWidth, window.outerHeight);
            }
        }
        setTimeout(resetVideoClass, 100);
    }
    setTimeout(resetVideoClass, 100);
};

// Kalman Filter defaults to on. Can be toggled by user.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function () {
    webgazer.end();
}


/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart() {
    // show dialog
    var dialog = document.getElementById("help");
    dialog.style.display = 'none';
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    document.getElementById(webgazer.params.videoElementId).style.display = '';
    document.getElementById(webgazer.params.faceOverlayId).style.display = '';
    document.getElementById(webgazer.params.faceFeedbackBoxId).style.display = '';
    PopUpInstruction();
}

function CloseCalib() {
    // webgazer.clearData();
    // hide webgazer windows and show the localVideo window
    // document.getElementById('localVideo').style.display = '';
    if (document.getElementById(webgazer.params.videoElementId)) {
        if (window.vizOption == "none") {
            document.getElementById(webgazer.params.faceFeedbackBoxId).style.display = 'none';
            document.getElementById(webgazer.params.videoElementId).style.display = 'none';
        }

        document.getElementById(webgazer.params.faceOverlayId).style.display = 'none';
        webgazer.params.showFaceFeedbackBox = false;

        // show dialog
        var dialog = document.getElementById("help");
        dialog.style.display = 'none';
    }
    // set flag for webrtc
    window.webgazerReady = true;
    window.start();
    window.muteLocalVideo();
    // maintain such video
    // document.getElementById("webgazerVideoFeed").style.width = "240px";
    // webgazer.showPredictionPoints(false);
}
