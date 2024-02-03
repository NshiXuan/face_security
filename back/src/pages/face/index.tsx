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

  async function getCamera() {
    try {
      // TODO(nsx): 将 videoEL 换成通过 Ref 获取
      const v = document.getElementById('video') as any
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
    const photo = document.getElementById("photo") as HTMLCanvasElement
    const ctx = photo.getContext('2d')
    ctx?.drawImage(videoEl, 0, 0, 240, 180)
  }

  function clearPhoto() {
    const photo = document.getElementById("photo") as HTMLCanvasElement;
    const ctx = photo.getContext('2d');
    ctx?.clearRect(0, 0, photo.width, photo.height);
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
      form.resetFields()
      closeCamera()
      clearPhoto()
      setIsOpen(false)
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
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