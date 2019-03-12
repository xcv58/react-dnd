declare var require: any
declare var process: any

import * as React from 'react'
import { DndComponentClass } from './interfaces'
import { useDragDropManager } from './hooks/internal/useDragDropManager'
const isClassComponent = require('recompose/isClassComponent').default
const isPlainObject = require('lodash/isPlainObject')
const invariant = require('invariant')
const shallowEqual = require('shallowequal')

export interface DecorateHandlerArgs<Props, ItemIdType> {
	DecoratedComponent: any
	createHandler: any
	createMonitor: any
	createConnector: any
	registerHandler: any
	containerDisplayName: string
	getType: (props: Props) => ItemIdType
	collect: any
	options: any
}

export default function decorateHandler<Props, ItemIdType>({
	DecoratedComponent,
	createHandler,
	createMonitor,
	createConnector,
	registerHandler,
	containerDisplayName,
	getType,
	collect,
	options,
}: DecorateHandlerArgs<Props, ItemIdType>): DndComponentClass<Props> {
	// const { arePropsEqual = shallowEqual } = options
	const Decorated: any = DecoratedComponent

	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	const DragDropContainer = (props: Props) => {
		const manager = useDragDropManager()
		const handlerMonitor = React.useMemo(() => createMonitor(manager), [
			manager,
		])
		const handlerConnector = React.useMemo(
			() => createConnector(manager.getBackend()),
			[manager],
		)

		const handler = createHandler(handlerMonitor)
		const type = getType(props)
		const getCollectedProps = React.useCallback(() => {
			if (!handlerConnector) {
				return {}
			}
			const nextState = collect(handlerConnector.hooks, handlerMonitor)
			if (process.env.NODE_ENV !== 'production') {
				invariant(
					isPlainObject(nextState),
					'Expected `collect` specified as the second argument to ' +
						'%s for %s to return a plain object of props to inject. ' +
						'Instead, received %s.',
					containerDisplayName,
					displayName,
					nextState,
				)
			}

			return nextState
		}, [handlerConnector, handlerMonitor])
		const [collectedProps, setCollectedProps] = React.useState(
			getCollectedProps(),
		)

		// transfer props to handler
		React.useEffect(() => handler.receiveProps(props), [props, handler])

		const handleChange = React.useCallback(() => {
			const nextCollectedProps = getCollectedProps()
			if (!shallowEqual(nextCollectedProps, collectedProps)) {
				setCollectedProps(nextCollectedProps)
			}
		}, [collectedProps])

		// receive type
		React.useEffect(() => {
			const { handlerId, unregister } = registerHandler(type, handler, manager)
			handlerMonitor.receiveHandlerId(handlerId)
			handlerConnector.receiveHandlerId(handlerId)

			const unsubscribe = manager
				.getMonitor()
				.subscribeToStateChange(handleChange, { handlerIds: [handlerId] })

			return () => {
				unsubscribe()
				unregister()
			}
		})

		handleChange()
		return (
			<Decorated
				{...props}
				{...collectedProps}
				ref={handler && isClassComponent(Decorated) ? handler.ref : undefined}
			/>
		)
	}

	return DragDropContainer as any
}
