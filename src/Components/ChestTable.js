import React from 'react'

function ChestTable(props) {
	let chestList = props.worldChests.map((chest, index) => {
		let keyValue = props.currentWorld + index
		return (
			<tr
				key={keyValue}
			>
				<td>
					<input
						type='checkbox'
						name={props.currentWorld}
						value={index}
						checked={chest.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{chest.room}
				</td>
				<td>
					{chest.vanillaReward}
				</td>
				<td>
					{chest.replacementReward}
				</td>
			</tr>
		)
	})
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>
						Room
					</th>
					<th>
						Original Reward
					</th>
					<th>
						Replacement Reward
					</th>
				</tr>
			</thead>
			<tbody>
				{chestList}
			</tbody>
		</table>
	)
}

export default ChestTable