import React from 'react'
import Icon from '../Components/Icon'

function RewardListGroup(props) {
    // PROPS:
    // setCurrentReplacementReward: set current replacement reward -> function
    // rewardTypeIndex: reward type index -> number
    // rewardType: reward type -> string
    // rewardCategoryList: reward category list -> array

    let rewardOnClick = (id) => {
        let indeces = id.split('_')
        props.setCurrentReplacementReward(parseInt(indeces[1]))
    }

    let rewardList = props.rewardList.map((reward, rewardIndex) => {
        return (
            <button
                className='rewardListItem'
                id={props.rewardTypeIndex + '_' + rewardIndex}
                key={props.rewardTypeIndex + '_' + rewardIndex}
                onClick={(e) => { rewardOnClick(e.target.id) }}
            >
                <Icon
                    fileName={reward.iconType}
                    type={'row'}
                >
                    {reward.reward}
                </Icon>
            </button>
        )
    })
    return (
        // <div className='rewardCategoryGroup' key={props.rewardTypeIndex}>
        //     <h1 className='rewardCategoryName'>{props.rewardTypeIndex}</h1>
        //     <div className='rewardCategoryButtonGroup'>
        //         {rewardList}
        //     </div>
        // </div>
        <>
            {/* <h1 className='rewardCategoryName'>{props.rewardTypeIndex}</h1> */}
            {rewardList}
        </>
    )
}

export default RewardListGroup