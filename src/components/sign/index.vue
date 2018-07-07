<!-- index -->
<template>
  <div class="main" :class="{'show': flag.showBowserUnsupport}">
    <span class="main-close" @click="flag.needLoadSign=false"></span>
    <div class="box">
      <span class="box-type">预览</span>
      <span class="color-setting" title="配色设置" @click="flag.showColorSetting = !flag.showColorSetting">配色</span>
      <div class="sign" :style="{backgroundColor: style.co_bg}">
        <div class="logo">
          <img src="./logo.png" alt="logo" @click="flag.showColorSetting = !flag.showColorSetting">
        </div>
        <div class="img">
          <img src="./img.png" alt="头像">
        </div>
        <div class="line" :style="{backgroundColor: style.co_line}"></div>
        <div class="info">
          <div class="title" :style="{color: style.co_title}">
            <p class="e_name">{{info.e_name || 'NAME'}}</p>
            <p class="c_name">{{info.c_name || '姓名'}}</p>
            <div class="hr" :style="{backgroundColor: style.co_title}"></div>
            <p class="group">{{info.group || '所属部门'}}</p>
          </div>
          <div class="contact" :style="{color: style.co_item}">
            <div class="item">
              <i class="icon-mobile mobile" :style="{color: style.co_icon}"></i>
              <p>{{(info.contact.phone || '123-456-8901') | formatTelNo}}</p>
            </div>
            <div class="item">
              <i class="icon-call call" :style="{color: style.co_icon}"></i>
              <p v-text="(info.contact.call || '0755-32995555-1234')"></p>
            </div>
            <div class="item">
              <i class="icon-qq qq" :style="{color: style.co_icon}"></i>
              <p>{{info.contact.qq || 'your QQ'}}</p>
            </div>
            <div class="item">
              <i class="icon-wechat wechat" :style="{color: style.co_icon}"></i>
              <p>{{info.contact.wechat || 'your wechat'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-slider" :class="{'slide':flag.showColorSetting}">
        <div class="form">
          <div class="form-row input-required">
            <label for="image" class="label">头像</label>
            <div class="input-file">
              <span class="input-name">上传图片</span>
              <input type="file" class="uploadImage" data-dest="img">
            </div>
          </div>
          <div class="form-row">
            <label for="c_name" class="label">中文名</label>
            <input type="text" class="input-text" name="c_name" placeholder="中文名" v-model="info.c_name">
          </div>
          <div class="form-row">
            <label for="e_name" class="label">英文名</label>
            <input type="text" class="input-text" name="e_name" placeholder="英文名" v-model="info.e_name">
          </div>
          <div class="form-row">
            <label for="group" class="label">所属部门</label>
            <input type="text" class="input-text" name="group" placeholder="所属部门小组" v-model="info.group">
          </div>
          <div class="form-row">
            <label for="phone" class="label">手机号码</label>
            <input type="text" class="input-text" name="phone" placeholder="手机号码" v-model="info.contact.phone">
          </div>
          <div class="form-row">
            <label for="call" class="label">办公号码</label>
            <input type="text" class="input-text" name="call" placeholder="手机号码" v-model="info.contact.call">
          </div>
          <div class="form-row">
            <label for="qq" class="label">QQ</label>
            <input type="text" class="input-text" name="qq" placeholder="QQ" v-model="info.contact.qq">
          </div>
          <div class="form-row">
            <label for="wechat" class="label">微信</label>
            <input type="text" class="input-text" name="wechat" placeholder="微信" v-model="info.contact.wechat">
          </div>
          <div class="btns btn-download">
            <a href="" class="btn bg1" @click="downloadRes()">生成签名</a>
          </div>
        </div>
        <!-- more -->
        <div class="form">
          <div class="form-row">
            <label class="label">Logo</label>
            <div class="input-file">
              <span class="input-name">上传图片</span>
              <input type="file" class="uploadImage" data-dest="logo">
            </div>
          </div>
          <div class="form-row">
            <label class="label">分割线</label>
            <div class="input-color">
              <input type="color" v-model="style.co_line">
              <input type="text" class="input-text" v-model="style.co_line">
            </div>
          </div>
          <div class="form-row">
            <label class="label">名字\分组</label>
            <div class="input-color">
              <input type="color" v-model="style.co_title">
              <input type="text" class="input-text" v-model="style.co_title">
            </div>
          </div>
          <div class="form-row">
            <label class="label">个人信息</label>
            <div class="input-color">
              <input type="color" v-model="style.co_item">
              <input type="text" class="input-text" v-model="style.co_item">
            </div>
          </div>
          <div class="form-row">
            <label class="label">图标颜色</label>
            <div class="input-color">
              <input type="color" v-model="style.co_icon">
              <input type="text" class="input-text" v-model="style.co_icon">
            </div>
          </div>
          <div class="form-row">
            <label class="label">面板底色</label>
            <div class="input-color">
              <input type="color" v-model="style.co_bg">
              <input type="text" class="input-text" v-model="style.co_bg">
            </div>
          </div>
          <div class="btns">
            <a href="#" class="btn bg2" @click="resetColors()">重制</a>
            <a href="#" class="btn bg1" @click="flag.showColorSetting=false">保存并返回</a>
          </div>
        </div>
        <!-- End more-->
      </div>
    </div>
    <cropper></cropper>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          e_name: '',
          c_name: '',
          group: '',
          contact: {
            qq: '',
            wechat: '',
            call: '',
            mobile: ''
          }
        },
        flag: {
          isPC: false,
          showBowserUnsupport: false,
          needLoadSign: false,
          showColorSetting: false,
          imgHasLoad: false,
          cropperHasInit: false,
          previewhasCreate: false
        },
        style: {
          logo: '',
          co_title: '#000000',
          co_item: '#999999',
          co_icon: '#648fe7',
          co_bg: '#eeeeee',
          co_line: '#000050'
        },
        cropper: null,
        img: null,
        helper: {
          support: !!(
            window.FileReader &&
            window.CanvasRenderingContext2D &&
            (window.URL || window.webkitURL)
          )
        }
      }
    },
    components: {},
    computed: {},
    filters: {
      formatTelNo: function (val) {
        if (val) {
          if (~val.indexOf('-')) {
            return val
          }
          return val.replace(/\B(?=(\d{4})+(?!\d))/g, '-')
        }
      },
      formatOfficeNo: function (val) {
        if (val) {
          if (~val.indexOf('-')) {
            return val
          }
          const num = val || '1234'
          return '0755-32995555-' + num
        }
      },
      formatColor: function (val) {
        // 格式化颜色值，允许#RRGGBB、#RGB形式
        if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(val)) {
          const len = val.length
          if (len === 4) {
            const tmp = val.split('').splice(1)
            const newValue = tmp.map(function (item) {
              return item + item
            })
            return `#${newValue.join('').toUpperCase()}`
          }
          return val.toUpperCase()
        }
      }
    },
    methods: {
      checkIfPC: function () {
        var t = null
        var func = function () {
          this.falg.isPC = screen.width <= 600
        }
        func()
        window.addEventListener('resize', function () {
          if (t) {
            clearTimeout(t)
          }
          t = setTimeout(func, 300)
        })
      },
      resetColors: function () {
        this.style = {
          co_title: '#000000',
          co_item: '#999999',
          co_icon: '#648fe7',
          co_bg: '#eeeeee',
          co_line: '#000050'
        }
      },
      checkIfChrome: function () {
        const regChrome = /chrome\/[\d.]+/gi
        const bowser = navigator.userAgent.match(regChrome)
        if (bowser) {
          const ver = (bowser + '').replace(/[^0-9.]/gi, '').split('.')[0]
          if (parseInt(ver, 10) >= 49) {
            this.flag.showBowserUnsupport = false
            return
          }
        }
        this.flag.showBowserUnsupport = true
      },
      bindLoadImgEvent: function () {
        if (!this.helper.support) {
          return
        }
        const thisObj = this
        const uploadPreview = document.getElementById('uploadPreview')
        const uploadImages = document.querySelectorAll('.uploadImage')
        const reader = new FileReader()
        const URL = window.URL || window.webkitURL
        let blobURL
        uploadImages.forEach(function (item, index) {
          item.addEventListener('change', function () {
            var files = this.files
            if (files.length === 0) {
              return
            }
            var file = files[0]
            if (!thisObj.isImage(file.type)) {
              alert('you have to select an image file!')
              return
            }
            reader.readAsDataURL(file)
            blobURL = URL.createObjectURL(file)
            if (thisObj.cropper) {
              thisObj.cropper.reset()
            }
            thisObj.flag.imgHasLoad = true
            thisObj.img = this.dataset.dest
          })
        })
        reader.onload = function (e) {
          uploadPreview.src = e.target.result
          if (this.flag.cropperHasInit) {
            this.loadCropper()
            return
          }
          this.cropper.replace(blobURL)
        }
      },
      loadCropper: function () {
        // 加载裁剪工具
        const image = document.querySelector('#cropperBox > img')
        const preview = document.getElementById('cropperRes')
        const previewImage = preview.getElementsByTagName('img').item(0)
        const options = {
          aspectRatio: 1 / 1,
          build: function () {
            preview.src = image.src
          },
          crop: function (data) {
            const cropper = this.cropper
            const imageData = cropper.getImageData()
            const previewAspectRatio = data.width / data.height

            const previewWidth = preview.offsetWidth
            const previewHeight = previewWidth / previewAspectRatio
            const imageScaledRatio = data.width / previewWidth

            preview.style.height = `${previewHeight}px`
            previewImage.style.width = `${imageData.naturalWidth /
            imageScaledRatio}px`
            previewImage.style.height = `${imageData.naturalHeight /
            imageScaledRatio}px`
            previewImage.style.marginLeft = `${-data.x / imageScaledRatio}px`
            previewImage.style.marginTop = `${-data.y / imageScaledRatio}px`
          }
        }
        console.log(options)
        // this.cropper = new Cropper(image, options);
        this.flag.cropperHasInit = true
      },
      finishCropImage: function () {
        // 完成裁剪，并输出裁剪结果
        const croppedCanvas = this.cropper.getCroppedCanvas({
          width: 200,
          height: 200
        })
        const imgDataUrl = croppedCanvas.toDataURL()
        const where = `.sign.${this.img} img`
        document.querySelector(where).src = imgDataUrl
        this.flag.imgHasLoad = false
      },
      downloadRes: function () {
        // 利用DomToImage库输出签名图
        // const sign = docuemnt.getElementById('sign');
        // const imgName = this.info.e_name;
      },
      isImage: function (type) {
        const filter =
          /^(?:image\/bmp|image\/cis-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg+xml|image\/tiff|image\/x-cmu-raster|image\/x-cmx|image\/x-icon|image\/x-portable-anymap|image\/x-portable-bitmap|image\/x-portable-graymap|image\/x-portable-pixmap|image\/x-rgb|image\/x-xbitmap|image\/x-xpixmap|image\/x-xwindowdump)$/i
        return !!filter.test(type)
      }
    },
    components: {
      Cropper
    }
  }

</script>
<style>
  /* colors */

  :root {
    --c_blue: #648fe7;
    --c_blue_dark: #000050;
    --c_black: #000;
    --c_red: #e4393c;

    --c1: #999;
    --c2: #eee;

    --c_head: #34495e;
    --c_head_small: #ccc;
    --c_input_default: #bdc3c7;
    --c_input: #1abc9c;
  }

  .main {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -305px 0 0 -430px;
    padding: 50px 100px 25px 100px;
    background: #fff;
    visibility: visible;
    transition: all 0.5s ease;

    & .main-close {
      position: absolute;
      width: 45px;
      height: 45px;
      top: 0;
      right: 0;
      &:after {
        content: '\2715';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #34495e;
      }
      &:hover {
        transform: rotate(360deg);
        transition: all 0.5s ease;
      }
    }
    & .box {
      position: relative;
      box-sizing: border-box;
      margin: 0 auto;
      width: 660px;
      height: 160px;
      padding: 30px;
      border-radius: 5px;
      background-color: #f8f8f8;
      & .box-type {
        position: absolute;
        top: 5px;
        left: 10px;
        color: #ccc;
        font-size: 12px;
      }
      & .color-setting {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 35px;
        background: url(./colors.png) no-repeat;
        background-size: 30px auto;
        cursor: pointer;
        font-size: 0;
        transition: all 0.5s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
      & .sign {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 600px;
        height: 100px;
        padding-left: 200px;
        background-color: var(--c2);
        overflow: hidden;
        & .logo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          & img {
            width: 100%;
          }
        }
        & .img {
          position: absolute;
          top: 0;
          left: 100px;
          width: 100px;
          height: 100px;
          & canvas {
            width: 100%;
            height: 100%;
          }
          & img {
            width: 100%;
          }
        }
        & .line {
          position: absolute;
          top: 0;
          left: 200px;
          width: 3px;
          height: 100px;
          background: var(--c_blue_dark);
        }
        & .info {
          position: relative;
          padding: 0 25px;
          top: 50%;
          transform: translate(0, -50%);
          & .title {
            font-size: 16px;
            line-height: 1;
            color: var(--c_black);
            font-weight: bold;
            margin-bottom: 15px;
            white-space: nowrap;
            &>p {
              display: inline-block;
            }
            & .e_name {
              margin-right: 5px;
            }
            & .c_name {
              margin-right: 10px;
            }
            & .hr {
              position: relative;
              display: inline-block;
              vertical-align: middle;
              margin: -2px 4px 0 -7px;
              width: 3px;
              height: 17px;
              background: var(--c_black);
            }
          }
          & .contact {
            color: var(--c1);
            &:after {
              clear: both;
              content: '\20';
              display: block;
            }
            & .item {
              font-family: arial;
              overflow: hidden;
              box-sizing: border-box;
              float: left;
              padding-right: 10px;
              width: 50%;
              font-size: 14px;
              line-height: 1.2;
              margin-bottom: 8px;
              white-space: nowrap;
              &>i {
                color: var(--c_blue);
                &:before {
                  color: inherit;
                }
              }
              & p {
                display: inline;
              }
              &:last-child,
              &:nth-last-child(2) {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    & .content {
      width: 660px;
      overflow: hidden;
      & .content-slider {
        transition: transform 0.5s ease;
        transform: translateX(0);
        white-space: nowrap;
        &.slide {
          transform: translateX(-100%);
        }
        & .form {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 30px auto 15px;
          &:after {
            content: '\20';
            clear: both;
            display: block;
          }
          & .form-row {
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0 60px;
            margin-bottom: 15px;
            & input {
              width: 100%;
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              outline: none;
              border-radius: 4px;
              box-sizing: border-box;
              border: none;
              background: none;
              -webkit-appearance: none;
              -webkit-border-radius: 0;
              &.error {
                color: var(--c_red);
                border-color: var(--c_red);
              }
            }
            & .label {
              display: block;
              font-size: 14px;
              font-weight: bold;
              color: var(--c_head);
              line-height: 1;
              margin-bottom: 10px;
            }
            & .input-text {
              padding-left: 15px;
              color: var(--c_black);
              background: #fff;
              border: 1px solid var(--c_input_default);
              &:focus {
                border-color: var(--c_input);
              }
            }
            & .input-file {
              position: relative;
              box-sizing: border-box;
              width: 100%;
              height: 32px;
              font-size: 14px;
              text-align: center;
              border-radius: 4px;
              color: #fff;
              background: var(--c_input);
              &.active {
                background: darken(var(--c_input), 5%);
              }
              & .input-name {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              & input {
                opacity: 0;
              }
            }
            & .input-color {
              position: relative;
              padding-left: 35px;
              & input[type='color'] {
                position: absolute;
                top: 0;
                left: 0;
                width: 32px;
              }
            }
          }
          & .btns {
            display: flex;
            width: 100%;
            margin: 0 -5px;
            & .btn {
              position: relative;
              display: block;
              flex: 1;
              border-radius: 5px;
              margin: 10px 5px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: #fff;
              transition: background-color 0.3s ease;
              &.bg1 {
                background-color: var(--c_blue);
                &:active {
                  background-color: darken(var(--c_blue, 5%));
                }
              }
              &.bg2 {
                color: var(--c_blue);
                &:before {
                  content: '';
                  display: block;
                  border: 1px solid;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  pointer-events: none;
                  border-radius: 10px;
                  border-color: var(--c_blue);
                }
                &:active {
                  background-color: darken(#fff, 5%);
                }
              }
            }
            &.btn-download {
              width: 50%;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }

</style>
