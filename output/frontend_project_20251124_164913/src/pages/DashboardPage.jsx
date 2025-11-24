import React from 'react';
import Button from '../components/Button';

const DashboardPage = () => {
  const stats = [
    { label: '总用户数', value: '1,234', change: '+12%' },
    { label: '今日活跃', value: '567', change: '+8%' },
    { label: '新增用户', value: '89', change: '+15%' },
    { label: '订单数量', value: '456', change: '+5%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
          <Button variant="primary">
            刷新数据
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.change.startsWith('+') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧内容 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">最近活动</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">用户 #{item} 完成了注册</p>
                      <p className="text-xs text-gray-500">2小时前</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h2>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-center">
                  用户管理
                </Button>
                <Button variant="secondary" className="w-full justify-center">
                  订单管理
                </Button>
                <Button variant="secondary" className="w-full justify-center">
                  系统设置
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;