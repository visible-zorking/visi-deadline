
/* Return the initial sourceloc to display. */
export function sourceloc_start() : string
{
    return 'K:235:1:250:0';  // 'verbs.zil', lines 235-249
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
