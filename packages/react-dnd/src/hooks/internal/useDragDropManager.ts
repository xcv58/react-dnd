declare var require: any
import { useContext } from 'react'
import { DragDropManager } from 'dnd-core'
import { context } from '../../DragDropContext'
const invariant = require('invariant')

/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager<Context>(): DragDropManager<Context> {
	const { dragDropManager } = useContext(context)
	invariant(
		typeof dragDropManager === 'object',
		'Could not find the drag and drop manager. ' +
			'Make sure to use a DragDropContextProvider in your app.' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
	)
	return dragDropManager as DragDropManager<Context>
}
