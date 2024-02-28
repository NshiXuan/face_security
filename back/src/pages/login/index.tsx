import React, { useState } from 'react'

import BaseForm from '@/components/base-form'
import { loginForm } from '@/components/base-form/login-form'
import { Button, message } from 'antd'

import loginImg from '@/assets/img/bg.png'
import useBaseForm from '@/hooks/useBaseForm'
import { ILoginUser } from '@/type'
import { useNavigate } from 'react-router-dom'
import { login } from '@/service/auth'
import { useSyncLocalStorage } from '@/hooks/useSyncLocalStorage'

const Login = function () {
  const { form } = useBaseForm()
  const [title, setTitle] = useState<'face' | 'phone'>('phone')
  const [token, setToken] = useSyncLocalStorage("token")
  const [videoEl, setVideoEl] = useState<any>()
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
            console.log("🚀 ~ login ~ res.data!.token:", res.data!.token)
            setToken(res.data!.token)
            return nav('/home')
          }
          message.error(res.msg)
        })
      }).catch((info) => {
        console.log('Validate Failed:', info)
      })
    } else {
      console.log("🚀 ~ handleLogin ~ title:", title)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center ">
      <div className="w-[900px] rounded-lg overflow-hidden flex justify-between">
        <div className="p-5  flex-1 flex flex-col justify-between ">
          <h2>{title == 'face' ? '人脸识别登录' : '手机号登录'}</h2>
          {title == 'phone' &&
            <BaseForm
              data={loginForm}
              form={form}
              labelCol={4}
              childLayout="center"
            />
          }
          <video id="video" loop autoPlay muted className={title == 'phone' ? 'hidden' : 'rounded-md my-3'}></video>
          <div className='mx-auto '>
            <Button type='primary' onClick={handleLogin} >登录</Button>
          </div>
          <div>
            <a onClick={handleChange} className="text-xs cursor-pointer hover:text-blue-500">{title == 'face' ? '手机号登录' : '人脸识别登录'}</a>
            <span className='mx-2 text-slate-500'>|</span>
            <a className="text-xs cursor-pointer hover:text-blue-500">找回密码</a>
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
