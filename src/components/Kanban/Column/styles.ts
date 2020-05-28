import styled from 'styled-components';

interface TaskListProps {
  isDraggingOver: boolean;
}

export const Container = styled.div`
  width: 100%;

  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;

  min-height: 100px;
`;

export const Title = styled.div`
  padding: 8px;
`;

export const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;
