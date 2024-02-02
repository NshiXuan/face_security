import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { Rule } from 'antd/es/form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import { memo, ReactNode } from 'react'
import type { FC } from 'react'
import { IFormItem } from '../base-form'

export interface IProps {
  open: boolean
  onCreate: (values: any) => void
  onCancel: () => void
  title?: string
  initialValues?: any
  data: IFormItem[]
  children?: ReactNode
}

const { RangePicker } = DatePicker

// memo浅层比较
const BaseModalForm: FC<IProps> = memo(
  ({ open, onCreate, onCancel, title = '默认标题', initialValues, data }) => {

    const [form] = Form.useForm()

    useEffect(() => {
      initialValues
        ? form.setFieldsValue({
          ...initialValues,
          confirmPassword: initialValues.password
        })
        : form.resetFields()
    }, [initialValues])

    // 渲染FormItem的方法
    function renderFormItem(item: IFormItem) {
      if (item.type === 'input') {
        return (
          // 还有个hidden属性
          <Input placeholder={item.placeholder} allowClear={item.allowClear} />
        )
      } else if (item.type === 'password') {
        return (
          <Input.Password
            placeholder={item.placeholder}
            allowClear={item.allowClear}
          />
        )
      } else if (item.type === 'select') {
        return (
          <Select
            placeholder={item.placeholder}
            style={{ width: 120 }}
            allowClear={item.allowClear}
            options={item.options}
          />
        )
      } else if (item.type === 'textarea') {
        return (
          <TextArea
            placeholder={item.placeholder}
            rows={item.rows ? item.rows : 4}
          />
        )
      } else if (item.type === 'datePicker') {
        return <RangePicker />
      } else if (item.type === 'rangePicker') {
        return <RangePicker />
      }
    }

    return (
      <Modal
        forceRender
        open={open}
        title={title}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          onCancel()
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values)
              form.resetFields()
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item hidden name="id" label="id">
            <Input placeholder="请输入id" />
          </Form.Item>
          {data?.map((item) => {
            return (
              <Form.Item
                key={item.name}
                name={item.name}
                label={item.label}
                rules={item.rules}
              >
                {renderFormItem(item)}
              </Form.Item>
            )
          })}
        </Form>
      </Modal>
    )
  }
)

export default BaseModalForm

// 设置一个方便调试的name 可以不写 默认为组件名称
BaseModalForm.displayName = 'BaseModalForm'