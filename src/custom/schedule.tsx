import React from 'react';
import { useState, useContext } from 'react';

import { ReactCtx } from '../visi/context';

export function SchedulePage()
{
    let rctx = useContext(ReactCtx);
    let zstate = rctx.zstate;
    
    let specifics = zstate.specifics;
    
    let rowls = [];
    for (let char=0; char<8; char++) {
        rowls.push(
            <GoalTableRow key={ char } row={ specifics.goaltables[char] } />
        );
    }
    
    return (
        <div className="ScrollContent">
            <table>
                <tbody>
                    { rowls }
                </tbody>
            </table>
        </div>
    );
}

function GoalTableRow({ row }: { row:number[] })
{
    return (
        <tr>
            <td>{ row[0] }</td>
            <td>{ row[1] }</td>
            <td>{ row[2] }</td>
            <td>{ row[3] }</td>
            <td>{ row[4] }</td>
            <td>{ row[5] }</td>
            <td>{ row[6] }</td>
            <td>{ row[7] }</td>
            <td>{ row[8] }</td>
            <td>{ row[9] }</td>
        </tr>
    )
}
