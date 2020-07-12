import React from 'react';

import { observer } from 'mobx-react';

import Store from '../../../functions/store/index';

const Toolbar = observer(() => {
    return (
        <>
            {Store.tabs.list.map((item) => (
                <button onClick={() => Store.tabs.select(item.id)}>{item.id} {Store.tabs.selected.url}</button>
            ))}

            <button onClick={() => Store.tabs.create({ url: "https://google.com", selected: true })}>dodaj nowa</button>
        </>
    )
})

export default Toolbar;