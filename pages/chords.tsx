import { useState } from "react";
import { chords, generateFretboard2, pattern } from "../utils";

export default function() {

    const [key, setKey] = useState('');
    const [chord, setChord] = useState<string | undefined>(undefined);
    const [type, setType] = useState<string | undefined>(undefined);

    return (
        <div>
            <label htmlFor="keySelect">Key</label>
            <select name="keySelect" value={key} onChange={(e) => setKey(e.target.value)}>
                <option value=''></option>
                {pattern.map((note) => (<option value={note}>{note}</option>))}
            </select>

            <br/>

            <label htmlFor="chordSelect">Chord</label>
            <select name="chordSelect" value={chord} onChange={(e) => setChord(e.target.value)}>
                <option value={undefined}></option>
                {chords.map((chord) => (<option value={chord.name}>{chord.name}</option>))}
            </select>

            <br />

            <label htmlFor="typeSelect">Type</label>
            <select name="typeSelect" value={type} onChange={(e) => setType(e.target.value)}>
                <option value={undefined}></option>
            </select>

            {key && chord && <div>
                {generateFretboard2(key, undefined, false, chord)}
                </div>}
        </div>
    )
}