import React, { FC } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { Frame } from '../components/Frame';
import { Students } from './Students';
import { Courses } from './Courses';
import { SCs } from './SCs';

export const Index: FC = () => (
    <Router>
        <Switch>
            <Frame>
                <Route path='/' exact><Redirect to='/student' /></Route>
                <Route path='/student'><Students /></Route>
                <Route path='/sc'><SCs /></Route>
                <Route path='/course'><Courses /></Route>
            </Frame>
        </Switch>
    </Router>
);
