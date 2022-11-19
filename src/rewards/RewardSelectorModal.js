import React, { useRef, createRef, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

import './RewardStyles.css'
import RewardListGroup from './RewardListGroup'

function RewardSelectorModal(props) {
    const rewardRef = useRef(null)
    const rewardTypeRefList = []

    props.rewardsData.slice(0, -1).forEach(() => {
        rewardTypeRefList.push(createRef())
    })

    useEffect(() => {
        let lastTimeout
        const observer = new IntersectionObserver((entries) => {
            let visibleRewardTypes = entries.filter(entry => entry.isIntersecting)
            if (visibleRewardTypes.length > 0) {
                let newIndex = parseInt(visibleRewardTypes[0].target.id.substring(visibleRewardTypes[0].target.id.indexOf('_') + 1))
                props.setCurrentRewardType(newIndex)
            }
        }, {
            root: rewardRef.current,
            rootMargin: '-100px 0px -300px 0px'
        })

        rewardTypeRefList.forEach((rewardType) => {
            observer.observe(rewardType.current)
        })
        return () => { clearTimeout(lastTimeout) }
    }, [])

    function updateRewardType(id) {
        let newIndex = parseInt(id.substring(id.indexOf('_') + 1))
        rewardTypeRefList[newIndex].current.scrollIntoView({
            block: 'start',
            inline: 'nearest'
        })
        props.setCurrentRewardType(newIndex)
    }

    let emptyReward = props.empty

    let rewardTypeGroup = []
    let rewardButtonGroup = []

    props.rewardsData.slice(0, -1).forEach((rewardType, rewardTypeIndex) => {
        rewardTypeGroup.push(
            <button
                className={'rewardTypeSelector' + (rewardTypeIndex === props.currentRewardType ? ' activeRewardType' : '')}
                id={'rewardType_' + rewardTypeIndex}
                key={'rewardType_' + rewardTypeIndex}
                onClick={(e) => updateRewardType(e.target.id)}
            >
                {rewardType.rewardType}
            </button>
        )
        rewardButtonGroup.push(
            <div
                className='rewardCategoryButtonGroup'
                id={'buttonGroup_' + rewardTypeIndex}
                key={rewardTypeIndex}
                ref={rewardTypeRefList[rewardTypeIndex]}
            >
                <RewardListGroup
                    key={'rewardListGroup_' + rewardTypeIndex}
                    setCurrentReplacementReward={(rewardIndex) => { props.setCurrentReplacementReward(props.rewardsData[rewardTypeIndex].rewards[rewardIndex]) }}
                    rewardTypeIndex={rewardTypeIndex}
                    rewardType={props.rewardsData[rewardTypeIndex].rewardType}
                    rewardList={props.rewardsData[rewardTypeIndex].rewards}
                />
            </div>
        )
    })

    return (
        <Modal
            dialogClassName='rewardSelectorModal'
            show={props.show}
            onHide={() => props.setShow(false)}
            centered
        >
            <Modal.Header closeButton closeVariant="white" >
                {/* <Modal.Title>
						{props.originalReward.reward} will be replaced with:
						<Icon
							fileName={currentReplacementReward.iconType}
							type={'row'}
						>
							{currentReplacementReward.reward}
						</Icon>
					</Modal.Title> */}
            </Modal.Header>
            <Modal.Body className='rewardSelectorModalBody'>
                <div className='allRewardTabs'>
                    <div className='rewardTabGroup'>
                        {rewardTypeGroup}
                    </div>
                    <div className='rewardCategories' ref={rewardRef}>
                        {rewardButtonGroup}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='rewardSelectorModalButtonGroup'>
                <Button
                    variant='secondary'
                    onClick={() => props.onClick(emptyReward)}
                >
                    EMPTY
                </Button>
                <Button
                    variant='primary'
                    onClick={() => props.onClick(props.currentReplacementReward)}
                >
                    REPLACE
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RewardSelectorModal