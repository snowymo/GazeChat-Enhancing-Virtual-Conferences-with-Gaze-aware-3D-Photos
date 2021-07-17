import * as THREE from './build/three.module.js';
import { EffectComposer } from './postprocessing/EffectComposer.js';
import { RenderPass } from './postprocessing/RenderPass.js';
import { ShaderPass } from './postprocessing/ShaderPass.js';
import { BloomPass } from './postprocessing/BloomPass.js';
import { CopyShader } from './shaders/CopyShader.js';
import { SVGLoader } from './jsm/loaders/SVGLoader.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';

var container;

class WebglVideo {
    constructor(mesh) {
        this.mesh = mesh;
        this.isShaking = 0; // 0 : not shaking, 1 : shake -> rotate, 2: shaking
        this.deltaZAngle = 0.02;
        this.eulerAngle = { x: 0, y: 0, z: 0 };
        this.eulerAnglePerFrame = { x: 0, y: 0, z: 0 };
        this.isRotating = 0; // 0 : not rotating, 1 : rotate -> shake, 2: rotating
        this.text = null;
        this.frameRegular = null;
        this.frameGazed = null;
        this.arrow = [];
        this.tv = null
        this.isArrowTurning = false;

        this.speaking = null;
        this.notspeaking = null;
        this.speakCircle = null;

        this.shakeQuaternionStart = new THREE.Quaternion();
        this.shakeQuaternionStart.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.05);
        this.shakeQuaternionEnd = new THREE.Quaternion();
        this.shakeQuaternionEnd.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -0.05);
        this.shakeQuaternionInter = 0.5;
        this.shakeQuaternionStep = 0.03;
        // this.shakeMatrixStart = new THREE.Matrix4();//Matrix4.makeRotationAxis
        // this.shakeMatrixStart.makeRotationAxis(new THREE.Vector3(0, 0, 1), 0.1);
        // this.shakeMatrixEnd = new THREE.Matrix4();//Matrix4.makeRotationAxis
        // this.shakeMatrixEnd.makeRotationAxis(new THREE.Vector3(0, 0, 1), -0.1);
        // this.shakeDelta = new THREE.Matrix4();
        // this.shakeDelta.makeRotationAxis(new THREE.Vector3(0, 0, 1), 0.02);
        // this.shakeDirection = true;
        // this.rotateQuaternionStart = new THREE.Quaternion();
        // this.shakeQuaternionStart.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.1);
        this.rotateQuaternionEnd = new THREE.Quaternion();

        this.rotateQuaternionInter = 0.5;
        this.rotateQuaternionStep = 0.05;

        this.lastShakeTime = 0;
        this.lastRotateTime = 0;

        this.speakingValue = 0.95;
        this.lastTime = Date.now();
    }
    shake() {
        if (this.isShaking == 2) {
            if (this.shakeQuaternionInter >= 1)
                this.shakeQuaternionStep = -0.05;
            else if (this.shakeQuaternionInter <= 0)
                this.shakeQuaternionStep = 0.05;

            this.shakeQuaternionInter += this.shakeQuaternionStep;
            this.shakeQuaternionInter = this.shakeQuaternionInter > 1 ? 1 : this.shakeQuaternionInter;
            this.shakeQuaternionInter = this.shakeQuaternionInter < 0 ? 0 : this.shakeQuaternionInter;
            // console.log("this.shakeQuatInter", this.shakeQuaternionInter);
            THREE.Quaternion.slerp(this.shakeQuaternionStart, this.shakeQuaternionEnd, this.mesh.quaternion, this.shakeQuaternionInter);
        } else if (this.isShaking == 0) {
            if (this.shakeQuaternionInter > 0.53) {
                this.shakeQuaternionInter -= 0.03;
            } else if (this.shakeQuaternionInter < 0.47) {
                this.shakeQuaternionInter += 0.03;
            } else {
                this.shakeQuaternionInter = 0.5;
            }
            THREE.Quaternion.slerp(this.shakeQuaternionStart, this.shakeQuaternionEnd, this.mesh.quaternion, this.shakeQuaternionInter);
        }
        // console.log("t:", this.shakeQuaternionInter);
    }
    // shake(curTime) {
    //     var smoothStep = this.shakeQuaternionStep;
    //     if (this.lastShakeTime != 0) {
    //         smoothStep = smoothStep > 0 ? (curTime - this.lastShakeTime) / 500 : -(curTime - this.lastShakeTime) / 500;
    //     }
    //     smoothStep = clock.getDelta() / 5;
    //     if (this.isShaking) {
    //         if (this.shakeQuaternionInter >= 0.9)
    //             this.shakeQuaternionStep = -Math.abs(smoothStep);
    //         else if (this.shakeQuaternionInter <= 0.1)
    //             this.shakeQuaternionStep = Math.abs(smoothStep);

    //         this.shakeQuaternionInter += this.shakeQuaternionStep;
    //         this.shakeQuaternionInter = this.shakeQuaternionInter > 1 ? 1 : this.shakeQuaternionInter;
    //         this.shakeQuaternionInter = this.shakeQuaternionInter < 0 ? 0 : this.shakeQuaternionInter;
    //         console.log("shake", this.shakeQuaternionStep, this.shakeQuaternionInter);
    //         THREE.Quaternion.slerp(this.shakeQuaternionStart, this.shakeQuaternionEnd,
    //             this.mesh.quaternion, this.shakeQuaternionInter);
    //     } else {
    //         if (this.shakeQuaternionInter > 0.6) {
    //             this.shakeQuaternionInter -= Math.abs(smoothStep);
    //         } else if (this.shakeQuaternionInter < 0.4) {
    //             this.shakeQuaternionInter += Math.abs(smoothStep);
    //         } else {
    //             this.shakeQuaternionInter = 0.5;
    //         }
    //         THREE.Quaternion.slerp(this.shakeQuaternionStart, this.shakeQuaternionEnd,
    //             this.mesh.quaternion, this.shakeQuaternionInter);
    //     }
    //     // console.log("t:", this.shakeQuaternionInter);
    //     // console.log(curTime - this.lastShakeTime);
    //     this.lastShakeTime = curTime;
    // }
    stopShaking() {
        this.isShaking = 0;
    }
    startShaking() {
        this.isShaking = 2;
        this.isRotating = 1;
    }
    rotate() {
        if (this.isRotating != 1) {

            this.mesh.quaternion.slerp(this.rotateQuaternionEnd, this.rotateQuaternionStep);
            // if (this.rotateQuaternionStep < 0.9)
            //     this.rotateQuaternionStep += 0.05;
        }
    }
    // rotate(curTime) {
    //     var smoothStep = 0.05;
    //     if (this.lastRotateTime != 0) {
    //         smoothStep = smoothStep > 0 ? (curTime - this.lastRotateTime) / 500
    //             : -(curTime - this.lastRotateTime) / 500;
    //     }
    //     if (this.isRotating) {
    //         this.mesh.quaternion.slerp(this.rotateQuaternionEnd, this.rotateQuaternionStep);
    //         if (this.rotateQuaternionStep < 0.9)
    //             this.rotateQuaternionStep += smoothStep;
    //     } else {
    //         this.mesh.quaternion.slerp(this.rotateQuaternionEnd, this.rotateQuaternionStep);
    //         if (this.rotateQuaternionStep < 0.9)
    //             this.rotateQuaternionStep += smoothStep;
    //     }
    //     this.lastRotateTime = curTime;
    // }
    startRotating(quat) {
        if (!quat)
            return;
        if (this.isRotating > 0 || !quat.equals(this.rotateQuaternionEnd)) {
            this.rotateQuaternionEnd = quat;
            this.rotateQuaternionStep = 0.05;
            this.isRotating = 2;
            this.isShaking = 1;
        }
    }
    stopRotating() {
        this.isRotating = 0;
        this.rotateQuaternionEnd = new THREE.Quaternion();
        this.rotateQuaternionStep = 0.03;

    }

    addSpeakingCircle() {
        // add gray circle as volumn viz
        var geometry = new THREE.CircleGeometry(2, 64);
        var grayMaterial = new THREE.MeshBasicMaterial({ color: 0x575757 });
        this.speakCircle = new THREE.Mesh(geometry, grayMaterial);
        this.speakCircle.scale.x = this.speakCircle.scale.y = 0.9;
        this.speakCircle.position.z = -0.01;
        this.mesh.add(this.speakCircle);
    }

    addText(name) {
        var xMid;
        var color = new THREE.Color(0xFFFFFF);;//new THREE.Color(0x006699);
        var matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        });

        var shapes = htrFont.generateShapes(name, 100);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        // make shape ( N.B. edge view not visible )
        this.text = new THREE.Mesh(geometry, matLite);
        this.text.scale.x = -0.002;
        this.text.scale.y = 0.002;
        this.mesh.add(this.text);

        var textCoord = window.webglScene.getCoordinateForText(Object.keys(window.webglScene.meshes).length + (window.vizOption == "profile" ? 1 : 0));
        // this.text.position.x = textCoord.x;
        this.text.position.y = textCoord.y;
        this.text.position.z = 0.02;

        // microphone icon
        var geo2 = new THREE.PlaneBufferGeometry(4, 3);
        this.speakingMaterial = new THREE.Mesh(geo2, window.speakingMaterial.clone());
        this.speakingMaterial.scale.x = 0;

        this.notspeakingMaterial = new THREE.Mesh(geo2, window.notspeakingMaterial.clone());


        this.speakingMaterial.position.x = xMid * 0.003;//-name.length * 0.05;
        this.speakingMaterial.position.y = textCoord.y + 0.07;
        this.speakingMaterial.position.z = 0.02;
        this.notspeakingMaterial.position.x = xMid * 0.003;//-name.length * 0.05;
        this.notspeakingMaterial.position.y = textCoord.y + 0.07;
        this.notspeakingMaterial.position.z = 0.02;
        this.notspeakingMaterial.scale.x =
            this.notspeakingMaterial.scale.y =
            this.speakingMaterial.scale.y = 0.1;

        this.mesh.add(this.speakingMaterial);
        this.mesh.add(this.notspeakingMaterial);
    }
    toggleSpeakingIcon(val) {
        if (val) {
            this.notspeakingMaterial.scale.x = 0;
            this.speakingMaterial.scale.x = this.speakingMaterial.scale.y;
        } else {
            this.speakingMaterial.scale.x = 0;
            this.notspeakingMaterial.scale.x = this.speakingMaterial.scale.y;
        }
    }

    adjustSpeakingCircle(val) {
        var f = 0.25;
        var t = 1 - Math.pow(f, (Date.now() - this.lastTime) / 1000);
        t = 0.5;
        // console.log((Date.now() - this.lastTime) / 1000, t);
        this.lastTime = Date.now();
        if (val > 0.02 && this.speakCircle) {
            this.speakingValue = this.speakingValue + (Math.max(1.17, (0.5 * val - 0.02) * 2 + 0.95) - this.speakingValue) * t;
        } else {
            this.speakingValue = this.speakingValue + (0.95 - this.speakingValue) * t;
        }
        this.speakCircle.scale.x = this.speakCircle.scale.y = this.speakingValue;
    }
    initArrows(index, frame) {
        // get the index of current mesh
        var selfIndex = window.remoteIDs.indexOf(this.mesh.name);
        var deltaIndex = index - selfIndex;
        var offsetX = 2.55;
        var offsetY = 2.06;
        if (selfIndex % 2 == 0) {
            switch (deltaIndex) {
                case 1:
                    //  ->
                    frame.position.x = -offsetX;
                    frame.position.y = 0;
                    break;
                case 2:
                    // \|/
                    frame.position.x = 0;
                    frame.position.y = -offsetY;
                    frame.rotation.z = Math.PI / 2;
                    break;
                case 3:
                    // _\|
                    frame.position.x = -offsetX;
                    frame.position.y = -offsetY;
                    frame.rotation.z = Math.PI / 4;
                    break;
                case -1:
                    // -/|
                    frame.position.x = -offsetX;
                    frame.position.y = offsetY;
                    frame.rotation.z = -Math.PI / 4;
                    break;
                case -2:
                    // /|\
                    frame.position.x = 0;
                    frame.position.y = offsetY;
                    frame.rotation.z = -Math.PI / 2;
                    break;
            }
        } else {
            switch (deltaIndex) {
                case 1:
                    //  |/_
                    frame.position.x = offsetX;
                    frame.position.y = -offsetY;
                    frame.rotation.z = Math.PI / 4 * 3;
                    break;
                case 2:
                    // \|/
                    frame.position.y = -offsetY;
                    frame.rotation.z = Math.PI / 2;
                    break;
                case -1:
                    // <-
                    frame.position.x = offsetX;
                    frame.position.y = 0;
                    frame.rotation.z = -Math.PI;
                    break;
                case -2:
                    // /|\
                    frame.position.x = 0;
                    frame.position.y = offsetY;
                    frame.rotation.z = -Math.PI / 2;
                    break;
                case -3:
                    // |\-
                    frame.position.x = offsetX;
                    frame.position.y = offsetY;
                    frame.rotation.z = -Math.PI / 4 * 3;
                    break;
            }
        }
        frame.rotation.z += Math.PI;
        if (frame.rotation.z >= Math.PI * 2)
            frame.rotation.z -= Math.PI * 2;
    }
    addFrame(frame, type) {
        if (type == "regular") {
            this.frameRegular = frame;
            this.frameRegular.scale.x = -1.35;
            this.frameRegular.scale.y = 1.35;
            // this.frameRegular.position.x = this.mesh.position.x;
            // this.frameRegular.position.y = this.mesh.position.y;
            this.frameRegular.position.z = 0.01;
            this.mesh.add(this.frameRegular);
        } else if (type == "gazed") {
            this.frameGazed = frame;
            this.frameGazed.scale.x = -1.35;
            this.frameGazed.scale.y = 1.35;
            // this.frameGazed.position.x = this.mesh.position.x;
            // this.frameGazed.position.y = this.mesh.position.y;
            this.frameGazed.position.z = 0.01;
            this.frameGazed.material.transparent = true;
            this.frameGazed.material.opacity = 0;
            // this.frameGazed.scale.x = 0;
            this.mesh.add(this.frameGazed);
        } else if (type.includes("arrow")) {
            // this.arrow.position.x = this.mesh.position.x;
            // this.arrow.position.y = this.mesh.position.y;
            frame.position.z = 0.01;
            frame.scale.x = 0.1;
            frame.scale.y = 0.1;
            // enable transparency
            frame.material.transparent = true;
            // set opacity to 50%
            frame.material.opacity = 0;
            var arrowIndex = parseInt(type[type.length - 1]);
            var selfIndex = window.remoteIDs.indexOf(this.mesh.name);
            var dstIndex = arrowIndex > selfIndex ? arrowIndex : arrowIndex - 1;
            this.initArrows(dstIndex, frame);
            // deciding the position and orientation for the arrows
            this.mesh.add(frame);
            this.arrow.push(frame);
            // todo position
        } else if (type == "tv") {
            this.tv = frame;
            this.tv.scale.x = -0.068;
            this.tv.scale.y = 0.094;
            this.tv.scale.z = 0.1;
            // this.tv.position.x = this.mesh.position.x;
            // this.tv.position.y = this.mesh.position.y;
            this.tv.position.z = - 0.221;
            this.mesh.add(this.tv);
        }
    }

    updateArrows() {
        for (var arrowIndex = 1; arrowIndex <= 3; arrowIndex++) {
            var curArrow = this.mesh.getObjectByName(this.mesh.name + "_frame_arrow" + arrowIndex.toString());
            if (curArrow) {
                // update the arrow's position and rotation
                var selfIndex = window.remoteIDs.indexOf(this.mesh.name);
                var dstIndex = arrowIndex > selfIndex ? arrowIndex : arrowIndex - 1;
                this.initArrows(dstIndex, curArrow);
            }
        }
    }

    showFrame() {
        // this.frameGazed.scale.x = this.frameGazed.scale.y;
        this.frameGazed.material.opacity = Math.min(1, this.frameGazed.material.opacity + 0.1);
        this.hideArrow();
    }
    hideFrame() {
        // this.frameGazed.scale.x = 0;
        this.frameGazed.material.opacity = Math.max(0, this.frameGazed.material.opacity - 0.1);
    }
    // startTurnArrow(){
    //     this.isArrowTurning = true;
    // }
    // stopTurnArrow(){
    //     this.isArrowTurning = false;
    // }
    turnArrow(toIndex) {
        // manipualte the transparency for each arrow
        // this.arrow.position.x = pos.x;
        // this.arrow.position.y = pos.y;
        // this.arrow.rotation.z = rotz;
        // this.arrow.scale.x = this.arrow.scale.y;
        this.arrow.forEach(
            (element, index) => {
                if (index == toIndex) {
                    // fade in
                    element.material.opacity += 0.1;
                    element.material.opacity = Math.min(1, element.material.opacity);
                } else {
                    // fade out
                    element.material.opacity -= 0.1;
                    element.material.opacity = Math.max(0, element.material.opacity);
                }
            }
        );

        // this.frameGazed.scale.x = 0;
        this.frameGazed.material.opacity = Math.max(0, this.frameGazed.material.opacity - 0.1);
    }
    hideArrow() {
        this.arrow.forEach(
            (element) => {
                // fade out
                element.material.opacity -= 0.1;
                element.material.opacity = Math.max(0, element.material.opacity);

            }
        );
    }
}

class WebglScene {
    constructor(scene, camera, renderer, width = window.innerWidth, height = window.innerHeight) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.width = width;
        this.height = height;
        this.meshes = {};
        this.hosttext = null;
    }
    addMesh(mesh, peerID, name) {
        var webglVideo = new WebglVideo(mesh);
        if (window.vizOption != "none")
            webglVideo.addSpeakingCircle();
        webglVideo.addText(name);

        this.meshes[peerID] = webglVideo;
        mesh.name = peerID;

        // prepare mesh
        // profile img
        // creating ...
        //profile is a renderable object, plane image
        // how to render an image through webgl
        // mesh.add(profile_plane);

        this.scene.add(mesh);
        webglVideo.text.name = peerID + "_text";
        // this.scene.add(webglVideo.text);
    }

    addFrame(frame, peerID, type) {
        this.meshes[peerID].addFrame(frame, type);
        frame.name = peerID + "_frame_" + type;
        // this.scene.add(frame);
    }

    addTV(obj, peerID) {
        this.meshes[peerID].addFrame(obj, "tv");
        obj.name = peerID + "_frame_tv";
        // this.scene.add(obj);
        webgl_animate();
    }

    removeMesh(peerID) {
        if (peerID in this.meshes) {
            var themesh = this.scene.getObjectByName(peerID);
            if (themesh) {
                themesh.scale.x = 0;
                themesh.position.x = 100;
                themesh.geometry.dispose();
                themesh.material.dispose();
                this.scene.remove(themesh);
            }
            delete this.meshes[peerID];
        }
        // delete this.meshes[peerID];
        // var themesh = this.scene.getObjectByName(peerID);
        // this.scene.remove(themesh);
        // var thetext = this.scene.getObjectByName(peerID + "_text");
        // this.scene.remove(thetext);
        // // 
        // var theFrame = this.scene.getObjectByName(peerID + "_frame_regular");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        // theFrame = this.scene.getObjectByName(peerID + "_frame_gazed");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        // theFrame = this.scene.getObjectByName(peerID + "_frame_arrow1");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        // theFrame = this.scene.getObjectByName(peerID + "_frame_arrow2");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        // theFrame = this.scene.getObjectByName(peerID + "_frame_arrow3");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        // theFrame = this.scene.getObjectByName(peerID + "_frame_tv");
        // if (theFrame)
        //     this.scene.remove(theFrame);
        webgl_animate();
    }

    hideMesh(peerID) {
        if (peerID in this.meshes) {
            var themesh = this.scene.getObjectByName(peerID);
            if (themesh) {
                themesh.scale.x = 0;
                themesh.scale.y = 0;
            }
        }
        webgl_animate();
    }

    // observe
    observe(displayName) {
        var thetext = this.scene.getObjectByName("observeText");
        if (thetext) {
            this.scene.remove(thetext);
        }

        // render the text of "observing xxx"
        var xMid;
        var shapes = htrFont.generateShapes("observing " + displayName, 100);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0)
        var color = new THREE.Color(0xFFFFFF);;//new THREE.Color(0x006699);;
        var matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        });
        // make shape ( N.B. edge view not visible )
        this.hosttext = new THREE.Mesh(geometry, matLite);

        this.hosttext.name = "observeText";
        this.scene.add(this.hosttext);
        this.hosttext.scale.x = 0.001;
        this.hosttext.scale.y = 0.001;
        // this.mesh.add(this.text);
        // var textCoord = window.webglScene.getCoordinateForText(Object.keys(window.webglScene.meshes).length);
        // this.text.position.x = textCoord.x;
        this.hosttext.position.y = 3.6;
        this.hosttext.position.z = 0.02;
        webgl_animate();
    }

    updatePlacement() {
        // reorg the meshes position according to window.remoteIDs
        // if (Object.keys(window.webglScene.meshes).length == 1) {
        //     var fullPeerID = window.remoteIDs[0];
        //     if (fullPeerID in this.meshes) {
        //         this.meshes[fullPeerID].mesh.scale.x = -1;
        //         this.meshes[fullPeerID].mesh.scale.y = 1;
        //         this.meshes[fullPeerID].mesh.position.x = 0;
        //         this.meshes[fullPeerID].mesh.position.y = 0;
        //         // this.meshes[fullPeerID].mesh.position.z = 0;

        //         this.meshes[fullPeerID].text.position.x = 0;
        //         this.meshes[fullPeerID].text.position.y = -1.6;

        //         this.meshes[fullPeerID].speakingMaterial.position.y = -1.6 + 0.07;
        //         this.meshes[fullPeerID].notspeakingMaterial.position.y = -1.6 + 0.07;

        //         if (this.meshes[fullPeerID].frameRegular) {
        //             this.meshes[fullPeerID].frameRegular.scale.x = -1.35;
        //             this.meshes[fullPeerID].frameRegular.scale.y
        //                 = 1.35;
        //             this.meshes[fullPeerID].updateArrows();
        //         }
        //         this.meshes[fullPeerID].stopRotating();
        //         this.meshes[fullPeerID].stopShaking();
        //     }
        // } else {
        var index = 0;
        for (const [fullPeerID, curMesh] of Object.entries(window.webglScene.meshes)) {
            //         console.log(fullPeerID, curMesh);
            //       }
            // for (var i = 0; i < Object.keys(window.webglScene.meshes).length; i++) {
            //     // re-place the mesh, text, frame, gazedFrame, and arrow
            //     var fullPeerID = window.remoteIDs[i];
            //     if (!(fullPeerID in this.meshes)) {
            //         // contains self
            //         fullPeerID = "remoteVideo_" + window.localUuid;
            //     }
            if (fullPeerID in this.meshes) {
                this.meshes[fullPeerID].mesh.scale.x = -0.4;
                this.meshes[fullPeerID].mesh.scale.y = 0.4;
                var meshCoord = this.getCoordinateForMesh(index);
                this.meshes[fullPeerID].mesh.position.x = meshCoord.x;
                this.meshes[fullPeerID].mesh.position.y = meshCoord.y;

                var textCoord = this.getCoordinateForText(index);
                this.meshes[fullPeerID].text.position.x = textCoord.x;
                this.meshes[fullPeerID].text.position.y = textCoord.y;
                this.meshes[fullPeerID].speakingMaterial.position.y = textCoord.y + 0.07;
                this.meshes[fullPeerID].notspeakingMaterial.position.y = textCoord.y + 0.07;
                if (this.meshes[fullPeerID].frameRegular) {
                    this.meshes[fullPeerID].frameRegular.scale.x = -1.35;
                    this.meshes[fullPeerID].frameRegular.scale.y = 1.35;
                    this.meshes[fullPeerID].updateArrows();
                }
                this.meshes[fullPeerID].stopRotating();
                this.meshes[fullPeerID].stopShaking();
                index = index + 1;
            }

        }
        // }
        webgl_animate();
    }
    getCoordinateForMesh(index) {
        var offsetX = 1.5;
        var offsetY = 1.1;
        switch (index) {
            case 0:
                // return { x: 0, y: 0, scale: 1 };
                return { x: -offsetX, y: offsetY, scale: 0.4 };
            case 1:
                // update the first scale
                // var fullPeerID = window.remoteIDs[0];
                // if (!(fullPeerID in this.meshes)) {
                //     // contains self
                //     fullPeerID = "remoteVideo_" + window.localUuid;
                // }
                // this.meshes[fullPeerID].mesh.scale.x = -0.4;
                // this.meshes[fullPeerID].mesh.scale.y = 0.4;
                // this.meshes[fullPeerID].mesh.position.x = -offsetX;
                // this.meshes[fullPeerID].mesh.position.y = offsetY;
                // var themesh = this.meshes[fullPeerID].mesh;

                // if (this.meshes[fullPeerID].frameRegular) {
                //     this.meshes[fullPeerID].frameGazed.scale.x = 0;
                //     this.meshes[fullPeerID].frameRegular.scale.x
                //         // = this.meshes[fullPeerID].frameGazed.scale.x
                //         = this.meshes[fullPeerID].frameRegular.scale.y
                //         = this.meshes[fullPeerID].frameGazed.scale.y
                //         = 0.4 * 1.35;                    
                // }
                return { x: offsetX, y: offsetY, scale: 0.4 };

            case 2:
                return { x: -offsetX, y: -offsetY, scale: 0.4 };
            case 3:
                return { x: offsetX, y: -offsetY, scale: 0.4 };
            default:
                console.log("too many videos");
                return { x: 0, y: 0, scale: 0.3 };
        }
    }
    getCoordinateForText(index) {
        var texty = 1.35;
        switch (window.vizOption) {
            case "webgl":
                texty = 1.53;
                break;
            case "profile":
                texty = 2.2;
                break;
            default:
                break;
        }
        // var texty = window.vizOption == "webgl" ? 1.53 : 1.35;
        // switch (index) {
        //     case 0:
        //         return { x: 0, y: texty };
        //     case 1:
        //         // update the text pos
        //         // this.meshes[window.remoteIDs[0]].text.position.x = -1;
        //         // for (var mesh in this.meshes) {
        //         //     mesh.text.position.y = texty;
        //         //     mesh.notspeakingMaterial.position.y = texty + 0.07;
        //         //     mesh.speakingMaterial.position.y = texty + 0.07;
        //         // }
        //         // this.meshes[window.remoteIDs[0]].text.position.y = texty;
        //         // this.meshes[window.remoteIDs[0]].notspeakingMaterial.position.y = texty + 0.07;
        //         // this.meshes[window.remoteIDs[0]].speakingMaterial.position.y = texty + 0.07;
        //         return { x: 0, y: texty };
        //     case 2:
        //         return { x: 0, y: texty };
        //     case 3:
        //         return { x: 0, y: texty };
        //     case 4:
        //         return { x: 0, y: texty };
        //     default:
        //         console.log("[text] too many videos");
        //         return { x: 0, y: 0, scale: 0.3 };
        // }
        return { x: 0, y: texty };
    }
}
// var camera, scene, renderer;

var composer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var cube_count,

    xgrid = 20,
    ygrid = 10;

// test cube
var cube;
window.profileReady = false;

var htrFont = null;
var regularFrameMaterial = null;
var gazedFrameMaterial = null;
var arrowMaterial = null;
window.speakingMaterial = null;
window.notspeakingMaterial = null;
var tvObj = null;
window.profile_images = {};
// 'zhenyi.jpg', 'keru.jpg', 'ruofei.jpg', 'brandon.jpg',
// 'kexin.jpg', 'keying.jpg', 'yujie.jpg', 'yunran.jpg',
// 'miaoyi.jpg', 'mengjian.jpg', 'ruofan.jpg', 'yen.jpg',
// 'sicheng.jpg', 'yuxuan.jpg', 'jinshuo.jpg', 'peiling.jpg', 'zhu.jpg',
// 'xiangyu.jpg','yiyi.jpg','tianyao.jpg','ziyu.jpg',
window.profile_urls = [
    'dave.jpg','alice.jpg','charlie.jpg','bob.jpg',
];
// var testFbx = null;
window.webglScene = null;

function webgl_check_resource() {
    if (htrFont != null && window.speakingMaterial != null && window.notspeakingMaterial != null
        && Object.keys(window.profile_images).length == window.profile_urls.length) {
        window.profileReady = true;
        console.log("webgl_check_resource");
        // if (window.host)
        //     return;
        // if (window.vizOption == "profile")
        //     webgl_add_profile(0, "remoteVideo_" + window.localUuid, window.localDisplayName);
        // else if (window.vizOption == "none") {
        //     webgl_add_video(document.getElementById('webgazerVideoFeed'), "remoteVideo_" + window.localUuid, window.localDisplayName);
        // }
        // 0, window.localUuid, window.localDisplayName
    }
}

// function vizSelfViaWebgl() {
//     console.log("debug vizSelfViaWebgl");
//     //assign stream to new HTML video element
//     var vidElement = document.getElementById('localVideo');
//     vidElement.setAttribute('autoplay', '');
//     vidElement.setAttribute('muted', '');
//     vidElement.srcObject = window.videoStream;
//     // vidElement.style.display = 'none';

//     // webgl_add_video(vidElement, "selfVideo_" + peerUuid, window.displayName);
//     var texture = new THREE.VideoTexture(vidElement);
//     var geometry = new THREE.PlaneBufferGeometry(4, 3);
//     var material = new THREE.MeshBasicMaterial({ map: texture });
//     material.side = THREE.DoubleSide;
//     var mesh = new THREE.Mesh(geometry, material);//?
//     // decide the position of the mesh based on the numbers of meshes
//     mesh.position.z = 2.8;
//     mesh.position.x = -1.5;
//     mesh.position.y = 1.1;

//     mesh.scale.x =
//         mesh.scale.y = 0.2;

//     window.webglScene.scene.add(mesh);
// }

window.webgl_resource_load = function () {
    var fontLoader = new THREE.FontLoader();
    fontLoader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        htrFont = font;
        webgl_check_resource()
        console.log("loading fonts")
    });

    new THREE.TextureLoader()//.setCrossOrigin('*')
        .load('speaking.png', function (texture) {
            // var regularFrameTexture = new THREE.CanvasTexture(image);
            window.speakingMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            webgl_check_resource()
            console.log("loading speaking")

        });
    new THREE.TextureLoader()//.setCrossOrigin('*')
        .load('notspeaking.png', function (texture) {
            // var regularFrameTexture = new THREE.CanvasTexture(image);
            window.notspeakingMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            webgl_check_resource()
            console.log("loading notspeaking")
        });
    window.profile_urls.forEach(profile_url => {
        new THREE.TextureLoader()//.setCrossOrigin('*')
            .load(profile_url, function (texture) {
                // var regularFrameTexture = new THREE.CanvasTexture(image);
                console.log("loading", profile_url);
                window.profile_images[profile_url.substring(0, profile_url.indexOf('.'))] = (new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
                webgl_check_resource();
            });
    })
}

export function webgl_scene_init(parentElem) {
    // console.log(window.vizOption);
    if (window.vizOption == "photo3d")
        return;

    if (!window.profileReady) {
        setTimeout(webgl_scene_init(parentElem), 2000);
        return;
    }

    // if (!window.webgazerReady) {
    //     setTimeout(webgl_scene_init(parentElem), 1000);
    //     return;
    // }

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 10, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 10, 10);
    light.castShadow = true;
    light.shadow.camera.top = 9;
    light.shadow.camera.bottom = - 5;
    light.shadow.camera.left = - 6;
    light.shadow.camera.right = 6;
    scene.add(light);

    var orthoCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 1000);

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.aspect = window.innerWidth / window.innerHeight;

    // camera = orthoCamera;    
    camera.updateProjectionMatrix();

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


    cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // scene.add(cube);

    window.webglScene = new WebglScene(scene, camera, renderer);

    // webgl_animate(renderer, scene, camera);
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    parentElem.appendChild(renderer.domElement);

    // viz self here
    if (window.host)
        return;
    if (window.vizOption == "profile")
        webgl_add_profile(0, "remoteVideo_" + window.localUuid, window.localDisplayName);
    else if (window.vizOption == "none") {
        webgl_add_video(document.getElementById('webgazerVideoFeed'), "remoteVideo_" + window.localUuid, window.localDisplayName);
    }
}

export function webgl_add_video(video, peerID, name, parentElem = document.getElementById("webgl")) {
    if (!window.profileReady) {
        console.log("webgl is not ready");
        setTimeout(webgl_add_video(video, peerID, name), 1000);
        return;
    }

    var texture = new THREE.VideoTexture(video);
    var geometry = new THREE.PlaneBufferGeometry(4, 3);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    material.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh(geometry, material);//?
    // decide the position of the mesh based on the numbers of meshes
    mesh.position.z = 2;

    var newCoord = window.webglScene.getCoordinateForMesh(Object.keys(window.webglScene.meshes).length);
    console.log("new coord", newCoord);
    mesh.position.x = newCoord.x;
    mesh.position.y = newCoord.y;
    mesh.scale.x = -newCoord.scale;
    mesh.scale.y = newCoord.scale;

    window.webglScene.addMesh(mesh, peerID, name);
}

export function webgl_add_frame(peerID) {
    if (!window.profileReady) {
        console.log("webgl is not ready");
        setTimeout(webgl_add_frame(peerID), 1000);
        return;
    }
    // load the frame1, frame2, and arrow image
    var geometry = new THREE.PlaneBufferGeometry(4, 3);
    var frame1 = new THREE.Mesh(geometry, regularFrameMaterial);
    window.webglScene.addFrame(frame1, peerID, "regular");
    var frame2 = new THREE.Mesh(geometry, gazedFrameMaterial.clone());
    window.webglScene.addFrame(frame2, peerID, "gazed");
    // var arrowFrame = new THREE.Mesh(geometry, arrowMaterial);
    var frame3 = new THREE.Mesh(geometry.clone(), arrowMaterial.clone());
    window.webglScene.addFrame(frame3, peerID, "arrow1");
    var frame4 = new THREE.Mesh(geometry.clone(), arrowMaterial.clone());
    window.webglScene.addFrame(frame4, peerID, "arrow2");
    var frame5 = new THREE.Mesh(geometry.clone(), arrowMaterial.clone());
    window.webglScene.addFrame(frame5, peerID, "arrow3");
}

export function webgl_add_tv(peerID) {
    if (!window.profileReady) {
        console.log("webgl is not ready");
        setTimeout(webgl_add_tv(peerID), 1000);
        return;
    }
    // load the frame1, frame2, and arrow image
    var newTV = tvObj.clone();
    window.webglScene.addTV(newTV, peerID);
}

export function webgl_add_profile(profile_image_index, peerID, name, parentElem = document.getElementById("webgl")) {
    if (!window.profileReady) {
        console.log("webgl is not ready", "profile_image_index", profile_image_index, name);
        setTimeout(webgl_add_profile(profile_image_index, peerID, name), 300);
        return;
    }

    // load profile texture
    var geometry = new THREE.CircleGeometry(2, 64);
    // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    // const circle = new THREE.Mesh( geometry, material );

    // var geometry = new THREE.PlaneBufferGeometry(4, 3);
    // var profile_mesh = new THREE.Mesh(geometry, window.profile_images[window.profile_urls.indexOf(name) == -1 ?
    //     window.profile_urls[(profile_image_index % window.profile_urls.length)] : name]);

    var profileidx = (profile_image_index % window.profile_urls.length);
    for (var i = 0; i < window.profile_urls.length; i++) {
        if (window.profile_urls[i].substring(0, window.profile_urls[i].indexOf(".")).indexOf(name) != -1) {
            profileidx = i;
            break;
        }
    }
    var mat = window.profile_images[window.profile_urls[profileidx].substring(
        0, window.profile_urls[profileidx].indexOf("."))];
    console.log("profile mat", mat);
    var profile_mesh = new THREE.Mesh(geometry, mat);
    profile_mesh.position.z = 2;//2.8;

    var newCoord = window.webglScene.getCoordinateForMesh(Object.keys(window.webglScene.meshes).length);
    console.log("new coord", newCoord);
    profile_mesh.position.x = newCoord.x;
    profile_mesh.position.y = newCoord.y;
    profile_mesh.scale.x = -newCoord.scale;
    profile_mesh.scale.y = newCoord.scale;

    window.webglScene.addMesh(profile_mesh, peerID, name);
}

export var clock = new THREE.Clock();
export var delta = 0;
// 30 fps
let interval = 1 / 30;
export var webgl_animate = function (now) {
    requestAnimationFrame(webgl_animate);
    // console.log(delta);
    if (window.profileReady && window.webglScene) {
        delta += clock.getDelta();
        if (delta > interval) {
            // The draw or time dependent code are here
            for (const [key, value] of Object.entries(window.webglScene.meshes)) {
                if (vizOption == "webgl") {
                    value.shake(now);
                    value.rotate(now);
                }
            }
            delta = delta % interval;
        }
        // random create gaze direction
        // change var
        // render video as quick as you can
    }
    switch (window.vizOption) {
        case undefined:
            break;
        case "photo3d":
            // TODO
            for (let i in window.myCharList) {
                window.myCharList[i].render();
            }
            break;
        default:
            if (window.profileReady && window.webglScene) {
                for (const [key, value] of Object.entries(window.webglScene.meshes)) {
                    window.webglScene.renderer.render(window.webglScene.scene, window.webglScene.camera);
                }
            }
    }
};

// end of test

function onWindowResize() {
    window.webglScene.camera.aspect = window.innerWidth / window.innerHeight;
    window.webglScene.camera.updateProjectionMatrix();
    window.webglScene.renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // composer.setSize(window.innerWidth, window.innerHeight);
}

// todo
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY) * 0.3;
}

function change_uvs(geometry, unitx, unity, offsetx, offsety) {
    var uvs = geometry.attributes.uv.array;
    for (var i = 0; i < uvs.length; i += 2) {
        uvs[i] = (uvs[i] + offsetx) * unitx;
        uvs[i + 1] = (uvs[i + 1] + offsety) * unity;
    }
}