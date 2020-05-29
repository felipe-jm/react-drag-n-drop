import React from 'react';

import GlobalStyles from './styles/global';

import Kanban from './components/Kanban';

const App: React.FC = () => (
  <>
    <Kanban />
    <GlobalStyles />
  </>
);

export default App;
