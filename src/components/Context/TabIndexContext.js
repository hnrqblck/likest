import React from 'react';

export const TabIndexContext = React.createContext();

export const TabIndex = ({children}) => {
    const [tabInd, setTabInd] = React.useState(0);

    function handleTabIndex(index) {
        setTabInd(index)
    }


    return (
        <TabIndexContext.Provider value={{ tabInd, handleTabIndex}}>
            {children}
        </TabIndexContext.Provider>
    )
}