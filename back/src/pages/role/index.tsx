import React, { useState } from 'react'

import useTable from '@/hooks/useTable'
import { IRole } from '@/type'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TestRoleList } from '@/data/role-data'

import BaseModal from '@/components/base-modal'
import useBaseForm from '@/hooks/useBaseForm'
import BaseForm from '@/components/base-form'
import roleForm from '@/components/base-form/role-form'

const Role = function () {
  const { rowSelection, loading } = useTable()

  const { form } = useBaseForm()
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }

  function handleCancel() {
    setIsOpen(false)
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  function handleConfirm(id: number) {

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
      dataIndex: 'description'
    },
    {
      title: '操作',
      render: (item: IRole) => {
        return (
          <div className="flex gap-3 ">
            <Button type="primary" icon={<FormOutlined />}>编辑</Button>
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
      <Button type="primary" className="mb-2" onClick={handleOpen}>添加角色</Button>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={TestRoleList}
        loading={loading}
      />

      <BaseModal open={isOpen} title='添加角色' handleCancel={handleCancel} handleOk={handleOk}>
        <BaseForm form={form} data={roleForm()} labelCol={4}></BaseForm>
      </BaseModal>
    </div>
  )
}

export default Role

// 设置一个方便调试的name 可以不写 默认为组件名称
Role.displayName = 'Role'
