import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { Container } from './styles';

import kanbanData from '../../data';
import Column from './Column';

export interface ITask {
  id: number;
  content: string;
}

interface IColumn {
  id: number;
  title: string;
  tasks: ITask[];
}

interface IKanbanData {
  columns: IColumn[];
}

const Kanban: React.FC = () => {
  const [data, setData] = useState<IKanbanData>(kanbanData);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === 'column') {
        const { columns: newColumnsOrdem } = data;

        const draggedColumn = newColumnsOrdem.find(
          column => column.id === Number(draggableId),
        );

        if (!draggedColumn) {
          return;
        }

        newColumnsOrdem.splice(source.index, 1);
        newColumnsOrdem.splice(destination.index, 0, draggedColumn);

        const newState = {
          ...data,
          columns: newColumnsOrdem,
        };

        setData(newState);
      }

      const startColumn = data.columns.find(
        column => column.id === Number(source.droppableId),
      );

      const finishColumn = data.columns.find(
        column => column.id === Number(destination.droppableId),
      );

      if (!startColumn || !finishColumn) {
        return;
      }

      if (startColumn === finishColumn) {
        // Reordering cards in same list

        const { tasks: newTasks } = startColumn;

        const draggedTask = newTasks.find(
          task => task.id === Number(draggableId),
        );

        if (!draggedTask) {
          return;
        }

        newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, draggedTask);

        const newColumn = {
          ...startColumn,
          tasks: newTasks,
        };

        const startColumnIndex = data.columns.findIndex(
          column => column.id === startColumn.id,
        );

        const newColumns = data.columns;

        newColumns.splice(startColumnIndex, 1, newColumn);

        const newData = {
          ...data,
          columns: newColumns,
        };

        setData(newData);
      } else {
        // Moving cards between lists

        // Removing card from source list
        const { tasks: startTasks } = startColumn;

        const draggedTask = startTasks.find(
          task => task.id === Number(draggableId),
        );

        startTasks.splice(source.index, 1);

        if (!draggedTask) {
          return;
        }

        const newStartColumn: IColumn = {
          ...startColumn,
          tasks: startTasks,
        };

        const startColumnIndex = data.columns.findIndex(
          column => column.id === startColumn.id,
        );

        const newStartColumns = data.columns;

        newStartColumns.splice(startColumnIndex, 1, newStartColumn);

        //-------------------------

        // Adding card to destination list

        const { tasks: finishTasks } = finishColumn;
        finishTasks.splice(destination.index, 0, draggedTask);

        const newFinishColumn: IColumn = {
          ...finishColumn,
          tasks: finishTasks,
        };

        const finishColumnIndex = data.columns.findIndex(
          column => column.id === finishColumn.id,
        );

        const newFinishColumns = data.columns;

        newFinishColumns.splice(finishColumnIndex, 1, newFinishColumn);

        const newData = {
          ...data,
          columns: newFinishColumns,
        };

        setData(newData);
      }
    },
    [data],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columns.map((column, index) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                columnIndex={index}
                tasks={column.tasks}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
