import React, { useState } from 'react'

import { Button, Input, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

import { formatRole, formatTimeV3 } from '@/utils'
import { TestUserList } from '@/data/user-data'
import useTable from '@/hooks/useTable'
import { IUser } from '@/type'
import BaseModal from '@/components/base-modal'
import useBaseForm from '@/hooks/useBaseForm'
import BaseForm from '@/components/base-form'
import userForm from '@/components/base-form/user-form'
import Search from 'antd/es/input/Search'

const User = function () {
  const { rowSelection, pagination, loading, handlePageChange } = useTable()
  const { form } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }

  function handleCancel() {
    setIsOpen(false)
  }

  function handleOk() {
    form.validateFields().then((values) => {
      form.resetFields()
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
  }

  function handleSearch() {

  }

  function handleReset() {

  }

  const columns: ColumnsType<IUser> = [
    {
      title: '用户名',
      dataIndex: 'name',
      render: (value: string, item: IUser) => {
        return <span className="cursor-pointer">{value}</span>
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (gender: number) => {
        return <Tag color={gender == 1 ? 'blue' : 'pink'}>{gender == 1 ? '男' : '女'}</Tag>
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: (value: number) => {
        return <div>{value ? value : '/'}</div>
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      render: (addr: string) => {
        return <Tag color='gold'>{addr}</Tag>
      }
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role: number) => {
        return <Tag color="success">{formatRole(role)}</Tag>
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
      render: (item: IUser) => {
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

  return (
    <div className="px-5 ">
      <div className='mb-2 flex items-center gap-2'>
        <Button type="primary" className='mr-4' onClick={handleOpen}>添加用户</Button>
        <Space className='mr-2'>
          <Search placeholder="请输入用户名" enterButton={<SearchOutlined />} onSearch={handleSearch} />
        </Space>
        <Button type="primary" onClick={handleReset}>重置</Button>
      </div>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={TestUserList}
        pagination={{ ...pagination, total: TestUserList.length }}
        loading={loading}
        onChange={handlePageChange}
      />

      <BaseModal open={isOpen} title='添加用户' handleCancel={handleCancel} handleOk={handleOk}>
        <BaseForm form={form} data={userForm()} labelCol={4}></BaseForm>
      </BaseModal>
    </div >
  )
}

export default User
