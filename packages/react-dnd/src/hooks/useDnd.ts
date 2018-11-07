import * as React from 'react'
import {
	DragDropManager,
	DragSource,
	DropTarget,
	DragDropMonitor,
} from 'dnd-core'
import { DragDropContextType } from '../DragDropContext'

export type DndConcept = DragSource | DropTarget
export type ConnectorFunction = (connect: Connector) => void
export type CollectorFunction<T> = (monitor: DragDropMonitor) => T

export function useDnd(
	connector: ConnectorFunction,
	...collectors: CollectorFunction[]
): any[] {
	const dragDropManager = useDragDropManager()
}

function usDragDropManager(): DragDropManager {
	return (React as any).useContext(DragDropContextType)
}
