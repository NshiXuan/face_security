import React, { useEffect, useState } from 'react'

import { Alert, Button, Popconfirm, Space, Table, Tag, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

import { formatRole, formatTimeV3 } from '@/utils'
import { TestUserList } from '@/data/user-data'
import useTable from '@/hooks/useTable'
import { IUser } from '@/type'
import BaseModal from '@/components/base-modal'
import useBaseForm from '@/hooks/useBaseForm'
import BaseForm, { IOption, IOptions } from '@/components/base-form'
import userForm from '@/components/base-form/user-form'
import Search from 'antd/es/input/Search'
import { getRoleList } from '@/service/role'
import { createUser, deleteUser, getUserByName, getUserList, updateUser } from '@/service/user'

const User = function () {
  const { rowSelection, pagination, setPagination, loading, handlePageChange } = useTable()
  const { form } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState<IUser[]>()
  const [roleOptions, setRoleOptions] = useState<IOptions>()
  const [title, setTitle] = useState('添加角色')
  const [initialValues, setInitialValues] = useState<IUser>()

  useEffect(() => {
    handleGetUserList()
    handleGetRoleList()
  }, [])

  function handleGetUserList() {
    getUserList().then(res => {
      if (res.data) {
        setUsers([...TestUserList, ...res.data])
      } else {
        setUsers([...TestUserList])
      }
    })
  }

  function handleGetRoleList() {
    getRoleList().then(res => {
      setRoleOptions(res.data?.map(item => ({
        label: item.name,
        value: item.id
      } as IOption)))
    })
  }

  function handleOpen(type: 'add' | 'update', item?: IUser): void {
    form.resetFields()
    setTitle(type === 'add' ? '新增用户' : '编辑用户')
    setInitialValues(type === 'add' ? { password: '123456' } as IUser : item)
    setIsOpen(true)
  }

  function handleCancel() {
    setIsOpen(false)
  }

  function handleOk() {
    form.validateFields().then((values: IUser) => {
      if (values.id) {
        updateUser(values).then(res => {
          if (res.code == 200) {
            handleCancel()
            handleGetUserList()
            return message.success("更新成功")
          }
          return message.error(res.msg)
        })
      } else {
        createUser(values).then(res => {
          if (res.code == 200) {
            handleCancel()
            handleGetUserList()
            return message.success("添加成功")
          }
          return message.error(res.msg)
        })
      }
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
  }

  // TODO(nsx): 手机号 地址搜索
  function handleSearch(name: string) {
    if (name.trim() == '') {
      return message.warning('请输入搜索内容')
    }
    const searchUsers = TestUserList.filter(item => item.name.includes(name))
    setUsers(searchUsers)
    getUserByName({ name }).then(res => {
      if (res.data) {
        setUsers([...searchUsers, ...res.data])
      }
    })
  }

  function handleReset() {
    handleGetUserList()
    setPagination({
      current: 1,
      position: ['bottomCenter']
    })
  }

  function handleConfirm(id: number) {
    deleteUser(id).then(res => {
      if (res.code == 200) {
        handleGetUserList()
        return message.success("删除成功")
      }
      return message.error(res.msg)
    })
  }

  // TODO(nsx): 批量删除
  function handleBatchDelete() {

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
      dataIndex: 'role_id',
      render: (role: number) => {
        return <Tag color={role == 3 ? 'blue' : 'success'}>{formatRole(role)}</Tag>
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
            <Button type="primary" icon={<FormOutlined />} onClick={() => handleOpen('update', item)}>编辑</Button>
            <Popconfirm title="确认删除吗？" cancelText="取消" okText="确认" onConfirm={() => handleConfirm(item.id)}>
              <Button type="primary" icon={<DeleteOutlined />} danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  return (
    <div className="px-5 ">
      <div className='mb-2 flex items-center gap-2'>
        <Button type="primary" className='mr-4' onClick={() => handleOpen('add')}>添加用户</Button>
        <Space className='mr-2'>
          <Search placeholder="请输入用户名" enterButton={<SearchOutlined />} onSearch={handleSearch} />
        </Space>
        <Button type="primary" onClick={handleReset}>重置</Button>
      </div>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={users}
        pagination={pagination}
        loading={loading}
        onChange={handlePageChange}
      />

      <BaseModal open={isOpen} title={title} handleCancel={handleCancel} handleOk={handleOk}>
        <Alert message='默认密码为 123456' type='info' showIcon className='mb-4' />
        <BaseForm form={form} data={userForm(roleOptions!)} labelCol={4} initialValues={initialValues} />
      </BaseModal>
    </div >
  )
}

export default User
