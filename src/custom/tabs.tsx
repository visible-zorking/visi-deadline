import React from 'react';
import { useState, useContext, useEffect } from 'react';

import { ReactCtx } from '../visi/context';
import { gamedat_ids } from '../visi/gamedat';
import { map_toggle_doors } from './modgame';

import { CallActivity } from '../visi/activity';
import { TimerTable } from '../visi/timers';
import { GrammarTable } from '../visi/grammar';
import { GameMap } from '../visi/map';
import { ObjectTree } from '../visi/objtree';
import { ObjectAttrList, ObjectPropList } from '../visi/objlist';
import { ObjectPage } from '../visi/objpage';
import { GlobalState } from '../visi/globstate';
import { SourceFileList } from '../visi/filelist';
import { AboutPage } from './about';
import { SchedulePage } from './schedule';
import { FeeliesPage } from './feelies';
import { SolvePage } from './solve';

const tab_list = [
    [ 'activity', 'Activity' ],
    [ 'objtree', 'World' ],
    [ 'map', 'Map' ],
    [ 'globals', 'State' ],
    [ 'timers', 'Timers' ],
    [ 'schedule', 'Schedule' ],
    [ 'grammar', 'Grammar' ],
    [ 'filelist', 'Files' ],
    [ 'feelies', 'Feelies' ],
    [ 'solution', 'Solution' ],
    [ 'about', '?' ],
];

export function TabbedPane()
{
    let rctx = useContext(ReactCtx);

    const [ solutionActive, setSolutionActive ] = useState(false);
    
    const mobiles = [
        gamedat_ids.GARDENER,
        gamedat_ids.BAXTER,
        gamedat_ids.DUNBAR,
        gamedat_ids.GEORGE,
        gamedat_ids.MRS_ROBNER,
        gamedat_ids.ROURKE,
        gamedat_ids.COATES,
    ];

    let ells = tab_list.map(([key, label]) => {
        if (key == 'solution' && !solutionActive) {
            return null;
        }
        let cla = 'TabItem';
        if (key == rctx.tab)
            cla += ' Selected';
        else if (key == 'about' && !rctx.readabout)
            cla += ' Flashing';
        
        function evhan_click(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            ev.stopPropagation();
            rctx.setTab(key);
        }
    
        return (
            <div key={ key } className={ cla } onClick={ evhan_click }>
                <span>{ label }</span>
            </div>
        );
    });

    useEffect(() => {
        function evhan_showsolution(ev: Event) {
            setSolutionActive(true);
        };
        window.addEventListener('show-solution-tab', evhan_showsolution);
        return () => {
            window.removeEventListener('show-solution-tab', evhan_showsolution);
        };
    }, []);
    
    let tabcontent;
    switch (rctx.tab) {
    case 'objtree':
        if (rctx.objpage == null)
            tabcontent = <ObjectTree />;
        else if (rctx.objpage.type == 'OBJ')
            tabcontent = <ObjectPage onum={ rctx.objpage.val } />;
        else if (rctx.objpage.type == 'ATTR')
            tabcontent = <ObjectAttrList attr={ rctx.objpage.val } />;
        else if (rctx.objpage.type == 'PROP')
            tabcontent = <ObjectPropList propnum={ rctx.objpage.val } />;
        else
            tabcontent = <div>Unimplemented focus { rctx.objpage.type }</div>
        break;
    case 'activity':
        tabcontent = <CallActivity />;
        break;
    case 'map':
        tabcontent = <GameMap mobiles={ mobiles } extras={ map_toggle_doors } />;
        break;
    case 'globals':
        tabcontent = <GlobalState />;
        break;
    case 'timers':
        tabcontent = <TimerTable />;
        break;
    case 'grammar':
        tabcontent = <GrammarTable />;
        break;
    case 'filelist':
        tabcontent = <SourceFileList />;
        break;
    case 'schedule':
        tabcontent = <SchedulePage />;
        break;
    case 'feelies':
        tabcontent = <FeeliesPage />;
        break;
    case 'about':
        tabcontent = <AboutPage />;
        break;
    case 'solution':
        tabcontent = <SolvePage />;
        break;
    default:
        tabcontent = <>{ rctx.tab } not implemented</>;
        break;
    }
    
    return (
        <>
            <div className="TabBar">
                { ells }
            </div>
            <div className="TabContent">
                { tabcontent }
            </div>
        </>
    );
}
