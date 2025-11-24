import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    gender: 'male',
    birthday: '1990-01-01',
    address: '北京市朝阳区'
  });

  const [isEditing, setIsEditing] = useState(false);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // 处理保存逻辑
      console.log('保存个人信息:', formData);
      setIsEditing(false);
      alert('个人信息保存成功！');
    }
  };

  const handleCancel = () => {
    // 重置表单数据
    setFormData({
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      gender: 'male',
      birthday: '1990-01-01',
      address: '北京市朝阳区'
    });
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className