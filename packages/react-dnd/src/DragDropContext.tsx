import * as React from 'react'
import {
	DragDropManager,
	BackendFactory,
	createDragDropManager,
} from 'dnd-core'

/**
 * Create the React Context
 */
export const DragDropContextType = React.createContext<
	DragDropManager<any> | undefined
>(undefined)

export interface DragDropContextProviderProps<BackendContext> {
	backend: BackendFactory
	context?: BackendContext
}

/**
 * A React component that provides the React-DnD context
 */
export const DragDropContextProvider: React.SFC<
	DragDropContextProviderProps<any>
> = ({ backend, context, children }) => {
	const manager = createDragDropManager(backend, context)
	return (
		<DragDropContextType.Provider value={manager}>
			{children}
		</DragDropContextType.Provider>
	)
}
