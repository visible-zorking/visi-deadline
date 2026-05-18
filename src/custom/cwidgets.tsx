import React from 'react';
import { useState, useContext, createContext } from 'react';

import { ZState, ZObject } from '../visi/zstate';
import { ObjectData, GlobalData } from '../visi/gametypes';
import { ReactCtx, StackCallCtx } from '../visi/context';
import { ArgShowObject, ArgShowProperty } from '../visi/actshowers';
import { VarShowObject, VarShowProperty } from '../visi/globshow';
import { gamedat_ids, gamedat_distances, gamedat_object_treesort } from '../visi/gamedat';

export function contains_label(obj: ObjectData) : string
{
    let isperson = (
        obj.onum == gamedat_ids.PLAYER
        || obj.onum == gamedat_ids.GARDENER
        || obj.onum == gamedat_ids.BAXTER
        || obj.onum == gamedat_ids.DUNBAR
        || obj.onum == gamedat_ids.GEORGE
        || obj.onum == gamedat_ids.MRS_ROBNER
        || obj.onum == gamedat_ids.ROURKE
    );
    if (!obj.isroom) {
        // ...or other NPCs
        if (isperson)
            return 'carries';
        else
            return 'contains'
    }
    return '';
}

export function sorter_for_key(key: number, zstate: ZState) : (roots:ZObject[], map:Map<number, ZObject>) => void
{
    let originobj: number = gamedat_ids.PLAYER;
    const followObjs = [gamedat_ids.PLAYER, gamedat_ids.GARDENER, gamedat_ids.BAXTER, gamedat_ids.DUNBAR, gamedat_ids.GEORGE, gamedat_ids.MRS_ROBNER, gamedat_ids.ROURKE];
    if (key >= 0 && key < followObjs.length)
        originobj = followObjs[key];

    return function(roots: ZObject[], map: Map<number, ZObject>) {
        let advroom = originobj;

        while (true) {
            let tup = map.get(advroom);
            if (!tup || tup.parent == 0 || tup.parent == gamedat_ids.ROOMS)
                break;
            advroom = tup.parent;
        }
        
        if (!gamedat_distances[advroom])
            advroom = gamedat_ids.STARTROOM;
        let distmap = gamedat_distances[advroom];

        roots.sort((o1, o2) => {
            let sort1 = gamedat_object_treesort.get(o1.onum) ?? 0;
            let sort2 = gamedat_object_treesort.get(o2.onum) ?? 0;
            if (sort1 != sort2)
                return sort1 - sort2;
            if (sort1 == 1 && distmap !== undefined)
                return distmap[o1.onum] - distmap[o2.onum];
            return (o1.onum - o2.onum);
        });
    }
}

export function ObjListSorter({ followKey, setFollowKey } : { followKey:number, setFollowKey:(v:number)=>void })
{
    let follow: string = 'adv';
    const followKeys = ['adv', 'gardener', 'baxter', 'dunbar', 'george', 'mrs-robner', 'rourke'];
    if (followKey >= 0 && followKey < followKeys.length)
        follow = followKeys[followKey];
    
    function evhan_follow_change(val: string) {
        switch (val) {
        case 'adv':
            setFollowKey(0);
            break;
        case 'gardener':
            setFollowKey(1);
            break;
        case 'baxter':
            setFollowKey(2);
            break;
        case 'dunbar':
            setFollowKey(3);
            break;
        case 'george':
            setFollowKey(4);
            break;
        case 'mrs-robner':
            setFollowKey(5);
            break;
        case 'rourke':
            setFollowKey(6);
            break;
        }
    }
    
    return (
        <div>
            Follow{' '}
            <input id="followadv_radio" type="radio" name="follow" value="adv" checked={ follow=='adv' } onChange={ (ev) => evhan_follow_change('adv') } />
            <label htmlFor="followadv_radio">Player</label>{' '}
            <input id="followgardener_radio" type="radio" name="follow" value="gardener" checked={ follow=='gardener' } onChange={ (ev) => evhan_follow_change('gardener') } />
            <label htmlFor="followgardener_radio">Gardener</label>
            <input id="followbaxter_radio" type="radio" name="follow" value="baxter" checked={ follow=='baxter' } onChange={ (ev) => evhan_follow_change('baxter') } />
            <label htmlFor="followbaxter_radio">Baxter</label>
            <input id="followdunbar_radio" type="radio" name="follow" value="dunbar" checked={ follow=='dunbar' } onChange={ (ev) => evhan_follow_change('dunbar') } />
            <label htmlFor="followdunbar_radio">Dunbar</label>
            <input id="followgeorge_radio" type="radio" name="follow" value="george" checked={ follow=='george' } onChange={ (ev) => evhan_follow_change('george') } />
            <label htmlFor="followgeorge_radio">George</label>
            <input id="followmrsrobner_radio" type="radio" name="follow" value="mrs-robner" checked={ follow=='mrs-robner' } onChange={ (ev) => evhan_follow_change('mrs-robner') } />
            <label htmlFor="followmrsrobner_radio">Mrs Robner</label>
            <input id="followrourke_radio" type="radio" name="follow" value="rourke" checked={ follow=='rourke' } onChange={ (ev) => evhan_follow_change('rourke') } />
            <label htmlFor="followrourke_radio">Rourke</label>
        </div>
    );
}

export function global_value_display(tag: string, value: number, glo: GlobalData) : JSX.Element|null
{
    switch (tag) {
        
    case 'PRSO':
        let rctx = useContext(ReactCtx);
        if (rctx.zstate.globals[177] == 130) {  /* PRSA == WALK */
            return (
                <VarShowProperty value={ value } />
            )
        }
        return (
            <VarShowObject value={ value } />
        )
        
    case 'HMTIME':
        return (
            <ArgShowTime value={ value } />
        );
        
    case 'HMTIMEZ':
        if (value == 0) {
            return <i>not set</i>;
        }
        return (
            <ArgShowTime value={ value } />
        );
        
    }
    
    return null;
}

export function property_value_display(tag: string, values: number[]) : JSX.Element|null
{
    switch (tag) {
        
    case 'CORBITS':
        return (
            <VarShowCorridorBits value={ values[0]*0x100+values[1] } />
        )
        
    case 'TLINE':
        return (
            <VarShowTLine value={ values[1] } />
        )
    }
    
    return null;
}

export function stack_call_arg_display(tag: string, value: number) : JSX.Element|null
{
    switch (tag) {
        
    case 'PERFORMO':
        let ctx = useContext(StackCallCtx);
        if (ctx.args[0] == 130) {      /* action WALK */
            return (
                <ArgShowProperty value={ value } />
            );
        }
        return (
            <ArgShowObject value={ value } />
        )
        
    case 'PERFORMI':
        return (
            <ArgShowObject value={ value } />
        )
        
    case 'HMTIME':
        return (
            <ArgShowTime value={ value } />
        )
        
    }

    return null;
}

export function VarShowCorridorBits({ value }: { value:number })
{
    let ls: string[] = [];

    for (let bit=1; bit < 65536; bit *= 2) {
        if (value & bit)
            ls.push(''+bit);
    }

    if (!ls.length)
        ls.push('0');
    
    let str = ls.join(',');
    
    return (
        <i>cor-{ str }</i>
    );
}

export function VarShowTLine({ value }: { value:number })
{
    let val: string;
    switch (value) {
    case 0:
        val = ',TOP-OF-THE-LINE-C';
        break;
    case 1:
        val = ',BOTTOM-LINE-C';
        break;
    case 2:
        val = ',OUTSIDE-LINE-C';
        break;
    case 3:
        val = ',FOOD-LINE-C';
        break;
    default:
        return null;
    }
    return (
        <code>{ val }</code>
    );
}

export function ArgShowTime({ value }: { value:number })
{
    let minutes = value % 60;
    let hours = Math.floor(value / 60);

    let ampm = (hours < 12) ? 'am' : 'pm';
    if (hours == 0) {
        hours = 12;
    }
    else if (hours > 12) {
        hours -= 12;
    }
    let strmin = ''+minutes;
    if (minutes < 10)
        strmin = '0'+minutes;

    return (
        <i>{ hours }:{ strmin }{ ampm }</i>
    )
}
