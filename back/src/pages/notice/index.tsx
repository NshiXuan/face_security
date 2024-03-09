import React, { useEffect, useState } from "react"

import { Button, Popconfirm, Table, DatePicker, message } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"

import { INotice } from "@/type"
import { formatTimeV2 } from "@/utils"
import useTable from "@/hooks/useTable"
import { deleteNotice, deleteNotices, getNoticeList, getNoticesByTime } from "@/service/notice"

const { RangePicker } = DatePicker;


const Notice = function () {
  const { loading, rowSelection, selectedRowKeys, pagination, setPagination, handlePageChange } = useTable()
  const [notices, setNotices] = useState<INotice[]>([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    handleGetNotices()
  }, [])

  function handleGetNotices() {
    getNoticeList().then(res => {
      if (res.code == 200) {
        setNotices([...res.data!])
      }
    })
  }

  function handleConfirm(id: number) {
    deleteNotice(id).then(res => {
      if (res.code == 200) {
        handleGetNotices()
        message.success("删除成功!")
      }
    })
  }

  function handleChange(values: any) {
    // Note(nsx): valueOf获取的是毫秒
    const start = Math.floor(values[0].valueOf() / 1000)
    setStart(start)
    const end = Math.floor(values[1].valueOf() / 1000)
    setEnd(end)
  }

  function handleSearch() {
    getNoticesByTime({ start: start, end: end }).then(res => {
      if (res.code == 200) {
        setNotices([...res.data!])
      }
    })
  }

  function handleReset() {
    handleGetNotices()
    setPagination({
      current: 1,
      position: ['bottomCenter']
    })
  }

  function handleBatchDelete() {
    if (selectedRowKeys.length > 0) {
      deleteNotices(selectedRowKeys as any).then(res => {
        if (res.code == 200) {
          handleGetNotices()
          // TODO(nsx): 将 selectedRowKeys 置为 0
        }
      })
    } else {
      message.warning("请勾选删除内容")
    }
  }

  const columns: ColumnsType<INotice> = [
    {
      title: '信息',
      dataIndex: 'message',
      render: (msg: string) => {
        return <span>{msg == '' ? '/' : msg}</span>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      render: (value: number) => {
        return <div>{value ? formatTimeV2(value) : '/'}</div>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'mtime',
      render: (value: number) => {
        return <div>{value ? formatTimeV2(value) : '/'}</div>
      }
    },
    {
      title: '操作',
      render: (item: INotice) => {
        return (
          <div className="flex gap-3 ">
            <Popconfirm title="确认删除吗？" cancelText="取消" okText="确认" onConfirm={() => handleConfirm(item.id)}>
              <Button type="primary" icon={<DeleteOutlined />} danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  return (
    <div className="px-5">
      <div className="my-2 flex gap-4">
        <Popconfirm title="确认删除吗？" cancelText="取消" okText="确认" onConfirm={handleBatchDelete}>
          <Button type='primary' danger>批量删除</Button>
        </Popconfirm>
        <RangePicker showTime onChange={handleChange} />
        <Button type="primary" onClick={handleSearch}>搜索</Button>
        <Button type="primary" onClick={handleReset}>重置</Button>
      </div>
      <Table
        rowKey={(record) => record.id}
        dataSource={notices}
        columns={columns}
        loading={loading}
        pagination={pagination}
        rowSelection={rowSelection}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Notice

