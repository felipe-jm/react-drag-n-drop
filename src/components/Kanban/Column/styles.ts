import styled from 'styled-components';

interface TaskListProps {
  isDraggingOver: boolean;
}

export const Container = styled.div`
  width: 100%;

  margin: 8px;
  border-radius: 2px;

  display: flex;
  flex-direction: column;

  min-height: 100px;

  background: #414141;
`;

export const Title = styled.div`
  padding: 8px;
`;

export const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? '#313131' : '#414141')};
  flex-grow: 1;
  min-height: 100px;
`;
