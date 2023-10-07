import React from 'react';
import { appStyles, allContentPaneStyles } from './app.styles';
import PageBlock from './pageBlock';
import CopySearch from './copySearch/copySearch';
import CheckInOut from './checkInOut/checkInOut';
import CheckoutsLists from './checkoutsLists/checkoutsLists';
import Logout from './auth/logout';

const App = () => {
    return (
        <div className={appStyles}>
            <div className={allContentPaneStyles}>
                <CopySearch />
                <Logout />
                <CheckInOut />
                <CheckoutsLists />
            </div>
        </div>
    );
};

export default App;