import React from 'react'

import BaseForm from '@/components/base-form'
import { TestForm } from '@/components/base-form/test-form'
import useBaseForm from '@/hooks/useBaseForm'
import { Button } from 'antd'

const Home = function () {
  const { form, handleFinish } = useBaseForm()

  return (
    <div className="p-5">
      <BaseForm
        data={TestForm}
        form={form}
        maxWidth={500}
        labelCol={3}
        onFinish={handleFinish}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </BaseForm>
    </div>
  )
}

export default Home

// 设置一个方便调试的name 可以不写 默认为组件名称
Home.displayName = 'Home'
