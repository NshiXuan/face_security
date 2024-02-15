import React, { useEffect, useState } from 'react'

import useTable from '@/hooks/useTable'
import { IRole } from '@/type'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, Tag, message } from 'antd'
import { ColumnsType } from 'antd/es/table'

import BaseModal from '@/components/base-modal'
import useBaseForm from '@/hooks/useBaseForm'
import BaseForm from '@/components/base-form'
import roleForm from '@/components/base-form/role-form'
import { createRole, deleteRole, getRoleList, updateRole } from '@/service/role'

const Role = function () {
  const { rowSelection, loading } = useTable()
  const { form } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)
  const [roles, setRoles] = useState<IRole[]>()
  const [title, setTitle] = useState('添加角色')
  const [initailValues, setInitailValues] = useState<IRole>()

  useEffect(() => {
    handleGetRoles()
  }, [])

  function handleGetRoles() {
    getRoleList().then(res => {
      if (res.data) {
        setRoles(res.data)
      }
    })
  }

  function handleOpen(model: 'add' | 'update', item?: IRole) {
    form.resetFields()
    setTitle(model === 'add' ? '新增角色' : '编辑角色')
    setInitailValues(model === 'add' ? undefined : item)
    setIsOpen(true)
  }

  function handleCancel() {
    setIsOpen(false)
  }

  function handleOk() {
    form.validateFields().then((values: IRole) => {
      if (values.id) {
        updateRole(values.id, { name: values.name, desc: values.desc }).then(res => {
          if (res.code == 200) {
            handleCancel()
            handleGetRoles()
            return message.success("更新成功")
          }
        })
      } else {
        createRole(values).then(res => {
          if (res.code == 200) {
            handleCancel()
            handleGetRoles()
            return message.success("添加成功")
          }
          return message.error(res.msg)
        })
      }
    }).catch((info) => {
      console.log('Validate Failed:', info)
    })
  }

  function handleConfirm(id: number) {
    deleteRole(id).then(res => {
      if (res.code == 200) {
        handleGetRoles()
        return message.success("删除成功")
      }
      return message.error(res.msg)
    })
  }

  // 映射表表格的每一列
  const columns: ColumnsType<IRole> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      render: (value: string) => {
        return <Tag color="success">{value}</Tag>
      }
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: (desc: string) => {
        return <div>{desc ? desc : '/'}</div>
      }
    },
    {
      title: '操作',
      render: (item: IRole) => {
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
    <div className="px-5">
      <Button type="primary" className="mb-2" onClick={() => { handleOpen('add') }}>添加角色</Button>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={roles}
        loading={loading}
      />

      <BaseModal open={isOpen} title={title} handleCancel={handleCancel} handleOk={handleOk}>
        <BaseForm form={form} data={roleForm()} labelCol={4} initialValues={initailValues}></BaseForm>
      </BaseModal>
    </div>
  )
}

export default Role


