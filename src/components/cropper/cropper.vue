<!-- cropper -->
<template>
  <div class="alert-body" :class="{'show': flag.imgHasLoad}">
    <div class="alert">
      <span class="alert-close" @click="cancalChooseImage"></span>
      <div class="cropper">
        <div class="cropper-box" ref="cropperBox">
          <img src="../../assets/img.png" alt="upload" ref="uploadPreview">
        </div>
        <div class="cropper-res-wrap">
          <div class="cropper-res" ref="cropperRes">
            <img src="../../assets/img.png" alt="" style="width:100px;height:100px;" ref="previewImage">
          </div>
        </div>
      </div>
      <div class="btns cropper-btn">
        <a href="#" class="btn bg1" @click="finishCropImage()">完成</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'

  export default {
    data() {
      return {
        cropper: null,
        URL: null,
        file: null,
        flag: {
          cropperHasInit: false,
          imgHasLoad: false,
          support: false
        }
      }
    },

    mounted() {
      this.checkSupport()
      if (this.flag.support) {
        this.loadCropper()
      }
    },

    methods: {
      init(file) {
        if (this.flag.support) {
          const reader = new FileReader()
          const blobURL = this.URL.createObjectURL(file)
          const that = this

          this.file = file
          reader.readAsDataURL(file)
          reader.onload = function () {
            that.replaceUrl(blobURL, reader.result)
          }
        }
      },
      replaceUrl(url, src) {
        this.$refs.uploadPreview.src = src
        if (!this.flag.cropperHasInit) {
          this.loadCropper()
        }
        if (this.cropper) {
          this.cropper.reset()
        }
        this.flag.imgHasLoad = true
        this.cropper.replace(url)
      },
      loadCropper() {
        const image = this.$refs.uploadPreview
        const preview = this.$refs.cropperRes
        const previewImage = this.$refs.previewImage
        const option = {
          aspectRatio: 1 / 1,
          ready: function () {
            previewImage.src = image.src
          },
          crop: function (event) {
            const cropper = this.cropper
            const imageData = cropper.getImageData()
            const previewAspectRatio = event.detail.width / event.detail.height
            const previewWidth = preview.offsetWidth
            const previewHeight = previewWidth / previewAspectRatio
            const imageScaleRatio = event.detail.width / previewWidth

            preview.style.height = `${previewHeight}px`
            previewImage.style.width = `${imageData.naturalWidth /
            imageScaleRatio}px`
            previewImage.style.height = `${imageData.naturalHeight /
            imageScaleRatio}px`
            previewImage.style.marginLeft = `${-event.detail.x / imageScaleRatio}px`
            previewImage.style.marginTop = `${-event.detail.y / imageScaleRatio}px`
          }
        }
        this.cropper = new Cropper(image, option)
        this.flag.cropperHasInit = true
      },
      finishCropImage() {
        const croppedCanvas = this.cropper.getCroppedCanvas({
          width: 200,
          height: 200
        })
        const imgDataUrl = croppedCanvas.toDataURL()
        this.revokeFile()
        this.$emit('finish', imgDataUrl)
      },
      cancalChooseImage() {
        this.revokeFile()
        this.$emit('cancel')
      },
      revokeFile() {
        // 释放对象file占用的内存
        this.flag.imgHasLoad = false
        this.URL.revokeObjectURL(this.file)
        this.file = null
      },
      checkSupport() {
        this.flag.support = !!(window.FileReader && (window.URL || window.webkitURL))
        if (this.flag.support) {
          this.URL = window.URL || window.webkitURL
        }
      }
    }
  }

</script>
<style>
  @import url(../../../node_modules/cropperjs/src/css/cropper.css);
  .alert-body {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    font-size: 0;
    text-align: center;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: scale(2);
    &:before {
      content: '\3000';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    &>.alert-mask {
      opacity: 0;
      visibility: hidden;
      transform: scale(2);
      transition: all 0.3s ease;
      padding: 30px;
      position: fixed;
      top: 50px;
      left: 0;
      right: 0;
      width: 600px;
      margin: auto;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      &.show {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    }

    &>.alert {
      display: inline-block;
      vertical-align: middle;
      width: 600px;
      padding: 30px;
      background-color: #fff;
      &>.alert-close {
        position: absolute;
        width: 30px;
        height: 30px;
        margin: -30px 0 0 300px;
        &:after {
          content: '\2715';
          font-family: system-ui;
          line-height: 30px;
          font-size: 16px;
          color: #34495e;
        }
      }
      &>.cropper {
        position: relative;
        width: 600px;
        height: 460px;
        background-color: var(--c2);
        box-sizing: border-box;
        padding: 80px 150px;

        &>.cropper-box {
          width: 300px;
          height: 300px;
        }
        &>.cropper-res-wrap {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          padding: 15px;
          background-color: #f8f8f8;
          &>.cropper-res {
            width: 100px;
            height: 100px;
            border: 1px solid #999;
            background-color: #fff;
            overflow: hidden;
          }
        }
      }
      &>.btns {
        width: 100%;
        &>.btn {
          display: block;
          border-radius: 5px;
          margin: 10px 5px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          background-color: #648fe7;
          transition: background-color 0.3s ease;
        }
      }
    }
  }

</style>
