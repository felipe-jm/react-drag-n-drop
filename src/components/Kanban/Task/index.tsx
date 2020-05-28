import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Container } from './styles';

interface TaskProps {
  id: number;
  content: string;
  index: number;
}

const Task: React.FC<TaskProps> = ({ id, content, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <span>{content}</span>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
