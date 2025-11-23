from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
from crewai.knowledge.source.text_file_knowledge_source import TextFileKnowledgeSource


# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators

@CrewBase
class Test1():
    """Test1 crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended

    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def Expert1(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert1'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Expert2(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert2'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Expert3(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert3'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Expert4(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert4'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Expert5(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert5'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def Expert6(self) -> Agent:
        return Agent(
            config=self.agents_config['Expert6'],  # type: ignore[index]
            verbose=True
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def Expert1_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert1_task'],  # type: ignore[index]
        )

    @task
    def Expert2_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert2_task'],  # type: ignore[index]
        )

    @task
    def Expert3_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert3_task'],  # type: ignore[index]
        )

    @task
    def Expert4_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert4_task'],  # type: ignore[index]
        )

    @task
    def Expert5_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert5_task'],  # type: ignore[index]
        )

    @task
    def Expert6_task(self) -> Task:
        return Task(
            config=self.tasks_config['Expert6_task'],  # type: ignore[index]
        )


    @crew
    def crew(self) -> Crew:
        """Creates the Test1 crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge
        text_source = TextFileKnowledgeSource(
            file_paths=["user_preference.txt"]
        )
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            knowledge_sources=[text_source]
            #memory=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )