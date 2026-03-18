import React, {ReactNode} from "react";

export const formatText = (text: string): ReactNode[] => {
    return text.split(/\n|\\n|\u2028/).map((line, index, arr) => (
        <React.Fragment key={index}>
            {line}
            {index < arr.length - 1 && <br/>}
        </React.Fragment>
    ));
};
