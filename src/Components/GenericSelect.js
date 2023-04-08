import React from 'react'
import { Form } from 'react-bootstrap'

function GenericSelect(props) {
	let isDisabled = props.disabled === undefined ? false : props.disabled
	let optionlist = props.itemList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})
	return (
		<Form.Select
			className='genericSelect'
			value={props.currentItem}
			disabled={isDisabled}
			name={props.name}
			onChange={props.onChange}
		>
			{optionlist}
		</Form.Select>
	)
}

export default GenericSelect