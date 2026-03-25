import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState } from '../visi/zstate';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';

export type SpecificDeadline = {
    goaltables: number[][],
    attntable: number[],
    movegoals: number[],
    movetimes: number[][],
};

// Initial values and lengths of the MOVEMENT-GOALS table.
// (Seven characters, because Coates does not partake.)
export const initialmovegoals = [
    { initial: 11793, len: 0 },
    { initial: 11799, len: 6 },
    { initial: 11839, len: 2 },
    { initial: 11855, len: 4 },
    { initial: 11883, len: 7 },
    { initial: 11929, len: 5 },
    { initial: 11963, len: 5 },
];

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
    let movetimes = [];
    // MOVEMENT-GOALS
    // Here, we need the top-level pointer and the first value (only) from
    // each row. (The other two values are static.)
    for (let char=0; char<7; char++) {
        movegoals.push(engine.getUnsignedWord(11997+2*char));
        let times = [];
        for (let ix=0; ix<initialmovegoals[char].len; ix++) {
            times.push(engine.getUnsignedWord(initialmovegoals[char].initial+ix*6+2));
        }
        movetimes.push(times);
    }
    
    return {
        goaltables: goaltables,
        attntable: attntable,
        movegoals: movegoals,
        movetimes: movetimes,
    }
}

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

