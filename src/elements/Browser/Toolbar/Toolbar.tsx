import React, { useState, useRef } from 'react';
// @ts-ignore
import { observer } from 'mobx-react';
// @ts-ignore
import { useTransition, animated } from 'react-spring';
import Store from '../../../functions/store/index';
import PlusIcon from './PlusIcon';
import { Tab } from '../../../types/tabs';
import WindowsButtons from '../../WindowsButtons';


const Toolbar = observer(() => {
    const [ tabList ] = useState<Tab[]>(Store.tabs.list);
    const transitions = useTransition(tabList, (item:any) => item.id, {
        from: { opacity: 0, transform: 'translateX(-10%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-10%)' }
    });

    return (
        <div className={`Toolbar ${process.platform}`}>
            <div className="tabs">
                {transitions.map(({item, props, key}:any) => (
                    <animated.div className="tab" style={props} key={key} onClick={(e:any) => {
                            e.cancelBubbles = false;
                            e.stopPropagation();
                            Store.tabs.select(item.id);
                    }}>
                        { item.currentTitle ? item.currentTitle : item.currentURL}
                        <div onClick={(e:any) => {
                            e.cancelBubbles = false;
                            e.stopPropagation();

                            Store.tabs.destroy(item.id);
                        }}>x</div>
                    </animated.div>
                ))}
            </div>

            <button 
                className="add-tab-button" 
                onClick={() => Store.tabs.create({ url: "https://google.com", selected: true })}>
                    <PlusIcon/>
            </button>

            { process.platform === "win32" && <WindowsButtons/> }
        </div> 
    )
})

export default Toolbar;