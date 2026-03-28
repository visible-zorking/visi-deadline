import React from 'react';
import { useState, useContext, createContext } from 'react';

import { ZObject } from '../visi/zstate';
import { ObjectData, GlobalData } from '../visi/gametypes';
import { ReactCtx, StackCallCtx } from '../visi/context';
import { ArgShowObject, ArgShowProperty } from '../visi/actshowers';
import { VarShowObject, VarShowProperty } from '../visi/globshow';
import { gamedat_ids, gamedat_distances, gamedat_object_treesort } from '../visi/gamedat';

export function contains_label(obj: ObjectData) : string
{
    if (!obj.isroom) {
        // ...or other NPCs
        if (obj.onum == gamedat_ids.PLAYER)
            return 'carries';
        else
            return 'contains'
    }
    return '';
}

export function sorter_for_key(key: number) : (roots:ZObject[], map:Map<number, ZObject>) => void
{
    let originobj: number = gamedat_ids.PLAYER;

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
    switch (followKey) {
    case 0:
        follow = 'adv';
        break;
    case 1:
        follow = 'gardener';
        break;
    case 2:
        follow = 'baxter';
        break;
    case 3:
        follow = 'dunbar';
        break;
    case 4:
        follow = 'george';
        break;
    case 5:
        follow = 'mrs-robner';
        break;
    case 6:
        follow = 'rourke';
        break;
    }
    
    function evhan_follow_change(val: string) {
        switch (val) {
        case 'adv':
            setFollowKey(0);
            break;
        case 'gardener':
            setFollowKey(gamedat_ids.GARDENER);
            break;
        case 'baxter':
            setFollowKey(gamedat_ids.BAXTER);
            break;
        case 'dunbar':
            setFollowKey(gamedat_ids.DUNBAR);
            break;
        case 'george':
            setFollowKey(gamedat_ids.GEORGE);
            break;
        case 'mrs-robner':
            setFollowKey(gamedat_ids.MRS_ROBNER);
            break;
        case 'rourke':
            setFollowKey(gamedat_ids.ROURKE);
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
