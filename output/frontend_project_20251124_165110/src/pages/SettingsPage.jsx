import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Checkbox from '../components/Checkbox';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'zh-CN',
    displayDensity: 'normal',
    notifications: true,
    autoSave: false,
    timeout: 30
  });

  const [errors, setErrors] = useState({});

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateTimeout = (value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) {
      return '超时时间必须在 1-100 秒之间';
    }
    return null;
  };

  const handleSave = () => {
    const timeoutError = validateTimeout(settings.timeout);
    
    if (timeoutError) {
      setErrors({ timeout: timeoutError });
      return;
    }

    setErrors({});
    // 处理保存设置逻辑
    console.log('保存设置:', settings);
    alert('设置保存成功！');
  };

  const handleReset = () => {
    setSettings({
      theme: 'light',
      language: 'zh-CN',
      displayDensity: 'normal',
      notifications: true,
      autoSave: false,
      timeout: 30
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600 mt-2">配置您的系统偏好设置</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">个性化设置</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* 主题设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                主题
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['light', 'dark', 'auto'].map((theme) => (
                  <div
                    key={theme}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      settings.theme === theme
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSettingChange('theme', theme)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium capitalize">
                        {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '自动'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 语言设置 */}
            <div>
              <SelectField
                label="语言"
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
                options={[
                  { value: 'zh-CN', label: '简体中文' },
                  { value: 'en-US', label: 'English' },
                  { value: 'ja-JP', label: '日本語' }
                ]}
              />
            </div>

            {/* 显示密度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                显示密度
              </label>
              <div className="flex space-x-4">
                {['compact', 'normal', 'comfortable'].map((density) => (
                  <button
                    key={density}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      settings.displayDensity === density
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleSettingChange('displayDensity', density)}
                  >
                    {density === 'compact' ? '紧凑' : 
                     density === 'normal' ? '标准' : '宽松'}
                  </button>
                ))}
              </div>
            </div>

            {/* 系统参数 */}
            <div>
              <InputField
                label="超时时间 (秒)"
                type="number"
                value={settings.timeout}
                onChange={(e) => handleSettingChange('timeout', e.target.value)}
                error={errors.timeout}
                description="设置系统超时时间，范围：1-100 秒"
              />
            </div>

            {/* 功能开关 */}
            <div className="space-y-4">
              <Checkbox
                label="启用通知"
                checked={settings.notifications}
                onChange={(checked) => handleSettingChange('notifications', checked)}
              />
              <Checkbox
                label="自动保存"
                checked={settings.autoSave}
                onChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-4 pt-6">
              <Button
                variant="primary"
                onClick={handleSave}
              >
                保存设置
              </Button>
              <Button
                variant="secondary"
                onClick={handleReset}
              >
                重置设置
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;