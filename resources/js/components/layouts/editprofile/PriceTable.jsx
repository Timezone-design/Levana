import React, { useState, useEffect } from 'react'
import {useStyles} from '../../styles/Styles';

export default function ProfileInput(props) {
	const {type, initialValue, setValue} = props;
	const classes = useStyles();
	const [price, setPrice] = useState({});

	useEffect(() => {
		if (initialValue!==null && initialValue!==undefined && initialValue!=='') {
			if (typeof(initialValue)=='object') {
				setPrice(initialValue);
			}
			else {
				let data = JSON.parse(initialValue);
				setPrice(data);
			}
		}
	},[props]);
	const changePrice = (id, value) => {
		let newPrice = price;
		newPrice = {
			...newPrice,
			[id]:value
		}
		setValue(newPrice);
	}
	return (
		<div className={'space-y-2 w-4/12 ' + classes.price_container}>
			<p>{type=='incall'? 'Incall(GBP)':'Outcall(GBP)'}</p>
		    <input value={price.a?price.a:''} type='number' onChange={(e) => changePrice('a',e.target.value)} /> 
		    <input value={price.b?price.b:''} type='number' onChange={(e) => changePrice('b',e.target.value)} /> 
		    <input value={price.c?price.c:''} type='number' onChange={(e) => changePrice('c',e.target.value)} /> 
		    <input value={price.d?price.d:''} type='number' onChange={(e) => changePrice('d',e.target.value)} /> 
		    <input value={price.e?price.e:''} type='number' onChange={(e) => changePrice('e',e.target.value)} /> 
		    <input value={price.f?price.f:''} type='number' onChange={(e) => changePrice('f',e.target.value)} /> 
		    <input value={price.g?price.g:''} type='number' onChange={(e) => changePrice('g',e.target.value)} /> 
		    <input value={price.h?price.h:''} type='number' onChange={(e) => changePrice('h',e.target.value)} /> 
		    <input value={price.i?price.i:''} type='number' onChange={(e) => changePrice('i',e.target.value)} /> 
		</div>
	)
}