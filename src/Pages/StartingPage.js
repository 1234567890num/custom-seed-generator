import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'

function StartingPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.keybladeList}
							currentReward={props.startingStatusData.currentKeyblade}
							name={'currentKeyblade'}
							label={'Starting Keyblade'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingKeyblade.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.armorList}
							currentReward={props.startingStatusData.currentArmor}
							name={'currentArmor'}
							label={'Starting Armor'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingArmor.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.accessoryList}
							currentReward={props.startingStatusData.currentAccessory}
							name={'currentAccessory'}
							label={'Starting Accessory'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingAccessory.reward}</Form.Label>
					</Col>
				</Form.Row>
				<br></br>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentMunny'>
							<Form.Label column='sm'>Starting Munny: </Form.Label>
							<Form.Control
								size='sm'
								name='currentMunny'
								type='number'
								value={props.startingStatusData.currentMunny}
								onChange={props.onInputChange}
								min="0"
								max="4294967295"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingMunny}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingHP'>
							<Form.Label column='sm'>Starting HP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingHP'
								type='number'
								value={props.startingStatusData.currentStartingHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingHP}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingMP'>
							<Form.Label column='sm'>Starting MP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingMP'
								type='number'
								value={props.startingStatusData.currentStartingMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingMP}</Form.Label>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				APPLY
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
		</div >
	)
}

export default StartingPage