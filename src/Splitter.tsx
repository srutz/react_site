import { useState, MouseEvent, useRef, PropsWithChildren, useEffect } from 'react'
import './Splitter.css'



interface SplitterProps {
    firstChild: JSX.Element
    secondChild: JSX.Element
}

export function Splitter(props: SplitterProps) {
    const {firstChild , secondChild } = props
    const [showOverlayHandle, setShowOverlayHandle] = useState(false)
    const [showDragPane, setShowDragPane] = useState(false)

    const [downX, setDownX] = useState(-1)
    const [relX, setRelX] = useState(-1)
    const [offsetX, setOffsetX] = useState(0)

    const firstPanel = useRef(null)
    const secondPanel = useRef(null)
    const overlayHandle = useRef(null)



    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const x = e.clientX
        const rect = e.currentTarget.getBoundingClientRect()
        const x0 = e.clientX - rect.left; //x position within the element.
        setRelX(x0)
        setDownX(x - x0)
        setShowDragPane(true)
    }

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        setShowDragPane(false)
        setShowOverlayHandle(false)
        if (downX != -1) {
            const p = firstPanel.current as unknown as HTMLDivElement
            p.style.width = (e.nativeEvent.offsetX - relX) + 'px'
            setDownX(-1)
        }
    }

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        //positionOverlayHandle(e.nativeEvent.offsetX)
        setOffsetX(e.nativeEvent.offsetX)
        setShowOverlayHandle(true)
    }

    return (
        <div className="splitter">
            <div className="splitter-firstpanel" ref={firstPanel}>
                {firstChild}
            </div>
            <div className={['splitter-handle', 'column-container centered-axis'].join(" ")} onMouseDown={onMouseDown}>
                { false && (<>
                <span className="text-xl">⯇</span>
                <span className="text-xl">⯈</span>                
                </>)}
            </div>
            <div className="splitter-secondpanel" ref={secondPanel}>
                {secondChild}
            </div>
            {showOverlayHandle 
                ? <div className="splitter-overlayhandle" ref={overlayHandle} style={{ left: offsetX + "px"}}></div> 
                : undefined }
            {showDragPane ? (
                <div className="splitter-dragpane" onMouseMove={onMouseMove} onMouseUp={onMouseUp}></div>) : undefined }
        </div>
    )
}
