from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from typing import List, Dict, Union, Type, Any
import os
import zipfile
import time


class FileItem(BaseModel):
    path: str = Field(..., description="The relative path of the file, e.g., 'src/App.js' or 'public/index.html'")
    content: str = Field(..., description="The full source code content of the file")


class ProjectSaverSchema(BaseModel):
    project_name: str = Field(..., description="The name of the project, used as the root folder name")
    files: List[FileItem] = Field(..., description="A list of file objects containing path and content")


class ProjectSaverTool(BaseTool):
    name: str = "Project Saver Tool"
    description: str = (
        "A tool to save frontend code as local files and a zip archive. "
        "MUST be called ONCE at the end of the coding process. "
        "Requires a project name and a list of all file paths and contents."
    )
    args_schema: Type[BaseModel] = ProjectSaverSchema

    def _run(self, project_name: str, files: List[Union[Dict, Any]]) -> str:
        # 1. 创建带时间戳的输出目录，防止覆盖
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        # 强制将输出放在项目根目录下的 output 文件夹中
        base_path = os.path.join("output", f"{project_name}_{timestamp}")

        try:
            # 确保 output 目录存在
            if not os.path.exists("output"):
                os.makedirs("output")

            os.makedirs(base_path, exist_ok=True)

            saved_files_count = 0

            # 2. 写入所有文件
            for file in files:
                # 兼容处理：CrewAI 可能会传回字典或 Pydantic 对象
                if isinstance(file, dict):
                    f_path = file.get('path')
                    f_content = file.get('content')
                else:
                    f_path = getattr(file, 'path', None)
                    f_content = getattr(file, 'content', None)

                if not f_path or f_content is None:
                    print(f"Skipping invalid file item: {file}")
                    continue

                # 移除路径开头可能存在的 ./ 或 /，防止跳出目录
                clean_path = f_path.lstrip('./').lstrip('/')

                # 组合完整路径
                full_path = os.path.join(base_path, clean_path)

                # 确保子文件夹存在 (例如 src/components/)
                os.makedirs(os.path.dirname(full_path), exist_ok=True)

                # 写入文件
                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(f_content)

                saved_files_count += 1

            # 3. 创建 ZIP 压缩包
            zip_filename = f"{base_path}.zip"
            with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files_in_dir in os.walk(base_path):
                    for file in files_in_dir:
                        file_path = os.path.join(root, file)
                        # 在 zip 中的路径（去掉 output/project_name_time 前缀，保持相对结构）
                        arcname = os.path.relpath(file_path, start=base_path)
                        zipf.write(file_path, arcname)

            return f"SUCCESS: Project saved to '{base_path}' and archive '{zip_filename}' created. Total files saved: {saved_files_count}."

        except Exception as e:
            import traceback
            traceback.print_exc()
            return f"Error saving project: {str(e)}"