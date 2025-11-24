import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Checkbox from '../components/Checkbox';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '手机号不能为空';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '手机号格式不正确';
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6位';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '密码不一致';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '请同意用户协议';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 处理注册逻辑
      console.log('注册数据:', formData);
      alert('注册成功！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            用户注册
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            创建您的账户
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="姓名"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="请输入您的姓名"
              required
            />

            <InputField
              label="邮箱"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="请输入您的邮箱"
              required
            />

            <InputField
              label="手机号"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              placeholder="请输入您的手机号"
              required
            />

            <SelectField
              label="性别"
              value={formData.gender}
              onChange={(value) => handleInputChange('gender', value)}
              options={[
                { value: '', label: '请选择性别' },
                { value: 'male', label: '男' },
                { value: 'female', label: '女' }
              ]}
            />

            <InputField
              label="密码"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="请输入密码"
              required
            />

            <InputField
              label="确认密码"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              placeholder="请再次输入密码"
              required
            />

            <Checkbox
              label="我同意用户协议和隐私政策"
              checked={formData.agreeToTerms}
              onChange={(checked) => handleInputChange('agreeToTerms', checked)}
              error={errors.agreeToTerms}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              注册
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              已有账户？
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                立即登录
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;