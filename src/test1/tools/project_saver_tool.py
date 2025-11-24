from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import List, Dict, Union, Type, Any
import os
import zipfile
import time
import shutil


# --- 修改点 1: 将 path 改为 file_path，顺应 Agent 的习惯 ---
class FileItem(BaseModel):
    file_path: str = Field(..., description="文件的相对路径，例如 'src/App.js' 或 'package.json'")
    content: str = Field(..., description="文件的完整代码内容")


class ProjectSaverSchema(BaseModel):
    project_name: str = Field(..., description="项目名称，建议使用 'frontend_project'")
    files: List[FileItem] = Field(..., description="包含所有文件的列表")
    overwrite: bool = Field(False, description="是否覆盖整个项目目录。如果为 False，则只更新或添加指定文件，保留已有文件。")  # 新增字段


class ProjectSaverTool(BaseTool):
    name: str = "Project Saver Tool"
    description: str = (
        "用于保存整个前端项目文件的工具。必须在代码生成结束后一次性调用。"
        "接受一个包含所有文件路径(file_path)和内容(content)的列表。"
    )
    args_schema: Type[BaseModel] = ProjectSaverSchema

    def _run(self, project_name: str, files: List[Union[Dict, Any]], overwrite: bool = False) -> str: # 新增参数
        # # 设置固定的输出目录，方便查看
        # # 如果你希望每次运行都覆盖同一个目录，使用这个：
        # base_path = os.path.join("output", project_name)

        # 如果你希望每次都保留历史记录（带时间戳），请解开下面这行的注释：
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        base_path = os.path.join("output", f"{project_name}_{timestamp}")

        try:
            # 修改逻辑：只有明确要求 overwrite 时才删除目录
            if overwrite and os.path.exists(base_path):
                shutil.rmtree(base_path)

            os.makedirs(base_path, exist_ok=True)

            saved_files_count = 0

            # 2. 写入所有文件
            for file in files:
                # --- 修改点 2: 统一使用 file_path ---
                # 兼容字典或对象访问
                if isinstance(file, dict):
                    f_path = file.get('file_path') or file.get('path')  # 双重保险
                    f_content = file.get('content')
                else:
                    f_path = getattr(file, 'file_path', getattr(file, 'path', None))
                    f_content = getattr(file, 'content', None)

                if not f_path or f_content is None:
                    print(f"Skipping invalid file item: {file}")
                    continue

                # 清理路径
                clean_path = f_path.lstrip('./').lstrip('/').replace('\\', '/')

                # 组合完整路径
                full_path = os.path.join(base_path, clean_path)

                # 确保子文件夹存在
                os.makedirs(os.path.dirname(full_path), exist_ok=True)

                # 写入文件
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(f_content)

                saved_files_count += 1

            # 3. 创建 ZIP 压缩包 (放在 output 根目录下，方便拿取)
            zip_filename = os.path.join("output", f"{project_name}.zip")
            with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files_in_dir in os.walk(base_path):
                    for file in files_in_dir:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, start=base_path)
                        zipf.write(file_path, arcname)

            return f"SUCCESS: Project saved to folder '{base_path}' and archive '{zip_filename}' created. Total files: {saved_files_count}."

        except Exception as e:
            import traceback
            traceback.print_exc()
            return f"Error saving project: {str(e)}"