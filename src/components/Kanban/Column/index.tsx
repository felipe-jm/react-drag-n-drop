import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task';
import { ITask } from '../index';

import { Container, Title, TaskList } from './styles';

interface ColumnProps {
  id: number;
  title: string;
  columnIndex: number;
  tasks: ITask[];
}

const Column: React.FC<ColumnProps> = ({ id, title, columnIndex, tasks }) => {
  return (
    <Draggable draggableId={String(id)} index={columnIndex}>
      {columnProvided => (
        <Container
          {...columnProvided.draggableProps}
          ref={columnProvided.innerRef}
        >
          <Title {...columnProvided.dragHandleProps}>{title}</Title>
          <Droppable droppableId={String(id)} type="task">
            {(taskProvided, snapshot) => (
              <TaskList
                ref={taskProvided.innerRef}
                {...taskProvided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    index={index}
                  />
                ))}
                {taskProvided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
