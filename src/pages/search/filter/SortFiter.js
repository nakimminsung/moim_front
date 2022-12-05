import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: '15px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        width: '120px',
        paddingLeft: '20px',
        color: '#808080',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
}))(InputBase);

export default function SortFilter(props) {
    const { sort, setSort } = props;
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    return (
        <div>
            <FormControl>
                <Select
                    labelId='demo-customized-select-label'
                    id='demo-customized-select'
                    onChange={handleChange}
                    value={sort}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={'a.readCount desc'}>인기순</MenuItem>
                    <MenuItem value={'a.weekAmPrice asc'}>낮은가격순</MenuItem>
                    <MenuItem value={'a.weekAmPrice desc'}>높은가격순</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
