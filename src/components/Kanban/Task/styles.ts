import styled from 'styled-components';

interface ContainerProps {
  isDragging: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#fff')};
`;
