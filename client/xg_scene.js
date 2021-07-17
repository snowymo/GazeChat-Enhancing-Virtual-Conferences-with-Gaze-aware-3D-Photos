"use strict";
import { XG, Detector } from "./xg.min.eyes1.js"

const poseList = [[0, 0], [200, 0], [0, 200], [200, 200]];
const nonList = [[-400, -100], [400, -100], [-400, 100], [400, 100]];

var characterList = [

  // {
  //   name: "zhenyi",
  //   baseUrl: "textures/eyes/zy2/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "ZhenyiHe_depth.jpg",

  //   highUrl: "ZhenyiHe.jpg",
  //   highMaskUrl: "ZhenyiHe_mask_thick.jpg",

  //   imgWidth: 300,
  //   imgHeight: 400,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,

  //   author: "Pexels",
  //   url: "",
  // },
  // {
  //   name: "keru",
  //   baseUrl: "textures/eyes/kr2/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "KeruWang_depth.jpg",

  //   highUrl: "KeruWang.jpg",
  //   highMaskUrl: "KeruWang_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "ruofei",
  //   baseUrl: "textures/eyes/rf2/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "RuofeiDu_depth.jpg",

  //   highUrl: "RuofeiDu.jpg",
  //   highMaskUrl: "RuofeiDu_mask_thick.jpg",

  //   imgWidth: 400,
  //   imgHeight: 400,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "brandon",
  //   baseUrl: "textures/eyes/br/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "BrandonFeng_depth.jpg",

  //   highUrl: "BrandonFeng.jpg",
  //   highMaskUrl: "BrandonFeng_mask_thick.jpg",

  //   imgWidth: 400,
  //   imgHeight: 400,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "kexin",
  //   baseUrl: "textures/eyes/kexin/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "KexinZheng_depth.jpg",

  //   highUrl: "KexinZheng.jpg",
  //   highMaskUrl: "KexinZheng_mask_thick.jpg",

  //   imgWidth: 400,
  //   imgHeight: 400,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "keying",
  //   baseUrl: "textures/eyes/keying/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "KeyingWu_depth.jpg",

  //   highUrl: "KeyingWu.jpg",
  //   highMaskUrl: "KeyingWu_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "yujie",
  //   baseUrl: "textures/eyes/yujie/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "YujieZhou_depth.jpg",

  //   highUrl: "YujieZhou.jpg",
  //   highMaskUrl: "YujieZhou_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "yunran",
  //   baseUrl: "textures/eyes/yunran/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "YunranZhou_depth.jpg",

  //   highUrl: "YunranZhou.jpg",
  //   highMaskUrl: "YunranZhou_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "miaoyi",
  //   baseUrl: "textures/eyes/miaoyi/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "MiaoyiShi_depth.jpg",

  //   highUrl: "MiaoyiShi.jpg",
  //   highMaskUrl: "MiaoyiShi_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "mengjian",
  //   baseUrl: "textures/eyes/mengjian/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "MengjianHua_depth.jpg",

  //   highUrl: "MengjianHua.jpg",
  //   highMaskUrl: "MengjianHua_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "ruofan",
  //   baseUrl: "textures/eyes/ruofan/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "RuofanWu_depth.jpg",

  //   highUrl: "RuofanWu.jpg",
  //   highMaskUrl: "RuofanWu_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "yen",
  //   baseUrl: "textures/eyes/yen/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "YenChen_depth.jpg",

  //   highUrl: "YenChen.jpg",
  //   highMaskUrl: "YenChen_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "sicheng",
  //   baseUrl: "textures/eyes/sicheng/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "SichengPan_depth.jpg",

  //   highUrl: "SichengPan.jpg",
  //   highMaskUrl: "SichengPan_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "yuxuan",
  //   baseUrl: "textures/eyes/yuxuan/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "YuxuanMao_depth.jpg",

  //   highUrl: "YuxuanMao.jpg",
  //   highMaskUrl: "YuxuanMao_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "jinshuo",
  //   baseUrl: "textures/eyes/jinshuo/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "JinshuoHuang_depth.jpg",

  //   highUrl: "JinshuoHuang.jpg",
  //   highMaskUrl: "JinshuoHuang_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "peiling",
  //   baseUrl: "textures/eyes/peiling/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "PeilingJiang_depth.jpg",

  //   highUrl: "PeilingJiang.jpg",
  //   highMaskUrl: "PeilingJiang_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  //  {
  //   name: "zhu",
  //   baseUrl: "textures/eyes/zhu/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "ZhuWang_depth.jpg",

  //   highUrl: "ZhuWang.jpg",
  //   highMaskUrl: "ZhuWang_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  {
    name: "dave",
    baseUrl: "textures/eyes/dave/final_FOM/",
    frameUrl: "",
    depthUrl: "f1_depth.jpg",

    highUrl: "f1.jpg",
    highMaskUrl: "f1_mask_thick.jpg",

    imgWidth: 200,
    imgHeight: 200,

    borderSide: 115,
    borderTop: 118,

    gamma: 1.2,
    brightness: 1.2,
    sharpen: false,

    scale: 0.8,
    positionY: -0.05,

    displacementScale: 1.5,

    diffuseMaps: [],
    displacementMap: null,
  },
  {
    name: "alice",
    baseUrl: "textures/eyes/alice/final_FOM/",
    frameUrl: "",
    depthUrl: "f2_depth.jpg",

    highUrl: "f2.jpg",
    highMaskUrl: "f2_mask_thick.jpg",

    imgWidth: 200,
    imgHeight: 200,

    borderSide: 115,
    borderTop: 118,

    gamma: 1.2,
    brightness: 1.2,
    sharpen: false,

    scale: 0.8,
    positionY: -0.05,

    displacementScale: 1.5,

    diffuseMaps: [],
    displacementMap: null,
  },
  {
    name: "charlie",
    baseUrl: "textures/eyes/charlie/final_FOM/",
    frameUrl: "",
    depthUrl: "f4_depth.jpg",

    highUrl: "f4.jpg",
    highMaskUrl: "f4_mask_thick.jpg",

    imgWidth: 200,
    imgHeight: 200,

    borderSide: 115,
    borderTop: 118,

    gamma: 1.2,
    brightness: 1.2,
    sharpen: false,

    scale: 0.8,
    positionY: -0.05,

    displacementScale: 1.5,

    diffuseMaps: [],
    displacementMap: null,
  },
  {
    name: "bob",
    baseUrl: "textures/eyes/bob/final_FOM/",
    frameUrl: "",
    depthUrl: "f3_depth.jpg",

    highUrl: "f3.jpg",
    highMaskUrl: "f3_mask_thick.jpg",

    imgWidth: 200,
    imgHeight: 200,

    borderSide: 115,
    borderTop: 118,

    gamma: 1.2,
    brightness: 1.2,
    sharpen: false,

    scale: 0.8,
    positionY: -0.05,

    displacementScale: 1.5,

    diffuseMaps: [],
    displacementMap: null,
  },
  // {
  //   name: "xiangyu",
  //   baseUrl: "textures/eyes/xiangyu/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "Xiangyu_depth.jpg",

  //   highUrl: "Xiangyu.jpg",
  //   highMaskUrl: "Xiangyu_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "yiyi",
  //   baseUrl: "textures/eyes/yiyi/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "Yiyi_depth.jpg",

  //   highUrl: "Yiyi.jpg",
  //   highMaskUrl: "Yiyi_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "tianyao",
  //   baseUrl: "textures/eyes/tianyao/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "Tianyao_depth.jpg",

  //   highUrl: "Tianyao.jpg",
  //   highMaskUrl: "Tianyao_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
  // {
  //   name: "ziyu",
  //   baseUrl: "textures/eyes/ziyu/final_FOM/",
  //   frameUrl: "",
  //   depthUrl: "Ziyu_depth.jpg",

  //   highUrl: "Ziyu.jpg",
  //   highMaskUrl: "Ziyu_mask_thick.jpg",

  //   imgWidth: 200,
  //   imgHeight: 200,

  //   borderSide: 115,
  //   borderTop: 118,

  //   gamma: 1.2,
  //   brightness: 1.2,
  //   sharpen: false,

  //   scale: 0.8,
  //   positionY: -0.05,

  //   displacementScale: 1.5,

  //   diffuseMaps: [],
  //   displacementMap: null,
  // },
];

export function xg_scene_init(parentElem) {
  if (window.vizOption == undefined) {
    setTimeout(xg_scene_init(parentElem), 2000);
    return;
  }
  if (window.vizOption != "photo3d")
    return;

  if (!Detector.webgl) Detector.addGetWebGLMessage();

  window.SCALE = 1 / window.devicePixelRatio;
  var MARGIN = 200;
  window.SIDE_MARGIN = 0;

  var BRIGHTNESS = 1;

  // window.SCREEN_WIDTH = window.screen.width;
  // window.SCREEN_HEIGHT = window.screen.height;
  // console.log("width: " + window.screen.width);
  window.SCREEN_WIDTH = 1680;
  window.SCREEN_HEIGHT = 1050;
  window.xOff = (screen.width - window.SCREEN_WIDTH) / 2;
  // window.yOff = 0;
  window.yOff = (screen.height - window.SCREEN_HEIGHT) / 2;
  window.wScale = screen.width / 1680;
  window.hScale = screen.height / 1050;
  // window.wScale = window.SCALE;
  // window.hScale = window.SCALE;
  // window.sScale = Math.sqrt(window.wScale*window.wScale + window.hScale*window.hScale)/1.41;
  // window.sScale = Math.min(window.wScale, window.hScale);
  window.sScale = 1;

  var backend = "webgl1";

  window.isMobile = Detector.isMobile;
  //isMobile = true;
  window.useDeferred = false;
  window.useDebugMaterial = false;
  window.maskEnabled = true;

  if (!Detector.deferredCapable || window.isMobile) useDeferred = false;
  window.mouseX = 0;
  window.mouseY = 0;

  document.addEventListener(
    "mousemove",
    (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    },
    false
  );

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  //
  var clock = new XG.Clock();
  var elapsed = 0;
  var dummyBlackMap = XG.ImageUtils.generateDataTexture(
    4,
    4,
    new XG.Color(0x000000)
  );

  // scene init
  window.scene = new XG.Scene();

  window.pars = {
    width: window.SCREEN_WIDTH,
    height: window.SCREEN_HEIGHT,
    scale: window.SCALE,
    antialias: true,
    tonemapping: XG.SimpleOperator,
    brightness: BRIGHTNESS,
    clearColor: 0x000000,
    clearAlpha: 1.0,
    devicePixelRatio: 1,
    backend: backend
  };

  window.deferredRenderer = new XG.DeferredRenderer(pars);
  window.forwardRenderer = new XG.ForwardRenderer(pars);
  if (window.useDeferred) {
    parentElem.appendChild(window.deferredRenderer.domElement);
  } else {
    parentElem.appendChild(window.forwardRenderer.domElement);
  }
}

window.myCharList = [];
window.fi = true;
export function xg_add_photo3d(profile_image_index, peerID, name, parentElem = document.getElementById("photo3d")) {
  // if (!isReady) {
  //     console.log("xg is not ready");
  //     setTimeout(xg_add_photo3d(profile_image_index, peerID, name), 300);
  //     return;
  // }

  // load profile texture
  var profileidx = profile_image_index % window.profile_urls.length;
  for (var i = 0; i < window.profile_urls.length; i++) {
    if (window.profile_urls[i].substring(0, window.profile_urls[i].indexOf(".")).indexOf(name) != -1) {
      profileidx = i;
      break;
    }
  }
  window.myCharList.push(
    new DynamicProfile(
      characterList[profileidx],
      window.myCharList.length,
      peerID
    )
  );
  // createMask();
  resetClipPosition();
  initCanvas();
  displayName();
  if (window.myCharList.length == 1) init3DModeText();
}
function createMask() {
  var _svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(_svgNS, "svg");
  svg.setAttribute("width", 0);
  svg.setAttribute("height", 0);

  var clipPath = document.createElementNS(_svgNS, "clipPath");
  clipPath.id = "innerClip";
  svg.appendChild(clipPath);
  for (let i = 0; i < 4; i++) {
    var mask = document.createElementNS(_svgNS, "circle");
    mask.id = "cin" + i;
    clipPath.appendChild(mask);
    document.head.appendChild(svg);
  }
}

function resetClipPosition() {
  for (let i in myCharList) {
    const innerCircle = document.getElementById('cin' + i);
    if (innerCircle) {
      // innerCircle.id = window.myCharList[i].uuid.concat("-cin");
      innerCircle.setAttribute('cx', window.myCharList[i].screenPosX);
      innerCircle.setAttribute('cy', window.myCharList[i].screenPosY);
      innerCircle.setAttribute('r', window.sScale * 116);
    }
    const outterCircle = document.getElementById('cout' + i);
    if (outterCircle) {
      // outterCircle.id = window.myCharList[i].uuid.concat("-cout");
      outterCircle.setAttribute('cx', window.myCharList[i].screenPosX);
      outterCircle.setAttribute('cy', window.myCharList[i].screenPosY);
      outterCircle.setAttribute('r', window.sScale * 116);
    }
  }
}

function updateClipPosition() {
  for (let i in myCharList) {
    const innerCircle = document.getElementById('cin' + i);
    if (innerCircle) {
      innerCircle.setAttribute('cx', window.myCharList[i].screenPosX);
      innerCircle.setAttribute('cy', window.myCharList[i].screenPosY);
      innerCircle.setAttribute('r', window.sScale * 116);
    }
    const outterCircle = document.getElementById('cout' + i);
    if (outterCircle) {
      outterCircle.setAttribute('cx', window.myCharList[i].screenPosX);
      outterCircle.setAttribute('cy', window.myCharList[i].screenPosY);
      outterCircle.setAttribute('r', window.sScale * 116);
    }
  }
  for (var i = myCharList.length; i < 4; i++) {
    const innerCircle = document.getElementById('cin' + i);
    if (innerCircle) {
      innerCircle.setAttribute('r', 0);
    }
    const outterCircle = document.getElementById('cout' + i);
    if (outterCircle) {
      outterCircle.setAttribute('r', 0);
    }
  }
}

function displayName() {
  for (let i in myCharList) {
    var divId = 'nameTage-'.concat(window.myCharList[i].uuid);
    if (!document.getElementById(divId)) {
      const div = document.createElement("div");
      div.id = divId;
      const name = window.myCharList[i].characterInfo.name;
      var para = document.createElement("p");
      para.style.setProperty("color", "white", "important");
      var nameNode = document.createTextNode(name);
      para.appendChild(nameNode);
      div.appendChild(para)
      document.body.appendChild(div);
      div.style.left = (myCharList[i].screenPosX + window.xOff - window.wScale * 7.8 * name.length / 2).toString().concat('px');
      div.style.top = (myCharList[i].screenPosY - 150 * window.sScale + window.yOff).toString().concat('px');
      div.style.position = "fixed";
      div.style.setProperty("text-align", "center", "important");
      div.style.setProperty("z-index", 99990);
    }
  }
}

function updateDisplayNames() {
  for (let i in myCharList) {
    var divId = 'nameTage-'.concat(window.myCharList[i].uuid);
    var div = document.getElementById(divId)
    if (div) {
      div.style.left = (myCharList[i].screenPosX + window.xOff - 7.8 * myCharList[i].characterInfo.name.length / 2).toString().concat('px');
      div.style.top = (myCharList[i].screenPosY - 150 * window.sScale + window.yOff).toString().concat('px');
    }
  }
}

function init3DModeText() {
  const div = document.createElement("div");
  div.id = "3dPhotoMode";
  var para = document.createElement("h2");
  para.id = "ModeText";
  para.innerHTML = window.photo3d;
  para.style.setProperty("color", "gray", "important");
  div.style.right = 0;
  div.style.top = 0;
  div.style.position = "absolute";
  div.style.setProperty("text-align", "center", "important");
  div.style.setProperty("z-index", 99990);
  div.appendChild(para);
  document.body.appendChild(div);
}

function update3DModeText() {
  const para = document.getElementById("ModeText");
  if (!para) init3DModeText();
  para.innerHTML = window.photo3d;
}

function initCanvas() {
  const canvas = document.getElementById('plotting_canvas');
  canvas.setAttribute('width', window.SCREEN_WIDTH);
  canvas.setAttribute('height', window.SCREEN_HEIGHT);
  document.body.style.setProperty("background-color", "black", "important");
  const navBar = document.getElementById('webgazerNavbar');
  navBar.style.display = "none";
  // center the canvas
  const gl = document.getElementById('photo3d');
  const xOff = window.xOff.toString();
  const yOff = window.yOff.toString();
  gl.style.setProperty('left', xOff.concat('px'));
  gl.style.setProperty('top', yOff.concat('px'));
}

export function deleteProfile(i) {
  var name = window.myCharList[i].uuid;
  const innerCircle = document.getElementById(name.concat('-cin'));
  if (innerCircle) {
    innerCircle.setAttribute('r', 0);
    innerCircle.id = 'cin' + i;
  }
  const outterCircle = document.getElementById(name.concat('-cout'));
  if (outterCircle) {
    outterCircle.setAttribute('r', 0);
    outterCircle.id = 'cout' + i;
  }
  var nameTagId = 'nameTage-'.concat(name);
  var nameTag = document.getElementById(nameTagId);
  nameTag.remove();

  if (window.myCharList[i].meshRoot) window.myCharList[i].meshRoot.translateX(-10000);
  if (window.myCharList[i].maskRoot) window.myCharList[i].maskRoot.translateX(-10000);
  window.myCharList.splice(i, 1);

  for (var newIdx = i; newIdx < window.myCharList.length; newIdx++) {
    window.myCharList[newIdx].index = newIdx;
    window.myCharList[newIdx].updateCharacterPlacement();
  }
  updateClipPosition();
  updateDisplayNames();
  // window.myCharList[index].meshRoot.removeAll();
  // window.myCharList[index].maskRoot.removeAll();
}

var dummyWhiteMap = XG.ImageUtils.generateDataTexture(
  4,
  4,
  new XG.Color(0xffffff)
);

window.mapUuidChar = {};
export class DynamicProfile {
  constructor(characterInfo, index, peerID) {
    this.index = index;
    this.gazeDst = -1;
    this.mouseDst = -1;
    this.uuid = peerID;
    this.dx = 0;
    this.dy = 0;

    window.mapUuidChar[this.uuid] = this;
    // XG = XG;
    this.target = new XG.Vector3();
    this.targetX = 0.0;
    this.targetY = 0.0;
    this.angle = 0.0;
    this.height = 0.0;
    this.container = document.getElementById("photo3d");

    // this.characterIndex = characterIndex;
    this.characterInfo = characterInfo;

    this.diffuseComposer = null;
    this.diffuseUniforms = null;

    this.loadCounter = 0;
    this.screenPosX = 0;
    this.screenPosY = 0;

    this.volume = 0;
    this.curVolume = 0;

    // let loadingEle = document.createElement("div");
    // loadingEle.id = "loading-" + characterIndex;
    // loadingEle.className = "loading";
    // document.body.appendChild(loadingEle);
    // this.loadingElement = loadingEle;

    // renderer
    this.pars = window.pars;

    if (window.isMobile) {
      this.pars.antialias = false;
    }

    if (window.useDeferred) {
      this.renderer = window.deferredRenderer;
      this.innerRenderer = this.renderer.renderer;
    } else {
      this.renderer = window.forwardRenderer;
      this.innerRenderer = this.renderer;
    }

    this.renderer.domElement.style.position = "relative";
    // this.renderer.domElement.style.top = MARGIN + "px";
    this.renderer.domElement.style.left = window.SIDE_MARGIN + "px";


    //

    this.renderer.shadowMapEnabled = false;

    //

    if (window.useDeferred) {
      this.effectSharpen = new XG.ShaderPass(XG.SharpenShader);
      this.effectSharpen.uniforms.resolution.value.set(
        SCREEN_WIDTH * SCALE,
        SCREEN_HEIGHT * SCALE
      );

      this.effectLens = new XG.ShaderPass(
        XG.ChromaticAberrationShader
      );
      this.effectLens.material.uniforms.amount.value = 0.0025;

      this.renderer.addEffect(this.effectSharpen);
      this.renderer.addEffect(this.effectLens);

      this.effectLens.enabled = false;
    }

    // stats

    // this.stats = new Stats();
    // this.container.appendChild(this.stats.domElement);

    // events

    // window.addEventListener("resize", this.onWindowResize, false);
    // document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    // this.renderer.domElement.addEventListener(
    //   "touchmove",
    //   this.onTouchMove,
    //   false
    // );
    // this.renderer.domElement.addEventListener("click", this.onClick, false);
    // document.addEventListener("keydown", this.onKeyDown, false);

    // camera

    this.camera = new XG.PerspectiveCamera(
      27.5,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      50,
      1500
    );
    this.camera.position.set(0, 0, 200);

    // scene

    this.scene = window.scene;
    //ZH TODO:we probably only need one camera
    this.scene.add(this.camera);

    // this.addBorders();

    if (window.useDebugMaterial) {
      let light = new XG.PointLight(0xffffff, 4, 1000);
      light.position.z = 100;
      light.position.y = 20;
      this.scene.add(light);

      light = new XG.PointLight(0xffaa00, 4, 1000);
      light.position.z = 100;
      light.position.x = 100;
      this.scene.add(light);

      light = new XG.PointLight(0x00aaff, 4, 1000);
      light.position.z = 100;
      light.position.x = -100;
      this.scene.add(light);
    }

    this.addCharacter();
    this.setTextures();

    this.setupDynamicTexture();

    //
    this.x = this.planeMesh.position.x + this.container.offsetWidth / 2;
    this.y = this.planeMesh.position.y + this.container.offsetHeight / 2;

    // let that = this
    // this.container.childNodes[0].addEventListener('mousedown', function _d(e) {
    //   const m = { oX: that.x, oY: that.y, x: e.clientX, y: e.clientY }
    //   document.addEventListener('mousemove', function _m(e) {
    //     that.x = m.oX + e.clientX - m.x
    //     that.y = m.oY + e.clientY - m.y
    //     that.container.style.left = that.x - that.container.offsetWidth / 2 + "px";
    //     that.container.style.top = that.y - that.container.offsetHeight / 2 + "px";

    //     document.addEventListener('mouseup', function _u(e) {
    //       document.removeEventListener('mousemove', _m)
    //       document.removeEventListener('mouseup', _u)
    //     })
    //   })
    // }, false)
  }

  addBorders() {
    var geo = new XG.PlaneGeometry(200, 200);
    var mat = new XG.EmissiveMaterial({ color: 0x000000 });

    var d = 118;

    this.borderMeshRight = new XG.Mesh(geo, mat);
    this.borderMeshRight.position.z = 100;
    this.borderMeshRight.position.x = d;

    this.scene.add(this.borderMeshRight);

    this.borderMeshLeft = new XG.Mesh(geo, mat);
    this.borderMeshLeft.position.z = 100;
    this.borderMeshLeft.position.x = -d;

    this.scene.add(this.borderMeshLeft);

    geo = new XG.PlaneGeometry(200, 100);

    d = 118;

    this.borderMeshTop = new XG.Mesh(geo, mat);
    this.borderMeshTop.position.z = 100;
    this.borderMeshTop.position.y = d;

    this.scene.add(this.borderMeshTop);

    d = 115;

    this.borderMeshBottom = new XG.Mesh(geo, mat);
    this.borderMeshBottom.position.z = 100;
    this.borderMeshBottom.position.y = -d;

    this.scene.add(this.borderMeshBottom);
  }

  checkLoaded() {
    this.loadCounter += 1;

    // if (this.loadCounter >= 20) {
    //   this.loadingElement.style.display = "none";
    // }
  }

  toggleSharpen() {
    if (!window.useDeferred) return;
    this.characterInfo.sharpen = !this.characterInfo.sharpen;
  }

  toggleLens() {
    if (!window.useDeferred) return;
    this.effectLens.enabled = !this.effectLens.enabled;
  }

  toggleMask() {
    window.maskEnabled = !window.maskEnabled;
  }

  toggleHUD() {
    if (hudVisible) {
      //   this.stats.domElement.style.display = "none";

      hudVisible = false;
    } else {
      //   stats.domElement.style.display = "block";

      hudVisible = true;
    }
  }

  updateCharacterPlacement() {
    this.planeMesh.position.y = this.index % 4 < 2 ? 3.2 : -2.8;
    this.planeMesh.rotation.x = Math.PI * 0.5 + this.planeMesh.position.y * 0.08;
    this.planeMesh.position.x = (this.index % 2 - 0.5) * 10;
    // manually adjust the offset caused by camera perspective
    this.planeMesh.rotation.z = 0.03 * this.planeMesh.position.x;

    this.screenPosX = window.SCREEN_WIDTH * 0.5 + this.planeMesh.position.x * 65;
    this.screenPosY = this.index <= 1 ? window.SCREEN_HEIGHT * 0.5 - this.planeMesh.position.y * 66.5 : window.SCREEN_HEIGHT * 0.5 - this.planeMesh.position.y * 62.5;

    this.overlayMesh.position.y = this.planeMesh.position.y + 0.25 - 0.15;
    this.overlayMesh.position.z = 1.25;
    this.overlayMesh.position.x = this.planeMesh.position.x;
  }

  addCharacter() {
    var d = 4.75;
    var nSegments = 100;
    var aspectRatio = 1;

    var geometry = new XG.HeightfieldGeometry(
      d * aspectRatio,
      d,
      nSegments * 2,
      nSegments
    );

    var uvs = geometry.attributes.uv.array;
    for (var i = 0, il = uvs.length; i < il; i += 2) {
      uvs[i + 1] = 1.0 - uvs[i + 1];
    }

    // material

    if (window.useDebugMaterial) {
      this.planeMaterial = new XG.PhongMaterial({
        color: 0xffffff,
        map: dummyWhiteMap,
      });

      this.planeMaterial.bumpMap = dummyWhiteMap;
      this.planeMaterial.bumpScale = 4;
    } else {
      this.planeMaterial = new XG.EmissiveMaterial({
        color: 0xffffff,
        map: dummyWhiteMap,
      });
    }

    this.planeMaterial.displacementMap = dummyWhiteMap;
    this.planeMaterial.displacementScale = 0.5;

    this.meshRoot = new XG.Node();
    this.meshRoot.scale.multiplyScalar(12);

    this.maskRoot = new XG.Node();
    this.maskRoot.scale.multiplyScalar(50);

    // ZH
    // this.maskMesh = new XG.Mesh(geometry, this.planeMaterial);
    // this.maskMesh.rotation.x = Math.PI * 0.5;
    // this.maskMesh.position.y = 0.0;
    // this.maskMesh.position.x = (this.index % 2 - 0.5) * 4;
    // // manually adjust the offset caused by camera perspective
    // if (this.index == 0) this.maskMesh.rotation.z -= Math.PI * 0.01;
    // else this.maskMesh.rotation.z = Math.PI * 0.1;

    this.planeMesh = new XG.Mesh(geometry, this.planeMaterial);
    // this.planeMesh = new XG.Mesh(this.circleGeo, this.circleMat);
    this.planeMesh.position.y = this.index % 4 < 2 ? 3.2 : -2.8;
    this.planeMesh.rotation.x = Math.PI * 0.5 + this.planeMesh.position.y * 0.08;
    this.planeMesh.position.x = (this.index % 2 - 0.5) * 10;
    // manually adjust the offset caused by camera perspective
    this.planeMesh.rotation.z = 0.03 * this.planeMesh.position.x;

    this.screenPosX = window.SCREEN_WIDTH * 0.5 + this.planeMesh.position.x * 65;
    this.screenPosY = this.index <= 1 ? window.SCREEN_HEIGHT * 0.5 - this.planeMesh.position.y * 66.5 : window.SCREEN_HEIGHT * 0.5 - this.planeMesh.position.y * 62.5;
    this.gazeCoord = { x: this.screenPosX, y: this.screenPosY }; //look at self
    //
    // ZH
    this.circleGeo = new XG.CylinderGeometry(30, 30, 1, 150);
    this.circleMat = new XG.EmissiveMaterial({
      color: 0xFFFFFF,
      map: dummyWhiteMap,
    });
    this.circleMesh = new XG.Mesh(this.circleGeo, this.circleMat);
    this.circleMesh.rotation.x = Math.PI * 0.5;
    this.circleMesh.position.z = -1.0;
    this.circleMesh.position.x = 0;
    this.circleMesh.scale.x = this.circleMesh.scale.y = this.circleMesh.scale.z = 0.1;
    this.maskRoot.add(this.circleMesh);

    this.meshRoot.add(this.planeMesh);

    this.scene.add(this.meshRoot);
    this.scene.add(this.maskRoot);

    // overlay

    this.overlayMaterial = new XG.EmissiveMaterial({
      color: 0xffffff,
      map: dummyWhiteMap,
    });

    this.overlayMaterial.displacementMap = dummyWhiteMap;
    this.overlayMaterial.displacementScale = 0.5;

    this.overlayMaterial.transparent = true;

    this.overlayMesh = new XG.Mesh(geometry, this.overlayMaterial);
    this.overlayMesh.rotation.x = Math.PI * 0.5;
    this.overlayMesh.position.y = this.planeMesh.position.y + 0.25 - 0.15;
    this.overlayMesh.position.z = 1.25;
    this.overlayMesh.position.x = this.planeMesh.position.x;
    // this.overlayMesh.scale.x = this.overlayMesh.scale.y = this.planeMesh.scale.y;
    this.meshRoot.add(this.overlayMesh);

    this.overlayMesh.visible = false;
  }

  setTextures() {
    var pars = this.characterInfo;

    if (pars.displacementMap === null) {
      var baseUrl = pars.baseUrl;
      var frameUrl = pars.frameUrl;
      var depthUrl = pars.depthUrl;
      var overlayUrl = pars.overlayUrl;
      var overlayDepthUrl = pars.overlayDepthUrl;
      var maskUrl = pars.maskUrl;

      var highUrl = pars.highUrl;
      var highMaskUrl = pars.highMaskUrl;

      var displacementMap = XG.ImageUtils.loadTexture(
        baseUrl + depthUrl,
        this.checkLoaded.bind(this)
      );
      //displacementMap.anisotropy = 8;

      pars.displacementMap = displacementMap;

      if (highUrl && highMaskUrl) {
        var highMap = XG.ImageUtils.loadTexture(
          baseUrl + highUrl,
          this.checkLoaded.bind(this)
        );
        highMap.anisotropy = 8;

        pars.highMap = highMap;

        var highMaskMap = XG.ImageUtils.loadTexture(
          baseUrl + highMaskUrl,
          this.checkLoaded.bind(this)
        );
        highMaskMap.anisotropy = 8;

        pars.highMaskMap = highMaskMap;
      } else {
        pars.highMaskMap = dummyWhiteMap;
      }

      for (var i = 0; i < 20; i++) {
        // if( frameUrl!= "") {
        //   var n = "0" + (i + 1);
        //   if (i < 9) n = "0" + n;
        // } else n = i;

        var diffuseMap = XG.ImageUtils.loadTexture(
          baseUrl + frameUrl + i + ".png",
          this.checkLoaded.bind(this)
        );
        diffuseMap.anisotropy = 8;

        pars.diffuseMaps[i] = diffuseMap;
      }

      var diffuseMap = XG.ImageUtils.loadTexture(
        baseUrl + highUrl,
        this.checkLoaded.bind(this)
      );
      diffuseMap.anisotropy = 8;
      pars.diffuseMaps[20] = diffuseMap;

      if (overlayUrl) {
        var overlayMap = XG.ImageUtils.loadTexture(
          baseUrl + overlayUrl,
          this.checkLoaded.bind(this)
        );
        overlayMap.anisotropy = 8;
        overlayMap.premultiplyAlpha = true;

        pars.overlayMap = overlayMap;

        if (overlayDepthUrl) {
          var overlayDisplacementMap = XG.ImageUtils.loadTexture(
            baseUrl + overlayDepthUrl,
            this.checkLoaded.bind(this)
          );
          //overlayDisplacementMap.anisotropy = 8;

          pars.overlayDisplacementMap = overlayDisplacementMap;
        }
      }

      if (maskUrl) {
        var maskMap = XG.ImageUtils.loadTexture(
          baseUrl + maskUrl,
          this.checkLoaded.bind(this)
        );
        maskMap.anisotropy = 8;

        pars.maskMap = maskMap;
      } else {
        pars.maskMap = dummyWhiteMap;
      }
    }

    this.planeMaterial.displacementMap = pars.displacementMap;
    this.planeMaterial.displacementScale =
      pars.displacementScale !== undefined ? pars.displacementScale : 1.0;

    this.planeMaterial.bumpMap = pars.displacementMap;

    var aspectRatio = pars.imgWidth / pars.imgHeight;
    var scale = pars.scale !== undefined ? pars.scale : 1.0;
    // var positionY = pars.positionY !== undefined ? pars.positionY : 0.25;

    this.planeMesh.scale.x = aspectRatio * scale;
    this.planeMesh.scale.z = scale;
    // this.planeMesh.position.y = positionY;

    if (pars.overlayMap) {
      this.overlayMaterial.map = pars.overlayMap;
      this.overlayMaterial.displacementMap = pars.overlayDisplacementMap;
      this.overlayMaterial.displacementScale =
        pars.overlayDisplacementScale !== undefined
          ? pars.overlayDisplacementScale
          : 1.0;

      this.overlayMesh.scale.x = aspectRatio * scale;
      this.overlayMesh.scale.z = scale;

      this.overlayMesh.position.z = pars.overlayPositionZ;

      if (pars.overlayPositionY !== undefined)
        this.overlayMesh.position.y = pars.overlayPositionY;
      if (pars.overlayPositionX !== undefined)
        this.overlayMesh.position.x = pars.overlayPositionX;

      this.overlayMesh.visible = true;
    } else {
      this.overlayMesh.visible = false;
    }

    this.planeMesh.properties.deferredNeedsUpdate = true;

    var borderSide = pars.borderSide !== undefined ? pars.borderSide : 200;
    var borderTop = pars.borderTop !== undefined ? pars.borderTop : 200;
    var borderBottom =
      pars.borderBottom !== undefined ? pars.borderBottom : 200;

    borderSide += 50;

    // this.borderMeshRight.position.x = borderSide;
    // this.borderMeshLeft.position.x = -borderSide;

    // this.borderMeshTop.position.y = borderTop;
    // this.borderMeshBottom.position.y = -borderBottom;
  }

  setupDynamicTexture() {
    var nx = window.isMobile ? 1 : 2;
    var ny = window.isMobile ? 1 : 2;

    var rtWidth = 512 * nx;
    var rtHeight = 512 * ny;

    var rtParamsUByte = {
      minFilter: XG.LinearMipMapLinearFilter,
      magFilter: XG.LinearFilter,
      stencilBuffer: false,
      format: XG.RGBAFormat,
      type: XG.UnsignedByteType,
    };

    var rtDiffuse = new XG.RenderTarget(rtWidth, rtHeight, rtParamsUByte);
    rtDiffuse.generateMipmaps = true;
    rtDiffuse.depthBuffer = false;
    rtDiffuse.stencilBuffer = false;
    rtDiffuse.anisotropy = 16;

    var vertexShader = XG.ShaderChunk["vertexShaderFullscreenTriangleUV"];

    var uniformsDiffuse = {
      diffuseSourceA: { type: "t", value: null },
      diffuseSourceB: { type: "t", value: null },
      mask: { type: "t", value: null },

      highDiffuse: { type: "t", value: null },
      highMask: { type: "t", value: null },

      ratio: { type: "f", value: 0.0 },
      index: { type: "f", value: 0.0 },
      gamma: { type: "f", value: 1.0 },
      brightness: { type: "f", value: 1.0 },
    };

    var fragmentShaderDiffuse = [
      "uniform sampler2D diffuseSourceA;",
      "uniform sampler2D diffuseSourceB;",
      "uniform sampler2D mask;",

      "uniform sampler2D highDiffuse;",
      "uniform sampler2D highMask;",

      "uniform float ratio;",
      "uniform float index;",
      "uniform float gamma;",
      "uniform float brightness;",

      "varying vec2 vUv;",

      "void main() {",

      "vec4 texelA = texture2D( diffuseSourceA,  vec2(vUv.x, vUv.y+index*0.01));",
      "vec4 texelB = texture2D( diffuseSourceB, vec2(vUv.x, vUv.y+index*0.01));",
      "vec4 texelM = texture2D( mask, vUv );",

      "vec4 texelH = texture2D( highDiffuse, vUv );",
      "vec4 texelHM = texture2D( highMask, vUv );",
      "gl_FragColor = mix( texelA, texelB, ratio );",
      "gl_FragColor.rgb = mix( texelH.rgb, gl_FragColor.rgb, texelHM.r );",
      "gl_FragColor.rgb = mix( vec3( 0.0 ), gl_FragColor.rgb, texelM.r );",
      "gl_FragColor.rgb = pow( gl_FragColor.rgb, vec3( gamma ) ) * brightness;",

      "}",
    ].join("\n");

    var diffuseShader = {
      fragmentShader: fragmentShaderDiffuse,
      vertexShader: vertexShader,
      uniforms: uniformsDiffuse,
    };

    var passDiffuse = new XG.ShaderPass(diffuseShader);

    this.diffuseComposer = new XG.EffectComposer(
      this.innerRenderer,
      rtDiffuse
    );
    this.diffuseComposer.addPass(passDiffuse);

    this.diffuseUniforms = passDiffuse.uniforms;

    if (!window.useDebugMaterial) {
      this.planeMaterial.map = this.diffuseComposer.renderTarget1;
    }

    this.diffuseUniforms["diffuseSourceA"].value = dummyWhiteMap;
    this.diffuseUniforms["diffuseSourceB"].value = dummyWhiteMap;
    this.diffuseUniforms["mask"].value = dummyWhiteMap;
  }

  updateVolume(curVolume) {
    this.curVolume = curVolume;
  }

  displayVolume() {
    this.volume = this.lerp(this.volume, this.curVolume * 200, 0.5);
    const outterCircle = document.getElementById('cout' + this.index);
    if (outterCircle && window.myCharList.length > this.index) {
      outterCircle.setAttribute('cx', window.myCharList[this.index].screenPosX);
      outterCircle.setAttribute('cy', window.myCharList[this.index].screenPosY);
      outterCircle.setAttribute('r', window.sScale * 116 + window.sScale * Math.min(this.volume, 50));
    }
  }




  render() {
    // update texture
    var pars = this.characterInfo;

    var zn = 20;

    var fi, fiNorm;
    var indexFloat, indexN0, indexN1;
    var ratio;
    // var ratio2 = 0;
    var dist = 0;
    var index = 0;
    var cur_dx = 0;
    var cur_dy = 0;
    var gazeDst = -1;
    // console.log(this.gazeDst);
    // console.log("window.selfGazeCoord", window.selfGazeCoord, "window.mouseX", window.mouseX, window.mouseY);
    // help code
    // window.photo3d == "eyecontact"
    // window.photo3d == "thirdperson"
    // test the looking relation
    // this.gazeDst = (this.index + 1) % 4;
    // this.gazeDst = 0;
    // console.log("mouse", this.mouseDst);
    // if(this.index == 0 ) console.log(this.mouseDst)
    if (this.index == 0 && !window.host && this.mouseDst == -1) {
      // self, using gaze coordinates directly.
      // this.dx = window.mouseX - this.screenPosX + 20 - window.xOff; // for debug
      // this.dy = window.mouseY - this.screenPosY - window.yOff; // for debug
      this.dx = window.selfGazeCoord.x - this.screenPosX + 50 - window.xOff;
      this.dy = window.selfGazeCoord.y - this.screenPosY - window.yOff;
    } else {
      if (this.mouseDst == -1) {
        gazeDst = this.gazeDst;
      } else {
        gazeDst = this.mouseDst;
        // console.log("mouse d " + this.mouseDst);
      }
      if (window.photo3d == "eyecontact") {
        if (gazeDst == this.index || gazeDst == -1) {
          cur_dx = nonList[this.index][0] + 50;
          cur_dy = nonList[this.index][1];
        } else if (gazeDst == 0) {
          cur_dx = 10;
          cur_dy = 10;
        } else {
          cur_dx = poseList[gazeDst][0] - poseList[this.index][0] + 50;
          cur_dy = poseList[gazeDst][1] - poseList[this.index][1];
        }
      } else {
        if (gazeDst == -1) {
          // console.log(this.index + " look at no one")
          cur_dx = nonList[this.index][0] + 50;
          cur_dy = nonList[this.index][1];
        } else if (gazeDst == this.index) {
          // console.log(this.index + " look at myself")
          cur_dx = 10;
          cur_dy = 10;
        } else {
          // console.log(this.index + " look at " + gazeDst)
          cur_dx = poseList[gazeDst][0] - poseList[this.index][0] + 50;
          cur_dy = poseList[gazeDst][1] - poseList[this.index][1];
        }
      }
      if (cur_dx == 0) cur_dx = 1;
      if (cur_dy == 0) cur_dy = 1;
      this.dx = this.lerp(this.dx, cur_dx, 0.2);
      this.dy = this.lerp(this.dy, cur_dy, 0.2);
      // this.dx = window.mouseX - this.screenPosX + 50 - window.xOff; // for debug
      // this.dy = window.mouseY - this.screenPosY - window.yOff; // for debug
    }
    fi = Math.atan2(this.dx, this.dy);
    dist = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (!fi) {
      // console.log("please adjust your position in front of the camera!!!");
      window.fi = false;
    } else {
      window.fi = true;
      fi += Math.PI;

      fiNorm = 0.5 * (fi / Math.PI);
      indexFloat = fiNorm * (zn - 1);

      indexN0 = Math.floor(indexFloat);
      ratio = indexFloat - indexN0;

      indexN0 = (indexN0 + 5) % (zn - 1);
      indexN1 = (indexN0 + 1) % (zn - 1);

      if (dist < 100 * window.sScale) {
        indexN0 = 20;
        ratio = 0;
        index = 0;
      } else if (indexN0 >= 0 && indexN0 <= 6) {
        index = 1 - 0.2 * Math.abs(indexN0 - 3);
      } else if (indexN0 == 18) {
        index = 0.4;
      }


      this.diffuseUniforms["diffuseSourceA"].value = pars.diffuseMaps[indexN0];
      this.diffuseUniforms["diffuseSourceB"].value = pars.diffuseMaps[indexN1];

      this.diffuseUniforms["mask"].value = window.maskEnabled
        ? pars.maskMap
        : dummyWhiteMap;

      this.diffuseUniforms["highDiffuse"].value = pars.highMap;
      this.diffuseUniforms["highMask"].value = pars.highMaskMap;

      this.diffuseUniforms["ratio"].value = XG.Math.clamp(ratio, 0.0, 1.0);
      this.diffuseUniforms["index"].value = index;
      this.diffuseUniforms["gamma"].value = pars.gamma;
      this.diffuseUniforms["brightness"].value = pars.brightness;
      this.diffuseComposer.render(0.1);

      // post-fx

      if (window.useDeferred) {
        this.effectSharpen.enabled = pars.sharpen;
      }

      // rotate mesh
      this.targetX = Math.PI * 0.5 + this.planeMesh.position.y * 0.05 - 0.1 * Math.cos(fi);
      this.targetY = (0.03 * this.planeMesh.position.x + 0.1 * Math.sin(fi));

      if (this.planeMesh) {
        this.planeMesh.rotation.x += 0.1 * (this.targetX - this.planeMesh.rotation.x);
        this.planeMesh.rotation.z += 0.1 * (this.targetY - this.planeMesh.rotation.z);
      }
    }


    // update camera

    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(this.target);

    // render scene

    this.renderer.render(this.scene, this.camera);
    this.displayVolume();
    if (this.index == 0) update3DModeText();
  }

  lerp(a, b, c) {
    return a + (b - a) * c;
  }
}


