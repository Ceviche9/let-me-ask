import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import light from './styles/theme/light';

import { Home } from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import {Room} from './pages/Room';
import {AdminRoom} from './pages/AdminRoom';


import {AuthContextProvider} from './contexts/AuthContext';


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
        <ThemeProvider theme={light}>
          <Route path='/' exact component={Home}/>
          <Route path='/rooms/new' component={NewRoom}/>
          <Route path='/rooms/rooms/:id' component={Room}/>
          
          <Route path='/rooms/admin/:id' component={AdminRoom}/>
        </ThemeProvider>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
