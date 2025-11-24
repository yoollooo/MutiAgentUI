from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
from crewai.knowledge.source.text_file_knowledge_source import TextFileKnowledgeSource
# 导入 CSVKnowledgeSource
from crewai.knowledge.source.csv_knowledge_source import CSVKnowledgeSource

# from crewai_tools import JSONSearchTool
import os

from crewai_tools import FileReadTool

# 导入刚才写的工具类
from src.test1.tools.project_saver_tool import ProjectSaverTool


# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators

@CrewBase
class Test1():
    """Test1 crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # json_search_tool = JSONSearchTool(
    #     json_path='knowledge/frontend_components.json',
    #     config={
    #         "search_key": "description",  # 智能体将根据描述进行搜索
    #         "attributes": ["code", "name", "tags"]  # 搜索结果将返回这些字段
    #     }
    # )

    file_read_tool = FileReadTool(file_path='knowledge/frontend_components.json')

    # 在类中初始化这个工具
    project_saver_tool = ProjectSaverTool()

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended

    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def Requirements_Analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['Requirements_Analyst'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def UX_Designer(self) -> Agent:
        return Agent(
            config=self.agents_config['UX_Designer'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def UILayout_Designer(self) -> Agent:
        return Agent(
            config=self.agents_config['UILayout_Designer'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Frontend_Developer(self) -> Agent:
        return Agent(
            config=self.agents_config['Frontend_Developer'],  # type: ignore[index]
            verbose=True,
            tools=[self.file_read_tool, self.project_saver_tool]  # 将工具分配给 Frontend_Developer
        )

    @agent
    def UITest_Engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['UITest_Engineer'],  # type: ignore[index]
            verbose=True
        )


    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def Expert1_Analysis_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert1_Analysis_Task'],  # type: ignore[index]
        )

    @task
    def Expert2_Design_Draft_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert2_Design_Draft_Task'],  # type: ignore[index]
        )

    @task
    def Expert1_Review_Expert2_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert1_Review_Expert2_Task'],  # type: ignore[index]
        )

    @task
    def Expert2_Design_Finalize_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert2_Design_Finalize_Task'],  # type: ignore[index]
        )

    @task
    def Expert3_UI_Draft_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert3_UI_Draft_Task'],  # type: ignore[index]
        )

    @task
    def Expert2_Review_Expert3_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert2_Review_Expert3_Task'],  # type: ignore[index]
        )

    @task
    def Expert3_UI_Finalize_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert3_UI_Finalize_Task'],  # type: ignore[index]
        )

    @task
    def Expert4_Code_Draft_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert4_Code_Draft_Task'],  # type: ignore[index]
        )

    @task
    def Expert3_Review_Expert4_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert3_Review_Expert4_Task'],  # type: ignore[index]
        )

    @task
    def Expert4_Code_Finalize_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert4_Code_Finalize_Task'],  # type: ignore[index]
        )

    @task
    def Expert5_Test_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert5_Test_Task'],  # type: ignore[index]
        )

    @task
    def Final_Handover_Task(self) -> Task:
        return Task(
            config=self.tasks_config['Final_Handover_Task'],  # type: ignore[index]
            output_file='final_code.md'  # 可选：这一行会将最终代码保存到本地文件 final_code.md 中
        )


    @crew
    def crew(self) -> Crew:
        """Creates the Test1 crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        # 专门用于处理 Business-UI.csv 和 Verb-UI.csv
        csv_source = CSVKnowledgeSource(
            file_paths=["Business-UI.csv", "Verb-UI.csv"]
        )
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            # 注意任务顺序：生成 -> 评审 -> 定稿 -> 下一阶段
            tasks=[
                self.Expert1_Analysis_Task(),  # 需求分析
                self.Expert2_Design_Draft_Task(),  # UX 初稿
                self.Expert1_Review_Expert2_Task(),  # 需求评审 UX
                self.Expert2_Design_Finalize_Task(),  # UX 定稿
                self.Expert3_UI_Draft_Task(),
                self.Expert2_Review_Expert3_Task(),
                self.Expert3_UI_Finalize_Task(),
                self.Expert4_Code_Draft_Task(),
                self.Expert3_Review_Expert4_Task(),
                self.Expert4_Code_Finalize_Task(),
                self.Expert5_Test_Task(),
                self.Final_Handover_Task()
            ],
            process=Process.sequential,
            verbose=True,
            knowledge_sources=[csv_source]
            #memory=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )