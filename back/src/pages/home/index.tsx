import React from 'react'

import BaseForm from '@/components/base-form'
import { TestForm } from '@/components/base-form/test-form'
import useBaseForm from '@/hooks/useBaseForm'
import { Button } from 'antd'

const Home = function () {
  const { form, onFinish } = useBaseForm()

  return (
    <div className=" p-5">
      <BaseForm
        data={TestForm}
        form={form}
        maxWidth={500}
        labelCol={3}
        onFinish={onFinish}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </BaseForm>

      <Button>测试</Button>

      <div className="border-b-8 border-purple-500 mt-5">test</div>
      <div className='w-40 h-40 bg-blue-500 text-red-400 mt-5  rounded-md cursor-pointer flex justify-center items-center hover:shadow-lg'>hello</div>
    </div>
  )
}

export default Home

// 设置一个方便调试的name 可以不写 默认为组件名称
Home.displayName = 'Home'
