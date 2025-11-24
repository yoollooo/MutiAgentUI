import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Checkbox from '../components/Checkbox';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 处理登录逻辑
      console.log('登录数据:', formData);
      alert('登录成功！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            用户登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            登录您的账户
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
              label="密码"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="请输入密码"
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="记住我"
                checked={formData.rememberMe}
                onChange={(checked) => handleInputChange('rememberMe', checked)}
              />
              
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                忘记密码？
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              登录
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              还没有账户？
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                立即注册
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;