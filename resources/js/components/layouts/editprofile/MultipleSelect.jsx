import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useStyles} from '../../styles/Styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props) {
	const {type, menu, initialValue, setValue} = props;
	const [val, setVal] = useState([]);
	const handleChange = (event) => {
	    const {
	      target: { value },
	    } = event;
	    setValue( typeof value === 'string' ? value.split(',') : value,);
	  };
	const classes = useStyles();
	useEffect(() => {
		if (initialValue!==null && initialValue!==undefined && initialValue!=='') {
			if (Array.isArray(initialValue)) {
				setVal(initialValue);
			}
			else {
				let data = JSON.parse(initialValue);
				setVal(data);
			}
		}
	},[props]);
	return (
		<div className='flex align-items-center bg-white border-gray-300 border rounded-xl w-full p-2 mb-2'>
			
			<div className='w-full flex justify-content-between'>
				<Select
					labelId="services-multiple-chip-label"
					id="services-multiple-chip"
					multiple
					value={val}
					onChange={handleChange}
					input={<Input id="select-multiple-chip" label="Chip" />}
					renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected?.map((item, index) => (
							<Chip classes={{root:classes.chip}} key={index} label={item} />
						))}
					</Box>
					)}
					MenuProps={MenuProps}
					classes={{root:classes.multipleSelect}}
		        >
		          {menu.map((item, index) => (
		            <MenuItem
		                key={index}
		                value={item}
		            >
		              {item}
		            </MenuItem>
		          ))}
		        </Select>
			</div>
		</div>
	)
}