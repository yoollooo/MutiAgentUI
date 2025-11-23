#!/usr/bin/env python
import sys
import json
import warnings
from pathlib import Path
from datetime import datetime

from test1.crew import Test1

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

# 定义JSON输入文件路径（当前目录下的input_config.json）
INPUT_JSON_FILE = Path(__file__).parent / "input_config.json"


def load_input_from_json(file_path: Path) -> dict:
    """
    从JSON文件加载输入参数
    :param file_path: JSON文件路径
    :return: 解析后的输入参数字典
    """
    # 校验文件是否存在
    if not file_path.exists():
        raise FileNotFoundError(f"输入JSON文件不存在：{file_path.resolve()}")

    # 校验文件是否为JSON格式
    if file_path.suffix != ".json":
        raise ValueError(f"文件不是JSON格式：{file_path.resolve()}，请提供后缀为.json的文件")

    # 读取并解析JSON文件
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            inputs = json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"JSON文件格式错误：{e}")

    # 确保current_year字段存在（若JSON中未指定则自动填充当前年份）
    if "current_year" not in inputs or not inputs["current_year"]:
        inputs["current_year"] = str(datetime.now().year)

    return inputs


def run():
    """
    Run the crew.
    """
    inputs = load_input_from_json(INPUT_JSON_FILE)

    try:
        Test1().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = load_input_from_json(INPUT_JSON_FILE)

    try:
        Test1().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        Test1().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = load_input_from_json(INPUT_JSON_FILE)

    try:
        Test1().crew().test(n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")

def run_with_trigger():
    """
    Run the crew with trigger payload.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception("No trigger payload provided. Please provide JSON payload as argument.")

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    inputs = {
        "crewai_trigger_payload": trigger_payload,
        "topic": "",
        "current_year": ""
    }

    try:
        result = Test1().crew().kickoff(inputs=inputs)
        return result
    except Exception as e:
        raise Exception(f"An error occurred while running the crew with trigger: {e}")
