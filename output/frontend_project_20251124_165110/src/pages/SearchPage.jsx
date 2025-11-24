import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    // 模拟搜索API调用
    setTimeout(() => {
      setSearchResults([
        { id: 1, title: '搜索结果 1', description: '这是第一个搜索结果的内容描述' },
        { id: 2, title: '搜索结果 2', description: '这是第二个搜索结果的内容描述' },
        { id: 3, title: '搜索结果 3', description: '这是第三个搜索结果的内容描述' }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">信息搜索</h1>
          <p className="text-lg text-gray-600">输入关键词搜索您需要的信息</p>
        </div>

        {/* 搜索框 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="请输入搜索关键词..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleSearch}
              loading={isLoading}
            >
              搜索
            </Button>
            <Button
              variant="secondary"
              onClick={handleClear}
            >
              清空
            </Button>
          </div>
        </div>

        {/* 搜索结果 */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                搜索结果 ({searchResults.length} 条)
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {searchResults.map((result) => (
                <div key={result.id} className="p-6 hover:bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {result.title}
                  </h3>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchTerm && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500">没有找到相关结果</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;