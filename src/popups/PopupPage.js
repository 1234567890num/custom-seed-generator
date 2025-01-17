import React, { useState, useRef, useEffect } from 'react'

import GenericSelect from '../Components/GenericSelect'
import NavbarIcon from '../navbar/NavbarIcon'
import PopupCard from './PopupCard'

import './PopupStyles.css'

function PopupPage(props) {
	// PROPS:
	// popupData: array of worlds + popup objects -> {world, popups[]}[]
	// setAllPopups: parent state function to set all popups -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	let currentWorldPopups = props.popupData[currentWorld].popups
	const popupCardGrid = useRef(null)
	useEffect(() => {
		popupCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentWorld])

	function updatePopups(newPopup) {
		let newWorldPopups = currentWorldPopups.map(popup => {
			if (newPopup.vanillaAddress === popup.vanillaAddress)
				return newPopup
			return popup
		})
		updateAllPopups(newWorldPopups)
	}
	function updateAllEmptyPopups(newReward) {
		let newWorldPopups = currentWorldPopups.map(popup => {
			if (popup.replacementReward.index === 0)
				return popup.replace({ reward: { ...newReward } })
			return popup
		})
		updateAllPopups(newWorldPopups)
	}
	function updateAllPopups(newWorldPopups) {
		let newPopupData = props.popupData.map((world, worldIndex) => {
			if (currentWorld === worldIndex)
				return {
					world: world.world,
					popups: newWorldPopups
				}
			return world
		})
		props.setAllPopups(newPopupData)
	}

	let popupList = currentWorldPopups.map((popup, popupIndex) => {
		return (
			<PopupCard
				key={'popup' + popupIndex}
				id={popupIndex}
				popup={popup}
				handleVanilla={() => { updatePopups(popup.vanilla()) }}
				handleReplace={(replacementReward) => { updatePopups(popup.replace({ reward: { ...replacementReward } })) }}
			/>
		)
	})
	popupList.push(
		<PopupCard
			key={'AllPopups'}
			world={props.popupData[currentWorld].world}
			id={currentWorldPopups.length}
			handleVanilla={() => updateAllPopups(currentWorldPopups.map(popup => { return popup.vanilla() }))}
			handleReplace={(replacementReward) => updateAllPopups(currentWorldPopups.map(popup => { return popup.replace({ reward: { ...replacementReward } }) }))}
			handleReplaceAllEmpty={(replacementReward) => updateAllEmptyPopups(replacementReward)}
		/>
	)

	return (
		<div className='fullPageContent'>
			<div className='pageHeader'>
				<div className='pageHeaderSelectorLabel'>
					World Selector:
				</div>
				<div>
					<GenericSelect
						class={'popup'}
						selector={'World'}
						itemList={props.popupData.map(world => { return world.world })}
						name={'currentWorld'}
						currentItem={currentWorld}
						onChange={(e) => setCurrentWorld(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
				<NavbarIcon
					showNavbar={props.handleShowNavbar}
					fileName={'popup'}
					title={'Popup'}
				/>
			</div>
			<div className='popupCardGrid' ref={popupCardGrid}>
				{popupList}
			</div>
		</div>
	)
}

export default PopupPage