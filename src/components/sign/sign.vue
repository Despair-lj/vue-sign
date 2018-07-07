<!-- sign -->
<template>
  <div class="main" ref="main">
    <div class="main-wrapper">
      <div class="preview">
        <h4 class="type">预览</h4>
        <div class="sign" :style="{backgroundColor:style.bg}" ref="sign">
          <div class="logo">
            <img src="../../assets/logo.jpeg" alt="logo" @click="flag.showColorSetting = !flag.showColorSetting" ref="previewLogo">
          </div>
          <div class="img">
            <img src="../../assets/img.png" alt="头像" ref="previewAvatar">
          </div>
          <div class="line" :style="{backgroundColor: style.line}">line</div>
          <div class="info">
            <div class="info-wrapper">
              <div class="title">
                <span class="ename">{{info.ename || 'NAME'}}</span>
                <span class="cname">{{info.cname || '姓名'}}</span>
                <span class="hr" :style="{backgroundColor: style.title}">line</span>
                <span class="group">{{info.group || '所属部门'}}</span>
              </div>
              <div class="contact" :style="{color: style.item}">
                <div class="item">
                  <i class="iconfont" :style="{color:style.icon}">&#xe6ad;</i>
                  <span>{{(info.contact.phone || '123-4567-89012') | formatTelNo }}</span>
                </div>
                <div class="item">
                  <i class="iconfont" :style="{color:style.icon}">&#xe511;</i>
                  <span>{{(info.contact.call || '0755-32995555-1234') | formatOfficeNo }}</span>
                </div>
                <div class="item">
                  <i class="iconfont" :style="{color:style.icon}">&#xe639;</i>
                  <span>{{info.contact.qq || 'your qq'}}</span>
                </div>
                <div class="item">
                  <i class="iconfont" :style="{color:style.icon}">&#xe61a;</i>
                  <span>{{info.contact.wechat || 'your wechat'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 class="color-setting" @click="flag.showColorSetting = !flag.showColorSetting">配色</h4>
      </div>
      <div class="setting">
        <div class="setting-wrapper" :class="{'slide': flag.showColorSetting}">
          <div class="form">
            <div class="form-row input-required">
              <div class="form-row-wrapper">
                <label for="image" class="label">头像</label>
                <div class="input-file">
                  <span class="input-name">上传图片</span>
                  <input type="file" ref="avatar" @change="uploadImage" data-dest="avatar" class="uploadImage" id="image">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="cname" class="label">中文名</label>
                <input type="text" name="cname" placeholder="中文名" class="input-text" id="cname" v-model="info.cname">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="ename" class="label">英文名</label>
                <input type="text" name="ename" placeholder="英文名" class="input-text" id="ename" v-model="info.ename">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="group" class="label">所属部门</label>
                <input type="text" name="group" placeholder="所属部门" class="input-text" id="group" v-model="info.group">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="phone" class="label">手机号码</label>
                <input type="text" name="phone" placeholder="手机号码" class="input-text" id="phone" v-model="info.contact.phone">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="call" class="label">办公号码</label>
                <input type="text" name="call" placeholder="办公号码" class="input-text" id="call" v-model="info.contact.call">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="qq" class="label">QQ</label>
                <input type="text" name="qq" placeholder="QQ" class="input-text" id="qq" v-model="info.contact.qq">
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="wechat" class="label">微信</label>
                <input type="text" name="wechat" placeholder="微信" class="input-text" id="wechat" v-model="info.contact.wechat">
              </div>
            </div>
            <div class="btns btn-download">
              <a href="#" class="btn bg1" @click="downloadRes">生成签名</a>
            </div>
          </div>
          <div class="form">
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="logo" class="label">Logo</label>
                <div class="input-file">
                  <span class="input-name">上传图片</span>
                  <input type="file" class="uploadImage" data-dest="logo" id="logo" @change="uploadImage" ref="logo">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label class="label" for="lineColor">分割线</label>
                <div class="input-color">
                  <label for="lineColorChoose" :style="{backgroundColor: style.line}"></label>
                  <input type="color" id="lineColorChoose" v-model="style.line">
                  <input type="text" class="input-text" id="lineColor" v-model.lazy="style.line" @change="changeLine" maxlength="7">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="nameColor" class="label">名字\分组</label>
                <div class="input-color">
                  <label for="nameColorChoose" :style="{backgroundColor: style.title}"></label>
                  <input type="color" id="nameColorChoose" v-model="style.title">
                  <input type="text" class="input-text" id="nameColor" v-model.lazy="style.title" @change="changeTitle">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="infoColor" class="label">个人信息</label>
                <div class="input-color">
                  <label for="infoColorChoose" :style="{backgroundColor: style.item}"></label>
                  <input type="color" id="infoColorChoose" v-model="style.item">
                  <input type="text" class="input-text" id="infoColor" v-model.lazy="style.item" @change="changeItem">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="iconColor" class="label">图标颜色</label>
                <div class="input-color">
                  <label for="iconColorChoose" :style="{backgroundColor: style.icon}"></label>
                  <input type="color" id="iconColorChoose" v-model="style.icon">
                  <input type="text" class="input-text" id="iconColor" v-model.lazy="style.icon" @change="changeIcon">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-row-wrapper">
                <label for="bgColor" class="label">面板底色</label>
                <div class="input-color">
                  <label for="bgColorChoose" :style="{backgroundColor: style.bg}"></label>
                  <input type="color" id="bgColorChoose" v-model="style.bg">
                  <input type="text" class="input-text" id="bgColor" v-model.lazy="style.bg" @change="changeBg">
                </div>
              </div>
            </div>
            <div class="btns">
              <a href="#" class="btn bg2" @click="resetColors()">重制</a>
              <a href="#" class="btn bg1" @click="flag.showColorSetting=false">保存并返回</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="main-close"></span>
    <cropper ref="cropper" @cancel="cancelChooseImage" @finish="finishChooseImage"></cropper>
  </div>
</template>

<script>
  import Cropper from '../cropper/cropper'
  import html2canvas from 'html2canvas'
  export default {
    data() {
      return {
        info: {
          ename: '',
          cname: '',
          group: '',
          contact: {
            qq: '',
            wechat: '',
            call: '',
            mobile: ''
          }
        },
        style: {
          logo: '',
          title: '#000000',
          item: '#999999',
          icon: '#648fe7',
          bg: '#eeeeee',
          line: '#000050'
        },
        flag: {
          showBowserUnsupport: false,
          showColorSetting: false
        },
        img: ''
      }
    },
    filters: {
      formatTelNo(val) {
        if (val) {
          val = val.replace(/\D/g, '')
          return val.replace(/\B(?=(\d{4})+(?!\d))/g, '-')
        }
      },
      formatOfficeNo(val) {
        if (val) {
          val = val.replace(/\D/g, '')
          return val.replace(/^(\d{4})/, function (first) {
            return `${first}-`
          })
          // 使用如下的正则表达式在Chrome正常运行，而在FireFox和Safari中会错误
          // return val.replace(/(?<=\d{4})\B/, '-')
        }
      }
    },
    methods: {
      resetColors() {
        this.style = {
          title: '#000000',
          item: '#999999',
          icon: '#648fe7',
          bg: '#eeeeee',
          line: '#000050'
        }
      },
      changeLine(e) {
        this.style.line = this.formatColor(e.target.value)
      },
      changeBg(e) {
        this.style.bg = this.formatColor(e.target.value)
      },
      changeIcon(e) {
        this.style.icon = this.formatColor(e.target.value)
      },
      changeItem(e) {
        this.style.item = this.formatColor(e.target.value)
      },
      changeTitle(e) {
        this.style.title = this.formatColor(e.target.value)
      },
      formatColor(color) {
        const reg = /[^0-9a-fA-F]/g
        color = color.replace(reg, '')
        switch (color.length) {
          case 1:
            color = `${color}${color}${color}${color}${color}${color}`
            break
          case 2:
            color = `${color}${color}${color}`
            break
          case 3:
            color = this.rgba2Rgb(`${color}F`)
            break
          case 4:
            color = this.rgba2Rgb(color)
            break
          case 5:
            color = `${color}F`
            break
        }
        return `#${color}`
      },
      rgba2Rgb(color) {
        const [r, g, b, a] = color.split('').map(item => parseInt(item + item, 16))
        const oldAlpha = a / 255
        const alpha = 1 - oldAlpha
        const red = Math.round((oldAlpha * (r / 255) + alpha) * 255).toString(16)
        const green = Math.round((oldAlpha * (g / 255) + alpha) * 255).toString(16)
        const blue = Math.round((oldAlpha * (b / 255) + alpha) * 255).toString(16)
        return `${red}${green}${blue}`
      },
      uploadImage(e) {
        const files = e.target.files
        if (files.length === 0 || !this.isImage(files[0].type)) {
          alert('you have to select an image file!')
          e.target.value = ''
          return
        }
        const file = files[0]
        this.img = e.target.dataset.dest
        this.$refs.cropper.init(file)
      },
      isImage(type) {
        const filter =
          /^(?:image\/bmp|image\/cis-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg+xml|image\/tiff|image\/x-cmu-raster|image\/x-cmx|image\/x-icon|image\/x-portable-anymap|image\/x-portable-bitmap|image\/x-portable-graymap|image\/x-portable-pixmap|image\/x-rgb|image\/x-xbitmap|image\/x-xpixmap|image\/x-xwindowdump)$/i
        return !!filter.test(type)
      },
      cancelChooseImage() {
        this.$refs[`${this.img}`].value = ''
      },
      finishChooseImage(url) {
        const img = this.img
        const name = `preview${img.slice(0, 1).toUpperCase()}${img.slice(1)}`
        this.$refs[name].src = url
        this.cancelChooseImage()
      },
      downloadRes() {
        // 不能有before、after等伪类，在Chrome和Firefox中输出图片没有问题，但是在Safari中输出会存在问题
        html2canvas(this.$refs.sign).then((canvas) => {
          const url = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
          const name = `sign_${Date.now()}.png`
          this.saveFile(url, name)
        })
      },
      saveFile(data, filename) {
        // chrome可以不用添加在dom就可以触发下载操作，Firefox需要将标签添加到dom上才会触发下载操作
        const saveLink = document.createElement('a')
        saveLink.href = data
        saveLink.download = filename
        saveLink.style.display = 'none'
        this.$refs.main.appendChild(saveLink)
        saveLink.click()
        this.$refs.main.removeChild(saveLink)
      }
    },
    components: {
      Cropper
    }
  }

</script>
<style>
  :root {
    --c_blue: #648fe7;
    --c_blue_darken: #4e7fe4;
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

  @font-face {
    font-family: 'iconfont';
    src: url('../../assets/font/iconfont.eot');
    src: url('../../assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../assets/font/iconfont.woff') format('woff'),
    url('../../assets/font/iconfont.ttf') format('truetype'),
    url('../../assets/font/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 860px;
    height: 600px;
    background: #fff;
    &>.main-wrapper {
      padding: 50px 100px 25px 100px;
      &>.preview {
        padding: 30px;
        background-color: #f8f8f8;
        border-radius: 5px;
        font-size: 0;
        &>.sign {
          font-size: 0;
          display: inline-block;
          vertical-align: top;
          &>div {
            display: inline-block;
          }
          &>.logo,
          &>.img {
            display: inline-block;
            width: 100px;
            height: 100px;
            &>img {
              width: 100%;
            }
          }
          ,
          &>.line {
            width: 3px;
            height: 100px;
            font-size: 0;
          }
          &>.info {
            width: 397px;
            height: 100px;
            vertical-align: top;
            &>.info-wrapper {
              padding: 14px 25px 0;
              text-align: left;
              &>.title {
                white-space: nowrap;
                font-weight: bold;
                font-size: 16px;
                line-height: 1;
                margin-bottom: 15px;
                &>.hr {
                  vertical-align: top;
                  display: inline-block;
                  width: 3px;
                  height: 16px;
                  font-size: 0;
                }

              }
              &>.contact {
                &>.item {
                  display: inline-block;
                  width: 50%;
                  font-size: 14px;
                  margin-bottom: 8px;
                  white-space: nowrap;
                  &:nth-last-of-type(1),
                  &:nth-last-of-type(2) {
                    margin-bottom: 0;
                  }
                  &:not(:first-child)>.iconfont {
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
        &>.type {
          position: absolute;
          margin: -25px 0 0 -20px;
          font-size: 12px;
          color: #ccc;
        }
        &>.color-setting {
          position: absolute;
          display: inline-block;
          margin: -30px 30px 0 0;
          width: 30px;
          height: 35px;
          background: url(../../assets/colors.png) no-repeat;
          background-size: 30px auto;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      &>.setting {
        overflow: hidden;
        &>.setting-wrapper {
          transition: transform 0.5s ease;
          transform: translateX(0);
          white-space: nowrap;
          font-size: 0;
          &.slide {
            transform: translateX(-100%);
          }
          &>.form {
            display: inline-block;
            width: 100%;
            margin: 30px auto 15px;
            white-space: normal;
            vertical-align: top;
            &>.form-row {
              display: inline-block;
              width: 50%;
              margin-bottom: 15px;
              &>.form-row-wrapper {
                padding: 0 60px;
                & input {
                  width: 100%;
                  line-height: 32px;
                  font-size: 14px;
                  outline: none;
                  border-radius: 4px;
                  &.error {
                    color: var(--c_red);
                    border-color: var(--c_red);
                  }
                  &::-webkit-input-placeholder {
                    color: #bdc3c7;
                  }
                }
                & .label {
                  display: block;
                  font-size: 14px;
                  font-weight: bold;
                  color: var(--c_head);
                  margin-bottom: 10px;
                }
                & .input-text {
                  padding-left: 15px;
                  border: 1px solid var(--c_input_default);
                  color: var(--c_black);
                  background-color: #fff;
                  box-sizing: border-box;
                  &:focus {
                    border-color: var(--c_input);
                  }
                }
                &>.input-file {
                  position: relative;
                  width: 100%;
                  height: 32px;
                  line-height: 32px;
                  text-align: center;
                  border-radius: 4px;
                  color: #fff;
                  background-color: var(--c_input);
                  &.active {
                    background-color: darken(var(--c_input), 5%);
                  }
                  &>.input-name {
                    font-size: 14px;
                  }
                  &>input {
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  }
                }
                &>.input-color {
                  padding-left: 35px;
                  &>label {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    margin: 1px 0 0 -35px;
                    border: 1px solid;
                  }
                  &>input[type="color"] {
                    /*不能设置为display:none，若设置则无法更新数据*/
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    opacity: 0;
                  }
                  &>input[type="text"] {
                    box-sizing: border-box;
                  }
                }
              }
            }
            &>.btns {
              width: 100%;
              margin: 0 -5px;
              font-size: 0;
              &>.btn {
                display: inline-block;
                width: 45%;
                border-radius: 5px;
                margin: 10px 5px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                transition: background-color 0.3s ease;
                &.bg1 {
                  background-color: var(--c_blue);
                  &:active {
                    background-color: var(--c_blue_darken);
                  }
                }
                &.bg2 {
                  color: var(--c_blue);
                  position: relative;
                  &:before {
                    content: '';
                    display: block;
                    border: 1px solid #ddd;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    pointer-events: none;
                    border-radius: 10px;
                    border-color: var(--c_blue);
                  }
                  &:active {
                    background-color: #f2f2f2;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
