import React, { useState } from 'react'

import BaseForm from '@/components/base-form'
import { loginForm } from '@/components/base-form/login-form'
import { Button, message } from 'antd'

import loginImg from '@/assets/img/bg.png'
import useBaseForm from '@/hooks/useBaseForm'
import { ILoginUser, IResp } from '@/type'
import { useNavigate } from 'react-router-dom'
import { ILoginResp, login } from '@/service/auth'
import { useSyncLocalStorage } from '@/hooks/useSyncLocalStorage'
import axios, { AxiosResponse } from 'axios'
import useWebsocket from '@/hooks/useWebsocket'
import { createNotice } from '@/service/notice'
import { formatTimeV2 } from '@/utils'

const Login = function () {
  const { form } = useBaseForm()
  const [title, setTitle] = useState<'face' | 'phone'>('phone')
  const [userInfo, setUserInfo] = useSyncLocalStorage<ILoginResp>("user_info")
  const [videoEl, setVideoEl] = useState<any>()
  const { ws } = useWebsocket()
  const nav = useNavigate()

  function handleChange() {
    setTitle(title == 'face' ? 'phone' : 'face')
    title == 'phone' ? getCamera() : closeCamera()
  }

  async function getCamera() {
    try {
      const v = document.getElementById('video') as HTMLVideoElement
      setVideoEl(v)
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      v.srcObject = mediaStream
    } catch (error) {
      console.error("🚀 ~ getCamera ~ error:", error)
    }
  }

  function closeCamera() {
    if (videoEl) {
      const stream = videoEl.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(function (track: any) {
        track.stop();
      });
      videoEl.srcObject = null;
    }
  }

  function handleLogin() {
    if (title == 'phone') {
      form.validateFields().then(async (values: ILoginUser) => {
        if (values.phone == undefined || values.password == undefined) {
          return message.error('请输入手机号或密码')
        }
        if (values.phone.trim() == '' || values.password.trim() == '') {
          return message.error('手机号或密码不能为空')
        }
        login({ phone: values.phone, password: values.password }).then(res => {
          if (res.code == 200) {
            setUserInfo(res.data)
            if (res.data?.role_id == 1) {
              return nav('/home')
            }
            return nav('/client/' + res.data?.user_id)
          }
          message.error(res.msg)
        })
      }).catch((info) => {
        console.log('Validate Failed:', info)
      })
    } else {
      handleRecognition()
    }
  }

  function handleRecognition() {
    const photoEl = document.getElementById("photo") as HTMLCanvasElement
    const ctx = photoEl.getContext('2d')
    ctx?.drawImage(videoEl, 0, 0, 240, 180)
    const dataURL = photoEl.toDataURL("image/jpeg");
    const param = new FormData()
    param.append("file", base64UrlToBlob(dataURL))
    axios.post('http://localhost:8088/api/v1/auth/face', param, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res: AxiosResponse<IResp<ILoginResp>>) => {
      if (res.data.code == 200) {
        setUserInfo(res.data.data!)
        closeCamera()
        if (res.data?.data?.role_id == 1) {
          return nav('/home')
        }
        return nav('/client/' + res.data.data?.user_id)
      }
      if (res.data.msg == '人脸数据不存在') {
        const message = "有陌生人靠近"
        ws.send(formatTimeV2(new Date().getTime()) + " : " + message)
        createNotice({ message }).then(res => {
          console.log("🚀 ~ createNotice ~ res:", res)
        }).catch(err => {
          console.log("🚀 ~ createNotice ~ err:", err)
        })
      }
      message.open({
        type: "error",
        content: res.data.msg
      })
    })
  }

  function base64UrlToBlob(url: string) {
    const bytes = window.atob(url.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpg' });
  }

  return (
    <div className="h-[100vh] flex items-center justify-center ">
      <div className="w-[900px] rounded-lg overflow-hidden flex justify-between">
        <div className="p-5  flex-1 flex flex-col justify-between ">
          <h1 className='font-bold'>{title == 'face' ? '人脸识别登录' : '手机号登录'}</h1>
          {title == 'phone' &&
            <BaseForm
              data={loginForm}
              form={form}
              labelCol={4}
              childLayout="center"
            />
          }
          <div className='flex justify-center  rounded-xl overflow-hidden'>
            <video id="video" loop autoPlay muted className={title == 'phone' ? 'hidden' : 'rounded-xl my-3'}></video>
          </div>
          <canvas id="photo" width={240} height={180} className="hidden"></canvas>
          <div className='mx-auto '>
            <Button type='primary' onClick={handleLogin} >登录</Button>
          </div>
          <div>
            <a onClick={handleChange} className="text-xs cursor-pointer hover:text-blue-500">{title == 'face' ? '手机号登录' : '人脸识别登录'}</a>
            <span className='mx-2 text-slate-500'>|</span>
            <a className="text-xs cursor-pointer hover:text-blue-500">人脸识别离开</a>
            <div>
              <a className="text-xs cursor-pointer hover:text-blue-500">找回密码</a>
            </div>
          </div>
        </div>
        {title == 'phone' && <img className="w-[500px] object-cover" src={loginImg} alt="bg" />}
      </div>
    </div>
  )
}

export default Login

// 设置一个方便调试的name 可以不写 默认为组件名称
Login.displayName = 'Login'
