import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ReactMarkdown from 'react-markdown'
import 'react-tabs/style/react-tabs.css'

export interface SandboxProps {
	name: string
}

const frameStyle: React.CSSProperties = {
	width: '100%',
	height: 800,
	border: 0,
	borderRadius: 4,
	overflow: 'hidden',
}

const jsUrl = (name: string) =>
	`https://codesandbox.io/embed/github/react-dnd/react-dnd/tree/docs/sandboxed_tutorial_steps/packages/documentation/sandboxes/${name}?fontsize=14`

const Sandbox: React.FC<SandboxProps> = ({ name }) => {
	const url = jsUrl(name)
	return (
		<iframe
			src={url}
			style={frameStyle}
			sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
		/>
	)
}

export default Sandbox
