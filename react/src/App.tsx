import React, { useState } from 'react';
import './App.css';
import { PageFlagType, PageNameType } from './types/AppTypes';
import { TodoPage } from './pages/TodoPage';

function App() {

    const [pageFlags, setPageFlags] = useState<PageFlagType[]>([
        {pageName: "todo", isOpen: false},
        {pageName: "user", isOpen: false}
    ]);

    const handlePageFlags = (selectedName: PageNameType) => {
        const updatePageFlags = pageFlags.map((pageFlag) => (
            pageFlag.pageName === selectedName ?
            { pageName: pageFlag.pageName, isOpen: true }
            :
            { pageName: pageFlag.pageName, isOpen: false }
        ));
        setPageFlags(updatePageFlags);
    }

    return (
        <div className="App">
            <TodoPage
                handlePageFlags={handlePageFlags}
            />
        </div>
    );
}

export default App;
