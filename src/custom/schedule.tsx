import React from 'react';
import { useState, useContext } from 'react';

import { ZilSourceLoc } from '../visi/main';
import { ReactCtx } from '../visi/context';

import { signed_zvalue, unpack_address } from '../visi/gametypes';
import { gamedat_object_ids, gamedat_routine_addrs, gamedat_property_nums } from '../visi/gamedat';

import { SpecificDeadline } from './modgame';

const charnames = [
    'Player',
    'Gardener',
    'Baxter',
    'Dunbar',
    'George',
    'Mrs Robner',
    'Rourke',
    'Coates',
];

const dirabbrevs: { [key: number]: string } = {
    31: 'N',
    30: 'S',
    29: 'E',
    28: 'W',
    27: 'NE',
    26: 'NW',
    25: 'SE',
    24: 'SW',
    23: 'U',
    22: 'D',
    21: 'IN',
    20: 'OUT',
    0: '\u2014',
}

export function SchedulePage()
{
    let rctx = useContext(ReactCtx);
    let zstate = rctx.zstate;
    
    let specifics = zstate.specifics as SpecificDeadline;
    
    let rowls = [];
    for (let char=0; char<8; char++) {
        rowls.push(
            <GoalTableRow key={ char } char={ char } row={ specifics.goaltables[char] } />
        );
    }
    
    return (
        <div className="ScrollContent">
            <table className="GoalTable">
                <tbody>
                    { rowls }
                </tbody>
            </table>
        </div>
    );
}

function GoalTableRow({ char,  row }: { char:number, row:number[] })
{
    let rctx = useContext(ReactCtx);

    let obj0 = gamedat_object_ids.get(row[0]);
    let obj1 = gamedat_object_ids.get(row[1]);
    let obj2 = gamedat_object_ids.get(row[2]);
    let obj6 = gamedat_object_ids.get(row[6]);
    let func7 = gamedat_routine_addrs.get(unpack_address(row[7]));
    let prop3 = dirabbrevs[row[3]];
    
    function evhan_click_id(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
        ev.preventDefault();
        let dat: ZilSourceLoc = { id: id, commentary: true };
        window.dispatchEvent(new CustomEvent('zil-source-location', { detail:dat }));
    }
    
    return (
        <tr>
            <td>{ charnames[char] }</td>
            <td>
                {
                    obj0 ? obj0.name : '\u2014'
                }
            </td>
            <td>
                {
                    obj1 ? obj1.name : '\u2014'
                }
            </td>
            <td>
                {
                    obj2 ? obj2.name : '\u2014'
                }
            </td>
            <td>
                {
                    prop3 ? prop3 : row[3]
                }
            </td>
            <td>{ row[4] }</td>
            <td>{ row[5] }</td>
            <td>
                {
                    obj6 ? obj6.name : '\u2014'
                }
            </td>
            <td>
                { func7 ?
                  <a className="Src_Id" href="#" onClick={ (ev) => evhan_click_id(ev, 'RTN:'+func7.name) }>timer</a>
                  : '???'
                }
            </td>
            <td>{ row[8] }</td>
            <td>{ row[9] }</td>
        </tr>
    )
}
