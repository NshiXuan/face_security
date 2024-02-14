import { IFormItem } from '../base-form'

export default function roleForm() {
  return [
    {
      type: 'input',
      name: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      allowClear: true,
      rules: [{ required: true, message: '角色名称不能为空' }]
    },
    {
      type: 'textarea',
      name: 'desc',
      label: '描述',
      placeholder: '请输入角色描述',
      allowClear: true,
      rows: 4
    }
  ] as IFormItem[]
}
