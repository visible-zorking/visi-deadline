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
                <FeelieLink url={ 'coates-letter.jpg' } text={ 'Letter from Warren Coates (Attorney) to the Edindale Police Department' } />
            </div>
        </div>
    );
}

function FeelieLink({ url, text } : { url:string, text:string })
{
    return (
        <p className="Feelie">
            <a href={ '/pic/'+url } target="_blank">
                <img src={ '/pic/thumb/'+url } width="250" height="305" />
            </a>
            <br/>
            <a href={ '/pic/'+url } target="_blank">{ text }</a>
        </p>
    )
}
