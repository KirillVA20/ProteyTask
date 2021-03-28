import React, {useState, ReactNode} from 'react';

interface TooltipProps {
    text: string,
    position: 'top' | 'left' | 'bottom' | 'right',
    children: ReactNode
}

function Tooltip(props:TooltipProps) {
    return(
        <div className={`tooltip tooltip--${props.position}`}>
            <div className="tooltip__element">
                {props.text}
            </div>
            {
                props.children
            }
        </div>
    )
}

export default Tooltip;