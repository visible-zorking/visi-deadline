import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { ExtraToggle } from '../visi/map';
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

export function map_toggle_doors(zstate: ZStatePlus): ExtraToggle[]
{
    // Once again we rely on the fact that the zstate reports objects in order (1-based).
    let frontdoorflag = zstate.objects[245-1].attrs & 0x08; // FRONT-DOOR & OPENBIT
    let frontdoorstate = frontdoorflag ? 'Invisible' : 'Visible';
    let baywindowflag = zstate.objects[243-1].attrs & 0x08; // BAY-WINDOW & OPENBIT
    let baywindowstate = baywindowflag ? 'Invisible' : 'Visible';
    let hiddendoorbflag = zstate.objects[179-1].attrs & 0x08; // HIDDEN-DOOR-B & OPENBIT
    let hiddendoorbstate = hiddendoorbflag ? 'Invisible' : 'Visible';
    let hiddendoorlflag = zstate.objects[184-1].attrs & 0x08; // HIDDEN-DOOR-L & OPENBIT
    let hiddendoorlstate = hiddendoorlflag ? 'Invisible' : 'Visible';
    
    return [
        { id: 'toggle-front-door', class: frontdoorstate },
        { id: 'toggle-bay-window', class: baywindowstate },
        { id: 'toggle-hidden-door-b', class: hiddendoorbstate },
        { id: 'toggle-hidden-door-l', class: hiddendoorlstate },
    ];
}

export type LegalState = {
    present_time: number;
    note_read: number;
    call_overheard: number;
    envelope_opened: number;
    stub_d: number;
    lab_report: number;
    baxter_papers: number;
    new_will_seen: number;
    george_run: number;
    meeting_interrupted: number;
    dunbar_dead: number;
    baxter_seen: number;
    pen_seen: number;
};

export function get_legal_state(zstate: ZStatePlus)
{
    let present_time = zstate.globals[118];
    let note_read = zstate.globals[93];
    let call_overheard = zstate.globals[60];
    let envelope_opened = zstate.globals[58];
    let stub_d = zstate.globals[39];
    let lab_report = zstate.objects[85-1].attrs & 0x02; // LAB-REPORT & TOUCHBIT
    let baxter_papers = zstate.objects[144-1].attrs & 0x02; // LAB-REPORT & TOUCHBIT
    let new_will_seen = zstate.globals[69];
    let george_run = zstate.globals[72];
    let meeting_interrupted = zstate.globals[30];
    let dunbar_dead = zstate.globals[27];
    let baxter_seen = zstate.globals[25];
    let pen_seen = zstate.globals[96];

    return {
        present_time,
        note_read,
        call_overheard,
        envelope_opened,
        stub_d,
        lab_report,
        baxter_papers,
        new_will_seen,
        george_run,
        meeting_interrupted,
        dunbar_dead,
        baxter_seen,
        pen_seen,
    };
}

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    if (topic == 'SHOW-SOLUTION-TAB') {
        window.dispatchEvent(new Event('show-solution-tab'));
        return null;
    }
    
    return null;
}

