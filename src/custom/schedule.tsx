import React from 'react';
import { useState, useContext } from 'react';

import { ZilSourceLoc } from '../visi/main';
import { ReactCtx } from '../visi/context';

import { signed_zvalue, unpack_address } from '../visi/gametypes';
import { gamedat_object_ids, gamedat_routine_addrs, gamedat_property_nums } from '../visi/gamedat';

import { SpecificDeadline } from './modgame';

type CharTableType = {
    name: string,
    id: number,
}

// This duplicates gameids, sorry.
const charnames: CharTableType[] = [
    { name: 'Player', id: 160 },
    { name: 'Gardener', id: 159 },
    { name: 'Baxter', id: 157 },
    { name: 'Dunbar', id: 155 },
    { name: 'George', id: 153 },
    { name: 'Mrs Robner', id: 151 },
    { name: 'Rourke', id: 149 },
    { name: 'Coates', id: 54 },
];

// And this duplicates properties.
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

// Initial values of the MOVEMENT-GOALS table. (Seven characters, because
// Coates does not partake.)
const initialmovegoals = [11793, 11799, 11839, 11855, 11883, 11929, 11963];

export function SchedulePage()
{
    function evhan_click_id(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
        ev.preventDefault();
        let dat: ZilSourceLoc = { id: id, commentary: true };
        window.dispatchEvent(new CustomEvent('zil-source-location', { detail:dat }));
    }
    
    return (
        <div className="ScrollContent">
            <p>
                Infocom introduced an autonomous NPC in <em>Zork 1</em>,
                but <em>Deadline</em>&#x2019;s seven characters are a vast
                leap in sophistication. Each has a schedule over the
                game&#x2019;s twelve-hour timeline.
                The schedule has a random element,
                so each playthrough is slightly different; and the NPCs
                can be diverted by your actions as well.
            </p>
            <p>
                Each character&#x2019;s scheduled activity is managed by the{' '}
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'GLOB:GOAL-TABLES') }><code>GOAL-TABLES</code></a>
                {' '}and{' '}
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'GLOB:MOVEMENT-GOALS') }><code>MOVEMENT-GOALS</code></a>
                {' '}tables. These are quite complicated, so I have broken
                them down into smaller tables for display in this tab.
            </p>
            <p>
                Let&#x2019;s start with the characters&#x2019; current
                locations, and the timer routines that control each of them:
            </p>
            <CharacterTable />
            <p>
                To manage NPC movement, the game defines four
                &#x201C;<a href="#" onClick={ (ev) => evhan_click_id(ev, 'GLOB:TOP-OF-THE-LINE') }>transit lines</a>&#x201D;
                that run through the map.
                Every room is either a &#x201C;station&#x201D;
                on one of these lines, or adjacent to a station room.
                Thus, to reach a goal, an NPC just needs to
                (1) move to the local station if needed;
                (2) move one step along the current line to the next
                interchange;
                (3) if on the goal line, move one step towards the
                goal station;
                (4) move to the final room (if that&#x2019;s not the station).
                The{' '}
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'RTN:IMOVEMENT') }><code>IMOVEMENT</code></a>{' '}
                routine handles this.
            </p>
            <p>
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'GLOB:GOAL-TABLES') }><code>GOAL-TABLES</code></a>{' '}
                shows each character&#x2019;s current movement goal.
                &#x201C;Final&#x201D; is where they are heading;
                &#x201C;station&#x201D; is that room&#x2019;s{' '}
                <code>STATION</code>;
                &#x201C;inter&#x201D; is the interchange
                room that will get them onto the desired line.
                The &#x201C;dir&#x201D; is the direction they just moved
                (not used in practice).
                The &#x201C;&#x2611;&#x201D; column is whether the
                character&#x2019;s movement is enabled.
            </p>
            <GoalTable />
            <p>
                If you call a character&#x2019;s name, or otherwise attract
                their attention,{' '}
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'RTN:GRAB-ATTENTION') }><code>GRAB-ATTENTION</code></a>
                {' '}temporarily disables their movement.
                (See &#x201C;&#x2611;&#x201D; above.) It then sets their
                entry in the{' '}
                <a href="#" onClick={ (ev) => evhan_click_id(ev, 'GLOB:ATTENTION-TABLE') }><code>ATTENTION-TABLE</code></a>,
                which then decreases each turn
                (<a href="#" onClick={ (ev) => evhan_click_id(ev, 'RTN:I-ATTENTION') }><code>I-ATTENTION</code></a>)
                until it reaches zero.
                Different characters have different attention spans.
            </p>
            <AttentionTable />
        </div>
    );
}

function CharacterTable()
{
    let rctx = useContext(ReactCtx);
    let zstate = rctx.zstate;

    let specifics = zstate.specifics as SpecificDeadline;
    
    let rowls = [];
    for (let char=0; char<8; char++) {
        let charid = charnames[char].id;
        // We rely on the fact that the zstate reports objects in order (1-based).
        let loc = zstate.objects[charid-1].parent;
        let timertn = specifics.goaltables[char][7];
        rowls.push(
            <CharacterTableRow key={ char } char={ char } loc={ loc } timertn={ timertn } />
        );
    }
    
    return (
        <table className="GoalTable">
            <tbody>
                <tr>
                    <th>person</th>
                    <th>location</th>
                    <th>timer</th>
                </tr>
                { rowls }
            </tbody>
        </table>
    );
}

function CharacterTableRow({ char, loc, timertn }: { char:number, loc:number, timertn:number })
{
    let locobj = gamedat_object_ids.get(loc);
    let func7 = gamedat_routine_addrs.get(unpack_address(timertn));
    
    function evhan_click_id(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
        ev.preventDefault();
        let dat: ZilSourceLoc = { id: id, commentary: true };
        window.dispatchEvent(new CustomEvent('zil-source-location', { detail:dat }));
    }
    
    return (
        <tr>
            <td>{ charnames[char].name }</td>
            <td>
                {
                    locobj ?
                    <a className="Src_Id" href="#" onClick={ (ev) => evhan_click_id(ev, 'OBJ:'+locobj.name) }>{ locobj.name }</a>
                        
                    : '\u2014'
                }
            </td>
            <td>
                { func7 ?
                  <a className="Src_Id" href="#" onClick={ (ev) => evhan_click_id(ev, 'RTN:'+func7.name) }>{ func7.name }</a>
                  : '???'
                }
            </td>
        </tr>
    );
}

function GoalTable()
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
        <table className="GoalTable">
            <tbody>
                <tr>
                    <th>person</th>
                    <th>final</th>
                    <th>station</th>
                    <th>inter</th>
                    <th>dir</th>
                    <th>&#x2610;</th>
                    <th>pri</th>
                    <th>queued</th>
                </tr>
                { rowls }
            </tbody>
        </table>
    );
}

function GoalTableRow({ char,  row }: { char:number, row:number[] })
{
    let rctx = useContext(ReactCtx);

    let obj0 = gamedat_object_ids.get(row[0]);
    let obj1 = gamedat_object_ids.get(row[1]);
    let obj2 = gamedat_object_ids.get(row[2]);
    let obj6 = gamedat_object_ids.get(row[6]);
    let prop3 = dirabbrevs[row[3]];
    
    return (
        <tr>
            <td>{ charnames[char].name }</td>
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
            <td>
                { (row[4] ?
                   <span className="TimerActive">&#x2611;</span> :
                   <span className="TimerInactive">&#x2610;</span>) }
            </td>
            <td>{ row[5] }</td>
            <td>
                {
                    obj6 ? obj6.name : '\u2014'
                }
            </td>
        </tr>
    )
}

function AttentionTable()
{
    let rctx = useContext(ReactCtx);
    let zstate = rctx.zstate;

    let specifics = zstate.specifics as SpecificDeadline;
    
    let rowls = [];
    for (let char=0; char<8; char++) {
        rowls.push(
            <AttentionTableRow key={ char } char={ char } attn={ specifics.attntable[char] } span={ specifics.goaltables[char][8] } />
        );
    }
    
    return (
        <table className="GoalTable">
            <tbody>
                <tr>
                    <th>person</th>
                    <th>attn</th>
                    <th>span</th>
                </tr>
                { rowls }
            </tbody>
        </table>
    );
}

function AttentionTableRow({ char, attn, span }: { char:number, attn:number, span:number })
{
    attn = signed_zvalue(attn);
    if (attn < 0)
        attn = 0;
    
    return (
        <tr>
            <td>{ charnames[char].name }</td>
            <td>{ attn }</td>
            <td>{ span }</td>
        </tr>
    )
}

