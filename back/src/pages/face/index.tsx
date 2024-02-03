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
import faceImg from '@/assets/img/pinia.png'
import BaseModal from "@/components/base-modal"

const Face = function () {
  const { loading, rowSelection, pagination, handlePageChange } = useTable()
  const { form, handleFinish } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)
  // TODO(nsx): 将 videoEL 换成通过 Ref 获取
  const videoEl = document.getElementById('video') as any

  useEffect(() => {
    // const canvas = document.getElementById('canvas') as any;
    // const context = canvas.getContext('2d');

    // const tracker = new tracking.ObjectTracker('face');
    // tracker.setInitialScale(4);
    // tracker.setStepSize(2);
    // tracker.setEdgesDensity(0.1);

    // tracking.track('#video', tracker, { camera: true });

    // tracker.on('track', function (event) {
    //   context.clearRect(0, 0, canvas.width, canvas.height);

    //   event.data.forEach(function (rect) {
    //     context.strokeStyle = '#a64ceb';
    //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //     context.font = '11px Helvetica';
    //     context.fillStyle = "#fff";
    //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    //   });
    // });
  }, [])


  async function getCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      // videoEl?.setAttribute('src', mediaStream)
      videoEl.srcObject = mediaStream
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

  function handleOpen() {
    setIsOpen(true)
    getCamera()
  }

  function handleCancel() {
    setIsOpen(false)
    closeCamera()
  }

  function handleOk() {
    form.validateFields().then((values) => {
      form.resetFields()
      closeCamera()
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

      <BaseModal open={isOpen} title="人脸录入" width={800} handleCancel={handleCancel} handleOk={handleOk} >
        <BaseForm form={form} data={faceForm} onFinish={handleFinish}>
          <div className="relative">
            <video id="video" loop autoPlay muted className="w-[800px] h-[500px] bg-blue-300 absolute top-0 left-0 " ></video>
            <canvas id="canvas" className="w-[800px] h-[500px]  "></canvas>
          </div>
          <div>
            <div className="py-2 font-bold">人脸预览</div>
            <img src={faceImg} alt="face" className="w-36 h-30" />
          </div>
        </BaseForm>
      </BaseModal>
    </div >
  )
}

export default Face

// 设置一个方便调试的name 可以不写 默认为组件名称
Face.displayName = "Face"