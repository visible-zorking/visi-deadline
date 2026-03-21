import React from 'react';

import { ExtWebLink } from './about';

export function FeeliesPage()
{
    return (
        <div className="ScrollContent">
            <div className="FeeliesPage">
                <h2>Documentary evidence</h2>
                <p>
                    <i>Deadline</i> originally came with a
                    &#x201C;Documentary Evidence&#x201D; file.
                    This provided your introduction to the mystery,
                    the background of many of the characters, and evidence
                    you need to begin your investigation.
                </p>
                <p>
                    You can view scans of these documents here.
                </p>
                <p>
                    Note: These images are scanned from the the honest-to-Frob
                    copy of <i>Deadline</i> that I played as a kid! They are
                    from the original 1982 &#x201C;Folio&#x201D; release of
                    the game. For a scan of the &#x201C;Grey Box&#x201D;
                    manual, visit the{' '}
                    <ExtWebLink url={ 'https://infodoc.plover.net/manuals/temp/deadline.pdf' } text={ 'InfoDoc Project' } />.
                </p>
                <hr />
                <FeelieLink url={ 'coates-letter.jpg' } width={ 250 } height={ 305 } text={ 'Letter from Warren Coates (Attorney) to the Edindale Police Department' } />
                <FeelieLink url={ 'scene-photo.jpg' } width={ 300 } height={ 240 } text={ 'Crime scene photo' } />
                <FeelieLink url={ 'corpus-delicti.jpg' } width={ 250 } height={ 323 } text={ 'Coroner\u2019s report' } />
                <FeelieLink url={ 'official-memo.jpg' } width={ 250 } height={ 161 } text={ 'Memo from Detective Anderson' } />
                <FeelieLink url={ 'lab-report.jpg' } width={ 250 } height={ 164 } text={ 'Lab report on teacup' } />
                <FeelieLink url={ 'evidence-label.jpg' } width={ 133 } height={ 71 } text={ 'Evidence label for tablets' } />
                <p>
                    (The label was attached to a baggie of three white tablets.
                    I still have the baggie, but the tablets have crumbled
                    to moldy ash, so I am not including them here.)
                </p>
                <FeelieLink url={ 'interview-mrs-robner.jpg' } width={ 200 } height={ 327 } text={ 'Police interview with Mrs. Robner' } />
                <FeelieLink url={ 'interview-dunbar.jpg' } width={ 200 } height={ 327 } text={ 'Police interview with Ms. Dunbar' } />
                <FeelieLink url={ 'interview-baxter.jpg' } width={ 200 } height={ 327 } text={ 'Police interview with Mr. Baxter' } />
                <FeelieLink url={ 'interview-george.jpg' } width={ 200 } height={ 327 } text={ 'Police interview with George Robner' } />
                <FeelieLink url={ 'interview-rourke.jpg' } width={ 200 } height={ 327 } text={ 'Police interview with Mrs. Rourke' } />
                <hr />
                <p>
                    This page was not part of the original release; it was
                    added for the 1984 &#x201C;Grey Box&#x201D; package.
                    This scan courtesy of the InfoDoc Project.
                </p>
                <FeelieLink url={ 'detective-notes.jpg' } width={ 250 } height={ 293 } text={ 'Handwritten notes by the detective' } />
            </div>
        </div>
    );
}

function FeelieLink({ url, text, width, height } : { url:string, text:string, width:number, height:number })
{
    return (
        <p className="Feelie">
            <a href={ '/pic/'+url } target="_blank">
                <img src={ '/pic/thumb/'+url } width={ width } height={ height } />
            </a>
            <br/>
            <a href={ '/pic/'+url } target="_blank">{ text }</a>
        </p>
    )
}
