import * as React from 'react'
import { DragDropManager } from 'dnd-core'
import { DragDropContextType } from '../DragDropContext'

export function useDropTargetConnector() {
	const dragDropManager: DragDropManager<any> = (React as any).useContext(
		DragDropContextType,
	)
}
