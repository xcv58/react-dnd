import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

export interface ExampleTabsProps {
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

const ExampleTabs: React.FC<ExampleTabsProps> = ({ name, children }) => {
	const url = jsUrl(name)
	return (
		<Tabs>
			<TabList>
				<Tab>Code</Tab>
				<Tab>Sandbox</Tab>
			</TabList>
			<TabPanel>{children}</TabPanel>
			<TabPanel>
				<iframe
					src={url}
					style={frameStyle}
					sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
				/>
			</TabPanel>
		</Tabs>
	)
}

export default ExampleTabs
