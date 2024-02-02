import { IFormItem } from '../base-form'

export default function userForm() {
  return [
    {
      type: 'input',
      name: 'name',
      label: '用户名',
      placeholder: '请输入用户名',
      allowClear: true,
      rules: [
        { required: true, message: '用户名不为空' },
        {
          pattern: /^[a-zA-Z0-9]{4,20}$/,
          message: '用户名只能包含英文或数字，长度为4-20个字符'
        }
      ]
    },
    {
      type: 'password',
      name: 'password',
      label: '密码',
      placeholder: '请输入密码',
      allowClear: true,
      disabled: true,
      defaultValue: 123456,
      rules: [
        { required: true, message: '密码不为空' },
        {
          min: 6,
          max: 20,
          message: '密码长度为6到20个字符'
        },
        {
          pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
          message: '密码必须包含数字、英文小写字母和英文大写字母'
        }
      ]
    },
    {
      type: 'select',
      name: 'gender',
      label: '性别',
      placeholder: '请选择性别',
      allowClear: true,
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ],
      rules: [{ require, message: '请选择性别' }]
    },
    {
      type: 'input',
      name: 'phone',
      label: '手机号',
      placeholder: '请输入11位手机号',
      allowClear: true,
      rules: [
        {
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入正确的手机号,首位必须是1，第二位必须大于2'
        }
      ]
    },
    {
      type: 'input',
      name: 'address',
      label: '地址',
      placeholder: '请输入居住地址',
      allowClear: true,
      rules: [{ required: true, message: '居住地址不能为空' }]
    }
  ] as IFormItem[]
}
