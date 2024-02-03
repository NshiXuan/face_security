import React, { useEffect, useState } from "react"

import { Table, Tag, Button } from "antd"
import { ColumnsType } from "antd/es/table"
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'

import useTable from "@/hooks/useTable"
import { faces } from "@/data/face-data"
import { IFace } from "@/type"
import { formatTimeV3 } from "@/utils"
import BaseForm, { IFormItem } from "@/components/base-form"
import useBaseForm from "@/hooks/useBaseForm"
import BaseModal from "@/components/base-modal"

const Face = function () {
  const { loading, rowSelection, pagination, handlePageChange } = useTable()
  const { form, handleFinish } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)
  const [videoEl, setVideoEl] = useState<any>(null)
  const [showEntryNote, setShowEntryNote] = useState(false)
  let photoEl: HTMLCanvasElement

  async function getCamera() {
    try {
      // TODO(nsx): 将 videoEL 换成通过 Ref 获取
      const v = document.getElementById('video') as HTMLVideoElement
      setVideoEl(v)
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      v.srcObject = mediaStream
    } catch (error) {
      console.error("🚀 ~ getCamera ~ error:", error)
    }
  }

  function closeCamera() {
    const stream = videoEl.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track: any) {
      track.stop();
    });
    videoEl.srcObject = null;
  }

  function handleEntry() {
    photoEl = document.getElementById("photo") as HTMLCanvasElement
    const ctx = photoEl.getContext('2d')
    ctx?.drawImage(videoEl, 0, 0, 240, 180)
  }

  function clearPhoto() {
    if (photoEl) {
      const ctx = photoEl.getContext('2d');
      ctx?.clearRect(0, 0, photoEl.width, photoEl.height);
    }
  }

  function handleOpen() {
    setIsOpen(true)
    getCamera()
  }

  function handleCancel() {
    setIsOpen(false)
    closeCamera()
    clearPhoto()
  }

  function handleOk() {
    form.validateFields().then((values) => {
      if (photoEl) {
        const dataURL = photoEl.toDataURL("image/jpeg");
        // TODO(nsx): 发送录入人脸请求
        console.log("🚀 ~ form.validateFields ~ base64UrlToBlob(dataURL):", base64UrlToBlob(dataURL))

        closeCamera()
        clearPhoto()
        setIsOpen(false)
        form.resetFields()
      }

      setShowEntryNote(true)
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
  }

  // Note(nsx): File对象是Blob对象的子类。之所以File可以上传到服务器，是因为继承了Blob。所以你可以直接把Blob当文件传到服务器上。补充一下，之所以建议用Blob以上传文件的形式发送请求，是因为post请求中 body允许传递的字符长度是有限的，如果你直接把一个base64字符塞到body中，容易出现post请求body太长而导致请求失败
  function base64UrlToBlob(url: string) {
    // 去掉url的头，并转换为 byte
    const bytes = window.atob(url.split(',')[1]);

    // 处理异常,将 ascii 码小于 0 的转换为大于 0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpg' });
  }

  const columns: ColumnsType<IFace> = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (name: string) => {
        return <span >{name}</span>
      }
    },
    {
      title: '人脸图片',
      dataIndex: 'image',
      render: (image: string) => {
        return <Tag color="blue">{image}</Tag>
      }
    },
    {
      title: '备注',
      dataIndex: 'remake',
      render: (remake: string) => {
        return <span>{remake == '' ? '/' : remake}</span>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'ctime', // dataIndex必须映射好 不如render拿不到数据
      render: (value: number) => {
        return <div>{value ? formatTimeV3(value) : '/'}</div>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'mtime',
      render: (value: number) => {
        return <div>{value ? formatTimeV3(value) : '/'}</div>
      }
    },
    {
      title: '操作',
      render: (item: IFace) => {
        return (
          <div className="flex gap-3 ">
            <Button type="primary" icon={<FormOutlined />} onClick={handleOpen}>
              编辑
            </Button>
            <Button type="primary" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  const faceForm: IFormItem[] = [
    {
      type: 'input',
      label: '姓名',
      name: 'name',
      allowClear: true,
      rules: [{ required: true, message: '姓名是必须的' }]
    }
  ]

  return (
    <div className="px-5">
      <Button type="primary" className="mb-2" onClick={handleOpen}>录入人脸</Button>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={faces}
        loading={loading}
        pagination={pagination}
        onChange={handlePageChange} />

      <BaseModal open={isOpen} title="人脸录入" width={1200} handleCancel={handleCancel} handleOk={handleOk} >
        <BaseForm form={form} data={faceForm} childLayout="left" onFinish={handleFinish}>
          <div className="flex gap-4 ">
            <div>
              <video id="video" width={800} height={600} loop autoPlay muted className="rounded-md"></video>
              <div className="mt-2 flex justify-center">
                <Button type="primary" onClick={handleEntry} >录入</Button>
              </div>
            </div>

            <div>
              <div className="mb-2 font-bold">人脸预览</div>
              {showEntryNote && <span className="text-red-500">请录入人脸</span>}
              <canvas id="photo" width={240} height={180} className="rounded-md"></canvas>
            </div>
          </div>
        </BaseForm>
      </BaseModal>
    </div >
  )
}

export default Face

// 设置一个方便调试的name 可以不写 默认为组件名称
Face.displayName = "Face"