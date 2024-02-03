import { IFormItem } from '../base-form'

export default function roleForm() {
  return [
    {
      type: 'input',
      name: 'roleName',
      label: '角色名称',
      placeholder: '请输入角色名称',
      allowClear: true,
      rules: [{ required: true, message: '角色名称不能为空' }]
    },
    {
      type: 'input',
      name: 'roleDescription',
      label: '描述',
      placeholder: '请输入角色描述',
      allowClear: true,
      // rules: [{ required: true, message: '角色描述不能为空' }]
    }
  ] as IFormItem[]
}
