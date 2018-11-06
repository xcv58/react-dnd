import * as React from 'react'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	DropTargetCollector,
	ConnectDropTarget,
	useDropTargetConnector,
} from 'react-dnd'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'

export interface CollectedProps {
	isOver?: boolean
	canDrop?: boolean
	connectDropTarget?: ConnectDropTarget
}
export interface BoardSquareProps extends CollectedProps {
	x: number
	y: number
	children: any
}

const collect: DropTargetCollector<CollectedProps> = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

interface OverlayProps {
	color: string
}
const Overlay: React.SFC<OverlayProps> = ({ color }) => (
	<div
		style={{
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			width: '100%',
			zIndex: 1,
			opacity: 0.5,
			backgroundColor: color,
		}}
	/>
)

const dropTarget = createDropTarget(ItemTypes.KNIGHT, {
	canDrop: (props: BoardSquareProps) => canMoveKnight(props.x, props.y),
	drop: (props: BoardSquareProps) => moveKnight(props.x, props.y),
})

const BoardSquare: React.SFC<BoardSquareProps> = ({ x, y, children }) => {
	const black = (x + y) % 2 === 1
	const [connectDropTarget, isOver, canDrop] = useDnd(
		dropTarget,
		connect => connect.dropTarget,
		(connect, monitor) => !!monitor.isOver,
		(connect, monitor) => !!monitor.canDrop,
	)

	return connectDropTarget(
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Square black={black}>{children}</Square>
			{isOver && !canDrop && <Overlay color={'red'} />}
			{!isOver && canDrop && <Overlay color={'yellow'} />}
			{isOver && canDrop && <Overlay color={'green'} />}
		</div>,
	)
}

// export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)
