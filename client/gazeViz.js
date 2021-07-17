import * as THREE from './build/three.module.js';

export function highlightGaze(peerUuid) {
    // add colorful frame now
    // var gazedPeer = document.getElementById("remoteVideo_" + peerUuid);
    // if (gazedPeer) {
    //     // gazedPeer.setAttribute('class', 'videoContainerGaze');
    //     // show gaze frame
    //     var gazedFrameImg = document.getElementById("remoteVideo_gazed_" + peerUuid);
    //     gazedFrameImg.style.display = 'block';
    //     var arrow = document.getElementById('remoteVideo_arrow_' + peerUuid);
    //     arrow.style.display = 'none';
    // }

    if (window.webglScene.meshes["remoteVideo_" + peerUuid])
        window.webglScene.meshes["remoteVideo_" + peerUuid].showFrame();
    return;
}

export function shakeGazeSourcer(peerUuid) {
    // rotate the src via z axis from 10 deg to -10 deg continuously    
    if (window.webglScene.meshes["remoteVideo_" + peerUuid])
        window.webglScene.meshes["remoteVideo_" + peerUuid].startShaking();
    return;
}

export function createGazeArrow(srcUuid, dstUuid) {
    // createStaticGazeArrow(srcUuid, dstUuid);
    // animated from the corner
    // assume the layout index should be consistent with the index in window.remoteXXX
    // var fromIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + srcUuid);
    // var toIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + dstUuid);
    // var fromElement = document.getElementById("remoteVideo_" + srcUuid).firstChild.getBoundingClientRect();
    // // var toElement = document.getElementById("remoteVideo_" + dstUuid).firstChild.getBoundingClientRect();
    // var startPos = getCenterCornerFromIndex(fromIndex, fromElement);
    // var arrow = document.getElementById('remoteVideo_arrow_' + srcUuid);
    // arrow.style.display = 'block';
    // arrow.style.zIndex = 2;
    // arrow.style.left = startPos.x.toString() + "px";
    // arrow.style.top = startPos.y.toString() + "px";
    // var angle = getAngleFromIndex(toIndex - fromIndex);
    // // arrow.style.transform = "rotate(" + .toString() + "deg)";
    // $('#remoteVideo_arrow_' + srcUuid).animate({ deg: angle }, {
    //     step: function (now) {
    //         console.log(now);
    //         $('#remoteVideo_arrow_' + srcUuid).css({
    //             transform: 'rotate(' + now + 'deg)'
    //         });
    //     }
    // });
    if (dstUuid == "none") {
        if (window.webglScene.meshes["remoteVideo_" + srcUuid]) {
            window.webglScene.meshes["remoteVideo_" + srcUuid].hideArrow();
            window.webglScene.meshes["remoteVideo_" + srcUuid].hideFrame();
            // console.log("looking at none");
        }
    } else {
        var fromIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + srcUuid);
        var toIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + dstUuid);
        if (toIndex == -1 && window.host && ("remoteVideo_" + dstUuid == window.observeSelf)) {
            // observing target being gazed at
            highlightGaze(srcUuid);
        } else {
            var eulerAngle = getRotateZFromIndex(fromIndex, toIndex);
            // console.log("gaze from " + fromIndex + " to " + toIndex);
            if (window.webglScene.meshes["remoteVideo_" + srcUuid]) {
                window.webglScene.meshes["remoteVideo_" + srcUuid].turnArrow(toIndex > fromIndex ? toIndex - 1 : toIndex);
            }
        }
    }
}

export function turnGazeSourcerToDst(srcUuid, dstUuid) {
    // animated the texture
    // assume the layout index should be consistent with the index in window.remoteXXX
    if (dstUuid == "none") {
        if (window.webglScene.meshes["remoteVideo_" + srcUuid]) {
            window.webglScene.meshes["remoteVideo_" + srcUuid].stopRotating();
            // window.webglScene.meshes["remoteVideo_" + srcUuid].stopShaking();
            // console.log("looking at none");
        }
    } else {
        var fromIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + srcUuid);
        var toIndex = window.remoteIDs.findIndex((element) => element == "remoteVideo_" + dstUuid);
        if (toIndex == -1 && window.host && ("remoteVideo_" + dstUuid == window.observeSelf)) {
            // observing target being gazed at
            shakeGazeSourcer(srcUuid);
        }
        else {
            var quat = getQuaternionAngleFromIndex(fromIndex, toIndex);
            // console.log("gaze from " + fromIndex + " to " + toIndex);
            if (window.webglScene.meshes["remoteVideo_" + srcUuid]) {
                // window.webglScene.meshes["remoteVideo_" + srcUuid].startRotating(eulerAngle);
                window.webglScene.meshes["remoteVideo_" + srcUuid].startRotating(quat);
            }
        }

    }
}


function getCenterCornerFromIndex(index, elem) {
    if (index == 0) {
        // upper left video, should get the lower right corner
        return { x: elem.right + 50, y: elem.bottom };
    }
    else if (index == 1) {
        // upper right video, should get the lower left corner
        return { x: elem.left - 100, y: elem.bottom };
    } else if (index == 2) {
        // lower left video, should get the upper right corner
        return { x: elem.right + 50, y: elem.top };
    } else if (index == 3) {
        // lower right video, should get the upper left corner
        return { x: elem.left - 100, y: elem.top };
    }
}

function getAngleFromIndex(deltaIndex) {
    switch (deltaIndex) {
        case 1:
            //  ->
            return 0;
        case 2:
            // \|/
            return 90;
        case 3:
            // _\|
            return 45;
        case -1:
            // <-
            return 180;
        case -2:
            // /|\
            return -90;
        case -3:
            return -135;
    }
}

function getRotateZFromIndex(fromIndex, toIndex) {
    var deltaIndex = toIndex - fromIndex;
    if (fromIndex % 2 == 0) {
        switch (deltaIndex) {
            case 1:
                //  ->
                return { pos: { x: -0.1, y: (fromIndex <= 1 ? 0.7 : -0.7) }, rotz: 0 };
            case 2:
                // \|/
                return { pos: { x: -1, y: 0.1 }, rotz: -Math.PI / 2 };
            case 3:
                // _\|
                return { pos: { x: -0.1, y: 0.1 }, rotz: -Math.PI / 4 };
            case -1:
                // -/|
                return { pos: { x: -0.1, y: -0.1 }, rotz: Math.PI / 4 };
            case -2:
                // /|\
                return { pos: { x: -1, y: -0.1 }, rotz: Math.PI / 2 };
        }
    } else {
        switch (deltaIndex) {
            case 1:
                //  |/_
                return { pos: { x: 0.1, y: 0.1 }, rotz: 1.25 * Math.PI };
            case 2:
                // \|/
                return { pos: { x: 1, y: 0.1 }, rotz: -Math.PI / 2 };
            case -1:
                // <-
                return { pos: { x: 0.1, y: (fromIndex <= 1 ? 0.7 : -0.7) }, rotz: Math.PI };
            case -2:
                // /|\
                return { pos: { x: 1, y: -0.1 }, rotz: Math.PI / 2 };
            case -3:
                // |\-
                return { pos: { x: 1, y: -0.1 }, rotz: 0.75 * Math.PI };
        }
    }
}

function getEulerAngleFromIndex(fromIndex, toIndex) {
    var deltaIndex = toIndex - fromIndex;
    var maxAngle = 10;
    if (fromIndex % 2 == 0) {
        switch (deltaIndex) {
            case 1:
                //  ->
                return { x: 0, y: maxAngle * Math.PI / 180, z: 0 };
            case 2:
                // \|/
                return { x: maxAngle * Math.PI / 180, y: 0, z: 0 };
            case 3:
                // _\|
                return { x: maxAngle * Math.PI / 180, y: maxAngle * Math.PI / 180, z: 0 };
            case -1:
                // <-
                return { x: 0, y: maxAngle * Math.PI / 180, z: 0 };
            case -2:
                // /|\
                return { x: -maxAngle * Math.PI / 180, y: 0, z: 0 };
            case -3:
                // _\|
                return { x: -maxAngle * Math.PI / 180, y: maxAngle * Math.PI / 180, z: 0 };
        }
    } else {
        switch (deltaIndex) {
            case 1:
                //  |/_
                return { x: maxAngle * Math.PI / 180, y: -maxAngle * Math.PI / 180, z: 0 };
            case 2:
                // \|/
                return { x: maxAngle * Math.PI / 180, y: 0, z: 0 };
            case -1:
                // -/|
                return { x: 0, y: -maxAngle * Math.PI / 180, z: 0 };
            case -2:
                // /|\
                return { x: -maxAngle * Math.PI / 180, y: 0, z: 0 };
            case -3:
                // |\-
                return { x: -maxAngle * Math.PI / 180, y: -maxAngle * Math.PI / 180, z: 0 };
        }
    }
}

function getQuaternionAngleFromIndex(fromIndex, toIndex) {
    // quaternion is made from axis and angle
    var deltaIndex = toIndex - fromIndex;
    var maxAngle = 10;
    var quaternion = new THREE.Quaternion();

    if (fromIndex % 2 == 0) {
        switch (deltaIndex) {
            case 1:
                //  ->
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), maxAngle * Math.PI / 180);
                return quaternion;
            case 2:
                // \|/
                quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), maxAngle * Math.PI / 180);
                return quaternion;
            case 3:
                // _\|
                quaternion.setFromAxisAngle(new THREE.Vector3(0.8, 0.6, 0), maxAngle * Math.PI / 180);
                return quaternion;
            case -1:
                // -/|
                quaternion.setFromAxisAngle(new THREE.Vector3(-0.8, 0.6, 0), maxAngle * Math.PI / 180);
                return quaternion;
            case -2:
                // /|\
                quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -maxAngle * Math.PI / 180);
                return quaternion;
        }
    } else {
        switch (deltaIndex) {
            case 1:
                //  |/_
                quaternion.setFromAxisAngle(new THREE.Vector3(-0.8, 0.6, 0), -maxAngle * Math.PI / 180);
                return quaternion;
            case 2:
                // \|/
                quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), maxAngle * Math.PI / 180);
                return quaternion;
            case -1:
                // <-
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -maxAngle * Math.PI / 180);
                return quaternion;
            case -2:
                // /|\
                quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -maxAngle * Math.PI / 180);
                return quaternion;
            case -3:
                // |\-
                quaternion.setFromAxisAngle(new THREE.Vector3(0.8, 0.6, 0), -maxAngle * Math.PI / 180);
                return quaternion;
        }
    }
}

function createStaticGazeArrow(srcUuid, dstUuid) {
    // draw_line();
    var canvas = document.getElementById("plotting_canvas");
    var context = canvas.getContext('2d');
    context.lineWidth = 3;
    var grd = context.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "blue");
    context.strokeStyle = grd;

    // context.clearRect(0, 0, window.innerWidth, window.outerHeight);
    var fromElement = document.getElementById("remoteVideo_" + srcUuid).firstChild.getBoundingClientRect();
    var toElement = document.getElementById("remoteVideo_" + dstUuid).firstChild.getBoundingClientRect();
    canvas_arrow(context, fromElement, toElement);
    return;
}

// function canvas_arrow(context, fromx, fromy, tox, toy) {
//     var headlen = 10; // length of head in pixels
//     var dx = tox - fromx;
//     var dy = toy - fromy;
//     var angle = Math.atan2(dy, dx);
//     context.beginPath();
//     context.moveTo(fromx, fromy);
//     context.lineTo(tox, toy);
//     // context.stroke();
//     context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
//     // context.stroke();
//     context.moveTo(tox, toy);
//     context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
//     context.stroke();
// }

function angleToPoint(angle, element) {
    // angle [-pi,pi]
    var div = Math.round((angle + Math.PI * 2) / (Math.PI / 4)) % 8;
    // console.log(div, angle, element);
    switch (div) {
        case 0:
            // right side
            return { x: element.right, y: (element.top + element.bottom) / 2 };
        case 1:
            // upper right
            return { x: element.right, y: element.top };
        case 2:
            // top
            return { x: (element.left + element.right) / 2, y: element.top };
        case 3:
            //upper left
            return { x: element.left, y: element.top };
        case 4:
            // left side
            return { x: element.left, y: (element.top + element.bottom) / 2 };
        case 5:
            // lower left
            return { x: element.left, y: element.bottom };
        case 6:
            // bottom
            return { x: (element.left + element.right) / 2, y: element.bottom };
        case 7:
            //lower right
            return { x: element.right, y: element.bottom };
    }
}

function canvas_arrow(context, fromElem, toElem) {
    // get the angle so we know which corner of the element is the one we need
    var fromCenter = { x: (fromElem.left + fromElem.right) / 2, y: (fromElem.top + fromElem.bottom) / 2 };
    var toCenter = { x: (toElem.left + toElem.right) / 2, y: (toElem.top + toElem.bottom) / 2 };
    var headlen = 10; // length of head in pixels
    var dx = toCenter.x - fromCenter.x;
    var dy = toCenter.y - fromCenter.y;
    // console.log(fromElem, toElem);
    var angle = Math.atan2(-dy, dx);
    var fromPT = angleToPoint(angle, fromElem);
    var toPT = angleToPoint((angle + Math.PI) % (Math.PI * 2), toElem);
    // console.log(fromPT, toPT);
    context.beginPath();
    context.moveTo(fromPT.x, fromPT.y);
    context.lineTo(toPT.x, toPT.y);
    context.stroke();
    context.lineTo(toPT.x - headlen * Math.cos(angle - Math.PI / 6), toPT.y + headlen * Math.sin(angle - Math.PI / 6));
    context.stroke();
    context.moveTo(toPT.x, toPT.y);
    context.lineTo(toPT.x - headlen * Math.cos(angle + Math.PI / 6), toPT.y + headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function draw_line(x0, y0, x1, y1) {
    // Calculate "deltas" of the line (difference between two ending points)
    let dx = x1 - x0;
    let dy = y1 - y0;
    // Calculate the line equation based on deltas
    let D = (2 * dy) - dx;
    let y = y0;
    // Draw the line based on arguments provided
    for (let x = x0; x < x1; x++) {
        // Place pixel on the raster display
        pixel(x, y);
        if (D >= 0) {
            y = y + 1;
            D = D - 2 * dx;
        }
        D = D + 2 * dy;
    }
};