import React from 'react';
import { observer } from 'mobx-react';
import Store from '../../../functions/store/index';
import PlusIcon from './PlusIcon';

const Toolbar = observer(() => {
    return (
        <div className="Toolbar">
            <div className="tabs">
                {Store.tabs.list.map((item, i) => (
                    <div className="tab" key={i}>
                        <button onClick={() => Store.tabs.select(item.id)}>{item.id} {Store.tabs.selected.url}</button>
                        <button onClick={() => Store.tabs.destroy(item.id)}>x</button>
                    </div>
                ))}
                
                <button 
                    className="add-tab-button" 
                    onClick={() => Store.tabs.create({ url: "https://google.com", selected: true })}>
                        <PlusIcon/>
                </button>

            </div>
        </div> 
    )
})

export default Toolbar;