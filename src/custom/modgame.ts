import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState } from '../visi/zstate';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';

export type SpecificDeadline = {
    goaltables: number[][],
    attntable: number[],
    movegoals: number[],
};

/* Pull out the GOAL-TABLES. */
export function get_goal_tables(engine: GnustoEngine, state: ZState): SpecificDeadline
{
    // GOAL-TABLES
    let goaltables = [];
    for (let char=0; char<8; char++) {
        let goaltable = [];
        for (let ix=0; ix<20; ix += 2) {
            goaltable.push(engine.getUnsignedWord(11569 + 20*char + ix));
        }
        goaltables.push(goaltable);
    }

    // ATTENTION-TABLE
    let attntable = [];
    for (let char=0; char<8; char++) {
        attntable.push(engine.getUnsignedWord(11745+2*char));
    }

    let movegoals = [];
    // MOVEMENT-GOALS (top level only)
    for (let char=0; char<7; char++) {
        movegoals.push(engine.getUnsignedWord(11997+2*char));
    }
    
    return {
        goaltables: goaltables,
        attntable: attntable,
        movegoals: movegoals,
    }
}

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

