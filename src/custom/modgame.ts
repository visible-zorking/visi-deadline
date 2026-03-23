import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState } from '../visi/zstate';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';

/* Pull out the GOAL-TABLES. */
export function get_goal_tables(engine: GnustoEngine, state: ZState): any
{
    let goaltables = [];
    for (let char=0; char<8; char++) {
        let goaltable = [];
        for (let ix=0; ix<20; ix += 2) {
            goaltable.push(engine.getWord(11569 + 20*char + ix));
        }
        goaltables.push(goaltable);
    }

    return {
        goaltables: goaltables
    }
}

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

