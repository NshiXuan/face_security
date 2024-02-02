import { Form } from 'antd'
import { useState } from 'react'

export default function useBaseModalForm() {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    handleOpenModal,
    handleCancelModal,
    form
  }
}
