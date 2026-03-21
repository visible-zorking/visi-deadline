
/* Return the initial sourceloc to display. */
export function sourceloc_start() : string
{
    return 'K:237:1:254:0';  // 'verbs.zil', lines 237-253
}

// Presentation order. Filenames must match game-info!
export const sourcefile_presentation_list: string[] = [
    'deadline.zil',
    'dungeon.zil',
    'actions.zil',
    'main.zil',
    'goal.zil',
    'parser.zil',
    'syntax.zil',
    'verbs.zil',
    'macros.zil',
    'clock.zil',
    'crufty.zil',
];
