import React from 'react'

import { Button, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

import { formatTimeV1, mapRole } from '@/utils'
import { TestUserList } from '@/data/user-data'
import useTable from '@/hooks/useTable'
import { IUser } from '@/type'
import { TestRoleList } from '@/data/role-data'
import useBaseModal from '@/hooks/useBaseModal'

const User = function () {
  const { rowSelection, pagination, loading, handlePageChange } = useTable()
  const { isModalOpen, handleCancelModal, handleOpenModal, form } = useBaseModal()

  // 映射表格的每一列
  const columns: ColumnsType<IUser> = [
    {
      title: '用户名',
      dataIndex: 'username',
      render: (value: string, item: IUser) => {
        return <span className="cursor-pointer">{value}</span>
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: (value: number) => {
        // 如果手机号不存在就展示/
        return <div>{value ? value : '/'}</div>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'ctime', // dataIndex必须映射好 不如render拿不到数据
      render: (value: number) => {
        return <div>{value ? formatTimeV1(value) : '/'}</div>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'mtime',
      render: (value: number) => {
        return <div>{value ? formatTimeV1(value) : '/'}</div>
      }
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (value: string) => {
        return <Tag color="success">{mapRole(TestRoleList, value)}</Tag>
      }
    },
    {
      title: '操作',
      render: (item: IUser) => {
        return (
          <div className="flex gap-3 ">
            <Button type="primary" icon={<FormOutlined />} onClick={handleOpenModal}>
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

  return (
    <div className="px-5 ">
      <Button type="primary" className="mb-2">添加用户</Button>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={TestUserList}
        pagination={{ ...pagination, total: TestUserList.length }}
        loading={loading}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default User
