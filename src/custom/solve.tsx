import React from 'react';

import { ZilSourceLoc } from '../visi/main';

export function SolvePage()
{
    return (
        <div className="ScrollContent">
            <div className="SolutionPage">
                <p>
                    This tab shows every possible outcome of arresting each
                    character (or combination of characters).
                </p>
                <p>
                    Beware <i>SPOILERS!</i> Even more spoilery than usual
                    for the Visible Zorker.
                </p>
                <ArrestBaxter />
                <ArrestDunbar />
                <ArrestGeorge />
                <ArrestMrsRobner />
                <ArrestOthers />
            </div>
        </div>
    );
}

function ArrestBaxter()
{
    return (
        <div>
            <h3 className="Arrest">ARREST BAXTER</h3>
            <div className="Cond">
                Dunbar killed <b>and</b>{' '}
                saw Baxter running from Dunbar&#x2019;s corpse{' '}
                (<IdRef val="GLOB:BAXTER-SEEN" />),
                or saw his pen that he wrote the fake suicide note
                with (<IdRef val="GLOB:PEN-SEEN" />), <b>and</b>...
            </div>

            <div className="CondGroup">
                <div className="Cond">
                    Found the <IdRef val="OBJ:BAXTER-PAPERS" /> and the notepad text (<IdRef val="GLOB:NOTE-READ" />):
                </div>
                <div className="Outcome">
                    Guilty of both murders.
                </div>
                <div className="Cond">
                    Otherwise:
                </div>
                <div className="Outcome">
                    Guilty of Dunbar&#x2019;s murder; no motive for Robner.
                </div>
            </div>

            <div className="Cond">
                Dunbar killed <b>and</b>...
            </div>
            
            <div className="CondGroup">
                <div className="Cond">
                    Found the <IdRef val="OBJ:BAXTER-PAPERS" />:
                </div>
                <div className="Outcome">
                    Baxter committed Focus crimes, but not murder;
                    Dunbar probably the killer.
                </div>
                <div className="Cond">
                    Otherwise:
                </div>
                <div className="Outcome">
                    Acquitted; Dunbar was the killer.
                </div>
            </div>
            
            <div className="Cond">
                Found the <IdRef val="OBJ:BAXTER-PAPERS" />, <b>and</b>....
            </div>
            
            <div className="CondGroup">
                <div className="Cond">
                    Got the <IdRef val="OBJ:LAB-REPORT" />:
                </div>
                <div className="Outcome">
                    Had motive and means to enter the house, but no
                    means to administer drug.
                </div>
                <div className="Cond">
                    Otherwise:
                </div>
                <div className="Outcome">
                    <IdRef val="RTN:MURDER-NOT-PROVEN" />.
                </div>
            </div>
            
            <div className="Cond">
                Got the <IdRef val="OBJ:LAB-REPORT" />:
            </div>
            <div className="Outcome">
                No motive, no means to administer drug.
            </div>
            <div className="Cond">
                Otherwise:
            </div>
            <div className="Outcome">
                No motive and <IdRef val="RTN:MURDER-NOT-PROVEN" />.
            </div>
        </div>
    );
}

function ArrestDunbar()
{
    return (
        <div>
            <h3 className="Arrest">ARREST DUNBAR</h3>
            <div className="Cond">
                Got the <IdRef val="OBJ:LAB-REPORT" />:
            </div>

            <div className="CondGroup">
                <div className="Cond">
                    Argued with Baxter in shed (<IdRef val="GLOB:MEETING-INTERRUPTED" />):
                </div>
                <div className="Outcome">
                    Dunbar found dead during trial!
                </div>
                <div className="Cond">
                    Otherwise:
                </div>
                <div className="Outcome">
                    No motive, only circumstantial evidence.
                </div>
            </div>
            
            <div className="Cond">
                Otherwise:
            </div>
            <div className="Outcome">
                <IdRef val="RTN:MURDER-NOT-PROVEN" />.
            </div>
        </div>
    );
}

function ArrestGeorge()
{
    return (
        <div>
            <h3 className="Arrest">ARREST GEORGE</h3>
            <div className="Cond">
                Saw the <IdRef val="OBJ:NEW-WILL" /> or caught George in the act of destroying it:
            </div>
            <div className="Outcome">
                Acquitted.
            </div>
            <div className="Cond">
                Otherwise:
            </div>
            <div className="Outcome">
                Insufficient evidence for arrest.
            </div>
        </div>
    );
}

function ArrestMrsRobner()
{
    return (
        <div>
            <h3 className="Arrest">ARREST MRS ROBNER</h3>
            <div className="Cond">
                Snooped on the phone call (<IdRef val="GLOB:CALL-OVERHEARD" />) or the envelope (<IdRef val="GLOB:ENVELOPE-OPENED" />):
            </div>
            <div className="CondGroup">
                <div className="Cond">
                    Got the <IdRef val="OBJ:LAB-REPORT" />:
                </div>
                <div className="Outcome">
                    No indictment; no evidence linking her to crime.
                </div>
                <div className="Cond">
                    Otherwise:
                </div>
                <div className="Outcome">
                    <IdRef val="RTN:MURDER-NOT-PROVEN" />.
                </div>
            </div>
            
            <div className="Cond">
                Otherwise:
            </div>
            <div className="Outcome">
                Insufficient evidence for arrest.
            </div>
        </div>
    );
}

function ArrestOthers()
{
    return (
        <div>
            <h3 className="Arrest">ARREST ROURKE</h3>
            <div className="Outcome">
                Insufficient evidence for arrest.
            </div>
            <h3 className="Arrest">ARREST MCNABB</h3>
            <div className="Outcome">
                Insufficient evidence for arrest.
            </div>
            <h3 className="Arrest">ARREST DUFFY</h3>
            <div className="Outcome">
                Oh, come on now!  Not trusty Sergeant Duffy!
            </div>
        </div>
    );
}

// This doesn't require a context, turns out.
function evhan_click_id(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
    ev.preventDefault();
    let dat: ZilSourceLoc = { id: id, commentary: true };
    window.dispatchEvent(new CustomEvent('zil-source-location', { detail:dat }));
}

function IdRef({ val }: { val:string })
{
    let valname = val;
    let pos = val.indexOf(':');
    if (pos >= 0) {
        valname = val.slice(pos+1);
    }
    
    return (
        <a href="#" className="Src_Id" onClick={ (ev) => evhan_click_id(ev, val) }><code>{ valname }</code></a>
    )
}
